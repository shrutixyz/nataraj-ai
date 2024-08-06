import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/views/practice/dance_page.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';

class ConfigurationPage extends StatelessWidget {
  const ConfigurationPage({super.key, required this.project});
  final dynamic project;

  Future<void> addNewReport() async {
    log("starting");
  DancePracticeReport report = DancePracticeReport(
    dateTime: DateTime.now(),
    matchRate: 85.5,
    musicUrl: 'https://example.com/music.mp3',
  );

  SharedPreferencesHelper prefsHelper = SharedPreferencesHelper();
  await prefsHelper.addReport(report);
  log('Report added');
}

Future<void> getAllReports() async {
  SharedPreferencesHelper prefsHelper = SharedPreferencesHelper();
  List<DancePracticeReport> reports = await prefsHelper.getReports();

  for (var report in reports) {
    log('DateTime: ${report.dateTime}, Match Rate: ${report.matchRate}, Music URL: ${report.musicUrl}');
  }
}

Future<void> deleteReport(int index) async {
  SharedPreferencesHelper prefsHelper = SharedPreferencesHelper();
  await prefsHelper.deleteReport(index);
  log('Report deleted');
}

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
    });
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Align(
              alignment: Alignment.topLeft,
              child: IconButton(
                  onPressed: () {
                    Navigator.pushNamedAndRemoveUntil(
                        context, RoutesString.homePageRoute, (route) => false);
                  },
                  icon: const Icon(Icons.arrow_back_ios_new_sharp)),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                       Image.asset("assets/images/modeldummy.png", height: 180,),
                        const SizedBox(height: 20,),
                        const Text("YOUR AVATAR", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900),)
                      ],
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // const Text("SELECT ASSESS VIEW", style: TextStyle(fontSize: 18),),
                        // const SizedBox(height: 20,),
                        // Row(
                        //   children: [
                        //     Container(height: 150, width: 150, color: AppColors.yellow2,),
                        //     const SizedBox(width: 30,),
                        //     Container(height: 150, width: 150, color: AppColors.yellow2,)
                        //   ],
                        // ),
                        // const SizedBox(height: 20,),
                        GradientBorderButton(title: "LET'S BEGIN",onPressed: () async{
                          Navigator.push(context, MaterialPageRoute(builder: ((context) => DancePage(project: project))));
                            //  await  addNewReport();
                            // await getAllReports();
                            // log("hhee");
                                  // Navigator.pushNamedAndRemoveUntil(context, RoutesString.generatingReportPageRoute, (route) => false);
                                }, width: 330)
                      ],
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
