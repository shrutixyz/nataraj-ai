import 'dart:developer';
import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
import 'package:nataraj/views/home/home_page.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

class DancePage extends StatefulWidget {
  const DancePage({super.key, required this.project});
  final dynamic project;

  @override
  State<DancePage> createState() => _DancePageState();
}

class _DancePageState extends State<DancePage> {
  final player = AudioPlayer();
  late CameraController controller;
  List<CameraDescription> cameras = [];
  bool isRecording = false;
  late String videoPath;
  bool isCameraInitialized = false;

  Future<void> playAudio() async {
    await player.play(UrlSource("https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-zayn.mp3"));
  }

  Future<void> requestPermissions() async {
    var status = await Permission.camera.status;
    if (!status.isGranted) {
      await Permission.camera.request();
    }

    status = await Permission.microphone.status;
    if (!status.isGranted) {
      await Permission.microphone.request();
    }

    status = await Permission.storage.status;
    if (!status.isGranted) {
      await Permission.storage.request();
    }
  }

  @override
  void initState() {
    super.initState();
    requestPermissions();
    setCameras().then((value) {
      controller = CameraController(value[0], ResolutionPreset.high, enableAudio: true);
      controller.initialize().then((_) {
        setState(() {
          isCameraInitialized = true;
        });
      }).then((value) => {
        playAudio().then((value) => {
          startRecording()
        })
      });
    });
    
    // isCameraInitialized?:log("not init");
    // startRecording();
    player.onPlayerComplete.listen((event) {
      log("player is donee");
      stopRecording();
    });
   
  }

  Future<List<CameraDescription>> setCameras() async {
    var camera = await availableCameras();
    setState(() {
      cameras = camera;
    });
    log(camera.toString());
    return camera;
  }

  Future<void> initializeCamera() async {
    controller = CameraController(cameras[0], ResolutionPreset.high, enableAudio: false);
    await controller.initialize();
  }

  Future<void> startRecording() async {
    if (!controller.value.isInitialized) {
      return;
    }

    if (controller.value.isRecordingVideo) {
      // A recording is already started, do nothing.
      return;
    }

    try {
      final directory = await getExternalStorageDirectory();
      log("dirrr is "+directory.toString());
      videoPath = '${directory!.path}/${DateTime.now().millisecondsSinceEpoch}.mp4';
      await controller.startVideoRecording();
      setState(() {
        isRecording = true;
      });
    } catch (e) {
      print(e);
    }
  }

Future<void> saveFileToExternalStorage(String cacheFilePath, String externalStoragePath) async {
  // Request storage permission
  await Permission.storage.request();

  // Get external storage directory
  final externalDir = await getExternalStorageDirectory();
  if (externalDir == null) {
    // Handle case where external storage is not available
    log("not avaialable");
    return;
  }

  // Create destination directory if it doesn't exist
  final destinationDir = Directory('$externalStoragePath');
  if (!await destinationDir.exists()) {
    await destinationDir.create(recursive: true);
  }

  // Get file name from cache path
  final fileName = cacheFilePath.split('/').last;
  final destinationPath = '${destinationDir.path}/$fileName';

  // Copy file from cache to external storage
  try {
    final file = File(cacheFilePath);
    await file.copy(destinationPath);
    log('File copied successfully to $destinationPath');
  } catch (e) {
    log('Error copying file: $e');
  }
}

  Future<void> stopRecording() async {
    if (!controller.value.isRecordingVideo) {
      log("not playingg");
      return;
    }

    try {
      var file = await controller.stopVideoRecording();
      // await Gal.putVideo(file.path);
      log(file.path);
      await file.saveTo(videoPath);
      setState(() {
        isRecording = false;
      });
      // You can now use the videoPath to access the recorded video file.
      log("Video recorded at path: $videoPath");
      final directory = await getExternalStorageDirectory();
      // await saveFileToExternalStorage(file.path,directory!.path);
        // Future<void> addNewReport() async {
    log("starting");
  DancePracticeReport report = DancePracticeReport(
    dateTime: DateTime.now(),
    matchRate: 85,
    musicUrl: 'https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-zayn.mp3',
    videourl: videoPath
  );

  SharedPreferencesHelper prefsHelper = SharedPreferencesHelper();
  await prefsHelper.addReport(report);
  log('Report added'+ report.toString());
  Navigator.push(context, MaterialPageRoute(builder: (context)=>HomePage()));
// }
    } catch (e) {
      print(e);
    }
  }

  @override
  void dispose() {
    controller.dispose();
    player.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
    });
    return Scaffold(
      body: isCameraInitialized
          ? Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
              Container(
                width: 0.40*w,
                child: AspectRatio(
                  aspectRatio: controller.value.aspectRatio,
                  child: CameraPreview(controller),
                ),
              ),
              VerticalDivider(width: 2, color: Colors.white,),
               Container(width: 0.40*w,
               height: (1/controller.value.aspectRatio)*0.4*w,
               color: Colors.black,
               ),
            ],)
          : Center(child: CircularProgressIndicator()),
    );
  }
}
