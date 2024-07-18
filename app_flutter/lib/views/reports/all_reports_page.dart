import 'package:flutter/material.dart';
import 'package:nataraj/controllers/home/projects_controller.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:provider/provider.dart';

class AllReports extends StatelessWidget {
  const AllReports({super.key});

  @override
  Widget build(BuildContext context) {
    final projectsController = Provider.of<ProjectsController>(context);
    return Scaffold(
      body: SafeArea(
          child: SizedBox(
        width: double.infinity,
        child: Padding(padding: EdgeInsets.all(20.0),
        child: Column(
          
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [Image.asset(AssetSrcs.logo, scale: 5,),
            SizedBox(width: 10,),
            Text("PAST REPORTS", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),)
            ],)
          ],
        ),
        ),
      )),
    );
  }
}
