import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';
import 'package:nataraj/widgets/social_login_button.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: SizedBox(
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 60.0),
              child: Image.asset(AssetSrcs.logofull, scale: 4,),
            ),
            Column(
              children: [
                GradientBorderButton(title: HelperEnglish.loginWithEmail, onPressed: (){}, width: 350),
                const SizedBox(height: 20,),
                const Text(HelperEnglish.or,style: TextStyle(color: AppColors.text),),
                const SizedBox(height: 20,),
                SocialLoginButton(title: HelperEnglish.loginWithGoogle, onPressed: (){},),
                const SizedBox(height: 20,),
                SocialLoginButton(title: HelperEnglish.loginWithGithub, onPressed: (){},),
                const SizedBox(height: 40,),
              ],
            )
          ],
        ),
      )
    );
  }
}