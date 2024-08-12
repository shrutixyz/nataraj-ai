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
import 'package:nataraj/views/practice/models/body_part.dart';
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

class _DancePageState extends State<DancePage> with WidgetsBindingObserver {
  var score = 0.0;
  final player = AudioPlayer();
  List<CameraDescription> _cameras = [];
  CameraController? _cameraController;
  bool _isProcessing = false;
  Person? _person;
  late PoseEstimationHelper _poseEstimationHelper;
  late CameraDescription _cameraDescription;
  bool isRecording = false;
  late String videoPath;

  Future<void> playAudio() async {
    await player.play(UrlSource(widget.project["song"]));
  }

  late WebViewController webviewcontroller;

  _initHelper() async {
    _initCamera();
    _poseEstimationHelper = PoseEstimationHelper();
    await _poseEstimationHelper.initHelper();
  }

  _initCamera() {
    _cameraDescription = _cameras.firstWhere(
        (element) => element.lensDirection == CameraLensDirection.back);
    _cameraController = CameraController(
        _cameraDescription, ResolutionPreset.low,
        enableAudio: false,
        imageFormatGroup: Platform.isIOS
            ? ImageFormatGroup.bgra8888
            : ImageFormatGroup.yuv420);
    _cameraController!.initialize().then((value) {
      _cameraController!.startImageStream(_imageAnalysis);
      if (mounted) {
        setState(() {});
      }
    });
  }

  String logmsg = "Loading up your project...";
  initDance() async {
    // await _initHelper();
    await playAudio();
    await startRecording();
    // setCameras().then((value) {
    //   _cameraController =
    //       CameraController(value[0], ResolutionPreset.high, enableAudio: true);
    //   _cameraController!.initialize().then((value) {
    //     _cameraController!.startImageStream(_imageAnalysis);
    //     if (mounted) {
    //       setState(() {});
    //     }
    //   }).then((value) => {
    //         playAudio().then((value) => {startRecording()})
    //       });
    // });
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await setCameras();
      await _initHelper();
    });
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
        setState(() {
          logmsg = message.message;
        });
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
      ..loadRequest(Uri.parse(
          'https://nataraj-ai.web.app/standalone/nataraj-${widget.project["projectID"]}'));
  }

  Future<List<CameraDescription>> setCameras() async {
    var camera = await availableCameras();
    setState(() {
      _cameras = camera;
    });
    log(camera.toString());
    return camera;
  }

  Future<void> startRecording() async {
    if (!_cameraController!.value.isInitialized) {
      return;
    }

    if (_cameraController!.value.isRecordingVideo) {
      return;
    }

    try {
      final directory = await getExternalStorageDirectory();
      log("directory is: $directory");
      videoPath =
          '${directory!.path}/${DateTime.now().millisecondsSinceEpoch}.mp4';
      await _cameraController!.startVideoRecording();
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
        score = persons.score;
        _person = persons;
      });
    }
  }

  Future<void> stopRecording() async {
    if (!_cameraController!.value.isRecordingVideo) {
      log("not playingg");
      return;
    }
    try {
      var file = await _cameraController!.stopVideoRecording();
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
          musicUrl: widget.project["song"],
          videourl: videoPath,
          projectID: "nataraj-${widget.project["projectID"]}");
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
    _cameraController!.dispose();
    _poseEstimationHelper.close();
    player.dispose();
    super.dispose();
  }

  @override
  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    switch (state) {
      case AppLifecycleState.paused:
        _cameraController!.stopImageStream();
        break;
      case AppLifecycleState.resumed:
        if (!_cameraController!.value.isStreamingImages) {
          await _cameraController!.startImageStream(_imageAnalysis);
        }
        break;
      default:
    }
  }

  Widget resultWidget(context) {
    return Stack(
      children: [
        CameraPreview(_cameraController!),
        _person != null
            ? CustomPaint(
                painter: OverlayView(scale: 1)..updatePerson(_person!),
              )
            : Container(),
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
      body: _cameraController != null && isRecording == true
          ? Stack(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      width: 0.40 * w,
                      // height: (1 / _cameraController!.value.aspectRatio) * 0.4 * w,
                      height: 200,
                      color: Colors.black,
                      child: resultWidget(context),
                    ),
                    const VerticalDivider(
                      width: 1,
                      color: Colors.white54,
                    ),
                    Container(
                      width: 0.40 * w,
                      // height: (1 / _cameraController!.value.aspectRatio) * 0.4 * w,
                      height: 200,
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
                      "Posenet Score: ${(_person?.score ?? 0 * 100).toStringAsFixed(2)}",
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                )
              ],
            )
          : Center(
              child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const CircularProgressIndicator(
                  color: AppColors.yellow2,
                ),
                const SizedBox(
                  height: 10,
                ),
                 Text(
                  logmsg
                  ,
                  style: const TextStyle(
                    fontStyle: FontStyle.italic,
                    fontWeight: FontWeight.bold,
                    fontSize: 15.0,
                  ),
                  textAlign: TextAlign.center,
                ),
                // Center(
                //   child: Text(
                //     logmsg,
                //     style: const TextStyle(fontSize: 18.0, color: Colors.red),
                //   ),
                // )
              ],
            )),
    );
  }
}

