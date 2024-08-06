import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DancePage extends StatefulWidget {
  const DancePage({super.key, required this.project});
  final dynamic project;

  @override
  State<DancePage> createState() => _DancePageState();
}

class _DancePageState extends State<DancePage> {
  final player = AudioPlayer();
  Future<void> playAudio()async{
    await player.play(UrlSource(widget.project["song"].toString()));
  }

  @override
  void initState(){
    super.initState();
    playAudio();
  }
  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
    });
    return Scaffold(body:  Center(child: Text(widget.project["song"].toString()),));
  }
}