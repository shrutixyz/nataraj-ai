import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/custom_gradient_border_button.dart';

class ProjectTile extends StatelessWidget {
  const ProjectTile({super.key});

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
            const Expanded(child: SizedBox()),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "TITLE",
                        style: TextStyle(fontSize: 15.0),
                      ),
                      Text("song")
                    ],
                  ),
                  CustomGradientBorderButton(
                    title: "Practice it",
                    onPressed: () {
                      Navigator.pushNamedAndRemoveUntil(context, RoutesString.configurationPageRoute, (route) => false);
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
