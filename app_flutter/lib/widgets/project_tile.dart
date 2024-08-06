import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/views/practice/configuration_page.dart';
import 'package:nataraj/widgets/custom_gradient_border_button.dart';

class ProjectTile extends StatelessWidget {
  const ProjectTile({super.key, required this.data});
  final dynamic data;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: Container(
        width: double.infinity,
        height: 180,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: AppColors.secondaryBg,
        ),
        child: Column(
          children: [
             Expanded(child: Center(child: Image.asset("assets/images/modeldummy.png", height: 70,),)),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                   Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        data["projectName"],
                        style: const TextStyle(fontSize: 15.0),
                      ),
                      Text("Duration: ${data["duration"]}s")
                    ],
                  ),
                  CustomGradientBorderButton(
                    title: "Practice it",
                    onPressed: () {
                      Navigator.push(context, MaterialPageRoute(builder: ((context) => ConfigurationPage(project: data)))
                      );                  
                          // Navigator.pushNamedAndRemoveUntil(context, RoutesString.configurationPageRoute, (route) => false);
                    },
                    width: 150,
                    height: 30,
                    bg: AppColors.secondaryBg,
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
