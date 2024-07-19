import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/auth/auth_controller.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';
import 'package:provider/provider.dart';

class EmailLoginPage extends StatelessWidget {
  const EmailLoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    final authController = Provider.of<AuthController>(context, listen: false);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
      if (authController.user != null) {
        Navigator.pushReplacementNamed(context, RoutesString.homePageRoute);
      }
    });
    return Scaffold(
      body: SizedBox(
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Hero(
                  tag: "logotitle",
                  child: Image.asset(
                    AssetSrcs.logo,
                    scale: 5,
                  ),
                ),
                const SizedBox(
                  width: 20,
                ),
                const Text(
                  "Login with Email",
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            Column(
              children: [
                Container(
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(width: 1, color: AppColors.yellow2)),
                  width: 350,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: TextField(
                      onChanged: (value) {
                        authController.updateEmail(value);
                      },
                      decoration:const InputDecoration(
                          hintText: "Email", border: InputBorder.none),
                    ),
                  ),
                ),
               const SizedBox(
                  height: 30,
                ),
                Container(
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(width: 1, color: AppColors.yellow2)),
                  width: 350,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: TextField(
                      onChanged: (value) {
                        authController.updatePassword(value);
                      },
                      obscureText: true,
                      decoration: const InputDecoration(
                          hintText: "Password", border: InputBorder.none),
                    ),
                  ),
                ),
              ],
            ),
            Hero(
                tag: "button",
                child: GradientBorderButton(
                    title: "login",
                    onPressed: () async {
                      await authController.signinWithEmailPassword().then((_) {
                        if (authController.user != null) {
                          Navigator.pushNamed(
                              context, RoutesString.homePageRoute);
                        } else {
                          authController.showErrorDialog(context);
                        }
                      });
                    },
                    width: 350))
          ],
        ),
      ),
    );
  }
}
