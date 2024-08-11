import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';

class SocialLoginButton extends StatelessWidget {
  const SocialLoginButton(
      {super.key, required this.title, required this.onPressed});
  final String title;
  final VoidCallback onPressed;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 350,
      child: MaterialButton(
          minWidth: 350,
          height: 50,
          onPressed: onPressed,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
              side: const BorderSide(width: 2, color: AppColors.blue)),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                AssetSrcs.socialLoginImg[title]!,
                scale: 5,
              ),
              const SizedBox(
                width: 10,
              ),
              Text(
                title,
                style: const TextStyle(fontSize: 15, color: AppColors.blue),
              ),
            ],
          )),
    );
  }
}
