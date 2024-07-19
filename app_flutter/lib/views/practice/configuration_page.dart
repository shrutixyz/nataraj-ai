import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';

class ConfigurationPage extends StatelessWidget {
  const ConfigurationPage({super.key});

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
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Row(
                          children: [
                            IconButton(
                                onPressed: () {
                                  Navigator.pushNamedAndRemoveUntil(context, RoutesString.generatingReportPageRoute, (route) => false);
                                },
                                icon: const Icon(
                                  Icons.arrow_back_ios,
                                  size: 48,
                                )),
                            Container(
                              height: 50,
                              width: 50,
                              color: Colors.orange,
                            ),
                            IconButton(
                                onPressed: () {},
                                icon: const Icon(
                                  Icons.arrow_forward_ios,
                                  size: 48,
                                ))
                          ],
                        ),
                        const SizedBox(height: 20,),
                        const Text("SELECT DANCE ORIENTATION", style: TextStyle(fontSize: 15, fontWeight: FontWeight.w900),)
                      ],
                    ),
                    Column(
                      children: [
                        const Text("SELECT ASSESS VIEW", style: TextStyle(fontSize: 18),),
                        const SizedBox(height: 20,),
                        Row(
                          children: [
                            Container(height: 150, width: 150, color: AppColors.yellow2,),
                            const SizedBox(width: 30,),
                            Container(height: 150, width: 150, color: AppColors.yellow2,)
                          ],
                        ),
                        const SizedBox(height: 20,),
                        GradientBorderButton(title: "LET'S BEGIN",onPressed: () {
                                  Navigator.pushNamedAndRemoveUntil(context, RoutesString.generatingReportPageRoute, (route) => false);
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
