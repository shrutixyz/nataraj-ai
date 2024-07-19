import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
class SingleReport extends StatelessWidget {
  const SingleReport({super.key});

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
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
                    ),
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
                    const Row(),
                    const Text("sometimes all I think about is you"),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    Image.asset(
                      AssetSrcs.logofull,
                      scale: 4,
                    ),
                    const Expanded(
                      flex: 2,
                      child: SizedBox(),
                    ),
                    const Text(
                      "TOTAL MATCH: 65%",
                      style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppColors.pastelGreen),
                    ),
                    const Expanded(
                      flex:1,
                      child: SizedBox(),
                    ),
                    const Text(
                      "YOU FALL IN TOP 5% OF THE USERS",
                      style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w300,
                          color: Colors.white54),
                    ),
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
