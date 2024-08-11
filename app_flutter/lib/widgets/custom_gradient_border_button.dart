import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/widgets/gradient_text.dart';

class CustomGradientBorderButton extends StatelessWidget {
  const CustomGradientBorderButton({
    super.key,
    required this.title,
    required this.onPressed,
    required this.width,
    required this.height,
    required this.bg,
  });
  final String title;
  final VoidCallback onPressed;
  final double width, height;
  final Color bg;
  @override
  Widget build(BuildContext context) {
    return Container(
        height: height,
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
            height: height - 4,
            minWidth: width - 4,
            color: bg,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            child:
                GradientText(text: title, style: const TextStyle(fontSize: 15)),
          ),
        ));
  }
}
