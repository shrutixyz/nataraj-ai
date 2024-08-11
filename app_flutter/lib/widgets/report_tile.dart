import 'package:flutter/material.dart';
import 'package:nataraj/controllers/api/shared_preferences_helper.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/views/reports/single_report_page.dart';

class ReportTile extends StatelessWidget {
  const ReportTile({super.key, required this.report});
  final DancePracticeReport report;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 15.0),
      child: GestureDetector(
        onTap: () {
          // Navigator.pushNamed(context, RoutesString.singleReportPageRoute);
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: ((context) => SingleReport(report: report))));
        },
        child: Container(
          width: double.infinity,
          height: 180,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(5.0),
              color: AppColors.secondaryBg,
              gradient: const LinearGradient(colors: [
                AppColors.secondaryBg,
                AppColors.secondaryBg,
                AppColors.black
              ], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
          child: Column(
            children: [
              Expanded(
                  child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Image.asset(
                    "assets/images/modeldummy.png",
                    height: 100,
                  ),
                  // SizedBox(),
                  const Padding(
                    padding: EdgeInsets.only(top: 20.0),
                    child: VerticalDivider(
                      width: 10,
                      color: Colors.white70,
                    ),
                  ),
                  // SizedBox(),
                  Image.asset(
                    "assets/images/modeldummy.png",
                    height: 100,
                  ),
                ],
              )),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          report.dateTime.toString().split(".")[0],
                          style: const TextStyle(fontSize: 15.0),
                        ),
                        // Text("song")
                      ],
                    ),
                    // Text(
                    //   "MATCH: ${report.matchRate}%",
                    //   style: const TextStyle(
                    //       fontSize: 15,
                    //       fontWeight: FontWeight.bold,
                    //       color: AppColors.pastelGreen),
                    // )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
