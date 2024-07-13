import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';

class GradientText extends StatelessWidget {
  final String text;
  final TextStyle style;

  const GradientText({super.key, required this.text, required this.style});

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      shaderCallback: (bounds) {
        return const LinearGradient(
              colors: [
                AppColors.yellow2,
                AppColors.yellow1,
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ).createShader(Rect.fromLTWH(0, 0, bounds.width, bounds.height));
      },
      child: Text(
        text,
        style: style.copyWith(color: Colors.white,
      
        ),
        
      ),
    );
  }
}