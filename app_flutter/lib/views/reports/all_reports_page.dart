import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
// import 'package:nataraj/controllers/home/projects_controller.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/report_tile.dart';
// import 'package:provider/provider.dart';

class AllReports extends StatefulWidget {
  const AllReports({super.key});

  @override
  State<AllReports> createState() => _AllReportsState();
}

class _AllReportsState extends State<AllReports> {

  Future<void> getAllReports() async {
  SharedPreferencesHelper prefsHelper = SharedPreferencesHelper();
  List<DancePracticeReport> reports = await prefsHelper.getReports();

  for (var report in reports) {
    log('DateTime: ${report.dateTime}, Match Rate: ${report.matchRate}, Music URL: ${report.musicUrl}');
  }
  setState(() {
    dReports = reports;
  });
}

List<DancePracticeReport> dReports = [];

@override
void initState(){
  super.initState();
  getAllReports();
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
        child: Padding(padding: const EdgeInsets.all(20.0),
        child: Column(
          
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [Image.asset(AssetSrcs.logo, scale: 5,),
            const SizedBox(width: 10,),
            const Text("PAST REPORTS", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),)
            ],),
            Expanded(child: ListView.builder(
              itemCount: dReports.length,
              itemBuilder: ((context, index) => ReportTile(report:  dReports[index],))))
          ],
        ),
        ),
      )),
    );
  }
}
