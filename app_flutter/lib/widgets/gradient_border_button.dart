import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_text.dart';

class GradientBorderButton extends StatelessWidget {
  const GradientBorderButton(
      {super.key,
      required this.title,
      required this.onPressed,
      required this.width});
  final String title;
  final VoidCallback onPressed;
  final double width;
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 50,
        width: width,
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(10)),
            gradient: LinearGradient(
          colors: [
            AppColors.yellow2,
            AppColors.yellow1,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        )),
        child: Center(
          child: MaterialButton(
              onPressed: onPressed,
              height: 46,
              minWidth: width - 4,
              color: AppColors.background,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              child: const GradientText(
                  text: HelperEnglish.loginWithEmail,
                  style: TextStyle(fontSize: 15)),
            ),
        ));
  }
}
