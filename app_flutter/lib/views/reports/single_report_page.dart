import 'dart:convert';
import 'dart:developer';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:video_player/video_player.dart';
import 'package:webview_flutter/webview_flutter.dart';


class SingleReport extends StatefulWidget {
  const SingleReport({super.key, required this.report});
  final DancePracticeReport report;

  @override
  State<SingleReport> createState() => _SingleReportState();
}

class _SingleReportState extends State<SingleReport> {
  final baseUrl = "https://singular-node-429217-j4.uc.r.appspot.com";
bool isLoading = false;
String suggestion = "";
   Future<void> getSuggestions() async {
    setState(() {
      isLoading = true;
    });
    final response = await http.get(Uri.parse("$baseUrl/getsuggestion"));
    setState(() {
      isLoading = false;
    });
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      setState(() {
        suggestion = data["suggestion"]??"No suggestions";
      });
    } else {
      // throw Exception('Failed to load data');
      setState(() {
        suggestion = "Error";
      });
    }
  }
  late VideoPlayerController _controller;
String pathh = "";
  setPath()async{
    final directory = await getExternalStorageDirectory();
    setState(() {
      pathh = directory!.path;
    });
    return directory!.path;
  }

  bool _isplaying = false;
  late WebViewController webviewcontroller;

  @override
  void initState() {
    super.initState();
    log( "pathh is"+ widget.report.videourl);
    setPath();
    log("new path ${pathh}");
    _controller = VideoPlayerController.networkUrl(Uri.parse(widget.report.videourl), videoPlayerOptions: VideoPlayerOptions(mixWithOthers: true))
      ..initialize().then((_) {
        setState(() {});
      });
      _controller.setVolume(0);
      player.setSource(UrlSource("https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-zayn.mp3"));

      // player.play(UrlSource("https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-zayn.mp3"));
  webviewcontroller = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..setBackgroundColor(const Color(0x00000000))
  ..enableZoom(true)
  ..setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
  // ..setOnConsoleMessage((message) { 
  //   if(message.message.contains("started")){

  //   }
  // })
  ..setNavigationDelegate(
    NavigationDelegate(
      onProgress: (int progress) {
        // Update loading bar.
      },
      onPageStarted: (String url) {},
      onPageFinished: (String url) {},
      onHttpError: (HttpResponseError error) {},
      onWebResourceError: (WebResourceError error) {},
      // onNavigationRequest: (NavigationRequest request) {
      //   if (request.url.startsWith('https://www.youtube.com/')) {
      //     return NavigationDecision.prevent;
      //   }
      //   return NavigationDecision.navigate;
      // },
    ),
  )
  ..loadRequest(Uri.parse('https://nataraj-ai.web.app/standalone/nataraj-q9y7tgo'));
  
  }

  final player = AudioPlayer();
  Future<void> playAudio()async{
    // await player.play(UrlSource(widget.report.musicUrl));
  if(_isplaying){
    player.pause();
  }
  else{
    player.resume();
        // await player.play(UrlSource("https://storage.googleapis.com/nataraj-ai.appspot.com/uploads/modified-zayn.mp3"));

  }
    
  }

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    });
    // final projectsController = Provider.of<ProjectsController>(context);
    return Scaffold(
      body: SafeArea(
          child: SizedBox(
        width: double.infinity,
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.asset(
                    AssetSrcs.logo,
                    scale: 5,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  const Text(
                    "REPORT",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  )
                ],
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    const Expanded(
                      flex: 1,
                      child: SizedBox(),
                    ),
                    Container(
                      width: double.infinity,
                      height: 150,
                      color: AppColors.secondaryBg,
                      child: WebViewWidget(controller: webviewcontroller,),
                    ),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    Container(
                      width: double.infinity,
                      height: 150,
                      color: AppColors.secondaryBg,
                      child: VideoPlayer(_controller),
                    ),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    // Container(
                    //   width: 300,
                    //   height: 2,
                    //   color: Colors.white,
                    // ),
                    const Expanded(
                      flex: 1,
                      child: SizedBox(),
                    ),
                     Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [IconButton(onPressed: ()async{
                        playAudio();
                        if(_isplaying){
                          _controller.pause();
                          setState(() {
                            _isplaying = false;
                          });
                        }
                        else{
                          _controller.play();
                          setState(() {
                            _isplaying = true;
                          });
                        }
                      }, icon: _isplaying?const Icon(Icons.pause, size: 48,):const Icon(Icons.play_arrow, size: 48,))],
                    ),
                    // const Text("sometimes all I think about is you"),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    // Image.asset(
                    //   AssetSrcs.logofull,
                    //   scale: 4,
                    // ),
                    
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    Text(
                      "TOTAL MATCH: ${widget.report.matchRate}%",
                      style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppColors.pastelGreen),
                    ),
                    const Expanded(
                      flex: 1,
                      child: SizedBox(),
                    ),
                    const Text(
                      "YOU HAVE DONE A GREAT JOB",
                      style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w300,
                          color: Colors.white54),
                    ),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    Text(isLoading?"loading...":"✨ $suggestion", textAlign: TextAlign.center,),const SizedBox(height: 30,),
                    GradientBorderButton(
                        title: "GET GEMINI AI INSPIRATIONS",
                        onPressed: ()async {
                          getSuggestions();
                        },
                        width: 350),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      )),
    );
  }
}
