import 'dart:developer';
import 'dart:io';
import 'package:audioplayers/audioplayers.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/views/home/home_page.dart';
import 'package:nataraj/views/practice/helper/pose_estimation_helper.dart';
import 'package:nataraj/views/practice/models/person.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:webview_flutter/webview_flutter.dart';

class DancePage extends StatefulWidget {
  const DancePage({super.key, required this.project});
  final dynamic project;

  @override
  State<DancePage> createState() => _DancePageState();
}

class _DancePageState extends State<DancePage> {
  var score = 0.0;
  final player = AudioPlayer();
  late CameraController controller;
  List<CameraDescription> cameras = [];
  bool isRecording = false;
  late String videoPath;
  bool isCameraInitialized = false;

  Future<void> playAudio() async {
    await player.play(UrlSource(
        "https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-8ul8msi.mp3"));
  }

  late WebViewController webviewcontroller;

  bool _isProcessing = false;
  Person? _person;
  late PoseEstimationHelper _poseEstimationHelper;

  _initHelper() async {
    _poseEstimationHelper = PoseEstimationHelper();
    await _poseEstimationHelper.initHelper();
  }

  initDance() async {
    await _initHelper();
    setCameras().then((value) {
      controller =
          CameraController(value[0], ResolutionPreset.high, enableAudio: true);
      controller.initialize().then((value) {
        controller.startImageStream(_imageAnalysis);
        if (mounted) {
          setState(() {});
        }
        setState(() {
          isCameraInitialized = true;
        });
      }).then((value) => {
            playAudio().then((value) => {startRecording()})
          });
    });
  }

  @override
  void initState() {
    super.initState();
    player.onPlayerComplete.listen((event) {
      log("player is done playing");
      stopRecording();
    });

    webviewcontroller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..enableZoom(true)
      ..setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
      ..setOnConsoleMessage((message) {
        if (message.message.contains("resuming")) {
          log("starting dance now");
          initDance();
        }
      })
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            // Update loading bar.
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onHttpError: (HttpResponseError error) {},
          onWebResourceError: (WebResourceError error) {},
        ),
      )
      ..loadRequest(
          Uri.parse('https://nataraj-ai.web.app/standalone/nataraj-q9y7tgo'));
  }

  Future<List<CameraDescription>> setCameras() async {
    var camera = await availableCameras();
    setState(() {
      cameras = camera;
    });
    log(camera.toString());
    return camera;
  }

  Future<void> startRecording() async {
    if (!controller.value.isInitialized) {
      return;
    }

    if (controller.value.isRecordingVideo) {
      return;
    }

    try {
      final directory = await getExternalStorageDirectory();
      log("directory is: $directory");
      videoPath =
          '${directory!.path}/${DateTime.now().millisecondsSinceEpoch}.mp4';
      await controller.startVideoRecording();
      setState(() {
        isRecording = true;
      });
    } catch (e) {
      log(e.toString());
    }
  }

  Future<void> saveFileToExternalStorage(
      String cacheFilePath, String externalStoragePath) async {
    await Permission.storage.request();
    final externalDir = await getExternalStorageDirectory();
    if (externalDir == null) {
      return;
    }
    final destinationDir = Directory(externalStoragePath);
    if (!await destinationDir.exists()) {
      await destinationDir.create(recursive: true);
    }
    final fileName = cacheFilePath.split('/').last;
    final destinationPath = '${destinationDir.path}/$fileName';
    try {
      final file = File(cacheFilePath);
      await file.copy(destinationPath);
      log('File copied successfully to $destinationPath');
    } catch (e) {
      log('Error copying file: $e');
    }
  }

  Future<void> _imageAnalysis(CameraImage cameraImage) async {
    if (_isProcessing) {
      return;
    }
    _isProcessing = true;
    final persons = await _poseEstimationHelper.estimatePoses(cameraImage);
    _isProcessing = false;
    if (mounted) {
      setState(() {
        _person = persons;
        score = _person!.score;
      });
    }
  }

  Future<void> stopRecording() async {
    if (!controller.value.isRecordingVideo) {
      log("not playingg");
      return;
    }
    try {
      var file = await controller.stopVideoRecording();
      log(file.path);
      await file.saveTo(videoPath);
      setState(() {
        isRecording = false;
      });
      log("Video recorded at path: $videoPath");
      log("starting");
      DancePracticeReport report = DancePracticeReport(
          dateTime: DateTime.now(),
          matchRate: 85,
          musicUrl:
              widget.project["song"],
          videourl: videoPath,
          projectID: "nataraj-${widget.project["projectID"]}"
          );
      SharedPreferencesHelper prefsHelper = SharedPreferencesHelper();
      await prefsHelper.addReport(report);
      log('Report added: $report');
      if (!mounted) {
        return;
      }
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: ((context) => const HomePage())),
          (route) => false);
    } catch (e) {
      log(e.toString());
    }
  }

  @override
  void dispose() {
    controller.dispose();
    _poseEstimationHelper.close();
    player.dispose();
    super.dispose();
  }

  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    switch (state) {
      case AppLifecycleState.paused:
        controller.stopImageStream();
        break;
      case AppLifecycleState.resumed:
        if (!controller.value.isStreamingImages) {
          await controller.startImageStream(_imageAnalysis);
        }
        break;
      default:
    }
  }

  Widget resultWidget(context) {
    return Stack(
      children: [
        CameraPreview(controller),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
    });
    return Scaffold(
      body: isCameraInitialized
          ? Stack(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: 0.40 * w,
                      child: AspectRatio(
                        aspectRatio: controller.value.aspectRatio,
                        child: resultWidget(context),
                      ),
                    ),
                    const VerticalDivider(
                      width: 1,
                      color: Colors.white54,
                    ),
                    Container(
                      width: 0.40 * w,
                      height: (1 / controller.value.aspectRatio) * 0.4 * w,
                      color: Colors.black,
                      child: WebViewWidget(
                        controller: webviewcontroller,
                      ),
                    ),
                  ],
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 8.0),
                    child: Text(
                      "Posenet Score: ${(score * 1000).round() / 10}%",
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                )
              ],
            )
          : const Center(
              child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircularProgressIndicator(
                  color: AppColors.yellow2,
                ),
                SizedBox(
                  height: 10,
                ),
                Text(
                  "Loading up your project...",
                  style: TextStyle(
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.bold,
                    fontSize: 15.0,
                  ),
                  textAlign: TextAlign.center,
                )
              ],
            )),
    );
  }
}