class OverlayView extends CustomPainter {
  OverlayView({required double scale}) : _scale = scale;
  static const _minConfidence = 0.2;
  static const _bodyJoints = [
    [BodyPart.nose, BodyPart.leftEye],
    [BodyPart.nose, BodyPart.rightEye],
    [BodyPart.leftEye, BodyPart.leftEar],
    [BodyPart.rightEye, BodyPart.rightEar],
    [BodyPart.nose, BodyPart.leftShoulder],
    [BodyPart.nose, BodyPart.rightShoulder],
    [BodyPart.leftShoulder, BodyPart.leftElbow],
    [BodyPart.leftElbow, BodyPart.leftWrist],
    [BodyPart.rightShoulder, BodyPart.rightElbow],
    [BodyPart.rightElbow, BodyPart.rightWrist],
    [BodyPart.leftShoulder, BodyPart.rightShoulder],
    [BodyPart.leftShoulder, BodyPart.leftHip],
    [BodyPart.rightShoulder, BodyPart.rightHip],
    [BodyPart.leftHip, BodyPart.rightHip],
    [BodyPart.leftHip, BodyPart.leftKnee],
    [BodyPart.leftKnee, BodyPart.leftAnkle],
    [BodyPart.rightHip, BodyPart.rightKnee],
    [BodyPart.rightKnee, BodyPart.rightAnkle]
  ];
  final double _scale;
  Person? _persons;

  final Paint _strokePaint = Paint()
    ..color = Colors.red
    ..strokeWidth = 5
    ..style = PaintingStyle.stroke;

  final Paint _circlePaint = Paint()
    ..color = Colors.red
    ..strokeWidth = 3
    ..style = PaintingStyle.fill;

  updatePerson(Person persons) {
    _persons = persons;
  }

  @override
  void paint(Canvas canvas, Size size) {
    if (_persons == null) return;
    // draw circles
    if (_persons!.score > _minConfidence) {
      _persons?.keyPoints.forEach((element) {
        canvas.drawCircle(
            Offset(
                element.coordinate.dx * _scale, element.coordinate.dy * _scale),
            5,
            _circlePaint);
      });
      for (var index in _bodyJoints) {
        final pointA = _persons?.keyPoints[index[0].index].coordinate;
        final pointB = _persons?.keyPoints[index[1].index].coordinate;
        // drawLine
        if (pointA != null && pointB != null) {
          canvas.drawLine(Offset(pointA.dx * _scale, pointA.dy * _scale),
              Offset(pointB.dx * _scale, pointB.dy * _scale), _strokePaint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant OverlayView oldDelegate) {
    return oldDelegate._persons != _persons;
  }
}
