import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';

class ReportTile extends StatelessWidget {
  const ReportTile({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 15.0),
      child: GestureDetector(
        onTap: () {
          Navigator.pushNamed(context, RoutesString.singleReportPageRoute);
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
          child: const Column(
            children: [
              Expanded(
                  child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(),
                  Padding(
                    padding: EdgeInsets.only(top: 20.0),
                    child: VerticalDivider(
                      width: 10,
                      color: Colors.white70,
                    ),
                  ),
                  SizedBox()
                ],
              )),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "17:45 IST",
                          style: TextStyle(fontSize: 15.0),
                        ),
                        Text("song")
                      ],
                    ),
                    Text(
                      "MATCH: 85%",
                      style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: AppColors.pastelGreen),
                    )
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
