import 'dart:convert';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';
import 'package:http/http.dart' as http;


class SingleReport extends StatefulWidget {
  const SingleReport({super.key, required this.report});
  final DancePracticeReport report;

  @override
  State<SingleReport> createState() => _SingleReportState();
}

class _SingleReportState extends State<SingleReport> {
  final baseUrl = "https://singular-node-429217-j4.uc.r.appspot.com";

String suggestion = "";
   Future<void> getSuggestions() async {
    final response = await http.get(Uri.parse("$baseUrl/getsuggestion"));
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

  @override
  void initState(){
    super.initState();
    
  }

  final player = AudioPlayer();
  Future<void> playAudio()async{
    await player.play(UrlSource(widget.report.musicUrl));
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
                    // const Expanded(
                    //   flex: 1,
                    //   child: SizedBox(),
                    // ),
                    // Container(
                    //   width: double.infinity,
                    //   height: 150,
                    //   color: AppColors.secondaryBg,
                    // ),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    Container(
                      width: double.infinity,
                      height: 150,
                      color: AppColors.secondaryBg,
                    ),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    Container(
                      width: 300,
                      height: 2,
                      color: Colors.white,
                    ),
                    const Expanded(
                      flex: 1,
                      child: SizedBox(),
                    ),
                     Row(
                      children: [IconButton(onPressed: ()async{
                        playAudio();
                      }, icon: const Icon(Icons.play_arrow))],
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
                    Text("✨ $suggestion"),const SizedBox(height: 30,),
                    GradientBorderButton(
                        title: "GET GEMINI AI SUGGESTIONS",
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
