import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/utils/constants.dart';

class GeneratingReportPage extends StatelessWidget {
  const GeneratingReportPage({super.key});

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
    });

    return  Scaffold(
      body: SafeArea(
          child: InkWell(
            onTap:() {
              Navigator.pushNamedAndRemoveUntil(context, RoutesString.homePageRoute, (route) => false);
            },
            child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
            Row(mainAxisAlignment: MainAxisAlignment.center,
            children: [Text("14%", style: TextStyle(fontSize: 100, fontWeight: FontWeight.bold),)],
            ),
            Text("GENERATING REPORT..",  style: TextStyle(fontSize: 20, fontWeight: FontWeight.normal))
            
                    ],
                  ),
          )),
    );
  }
}
