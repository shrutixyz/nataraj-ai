import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:nataraj/controllers/auth/auth_controller.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';
import 'package:nataraj/widgets/social_login_button.dart';
import 'package:provider/provider.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});
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
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 60.0),
            child: Hero(
              tag: "logotitle",
              child: Image.asset(
                AssetSrcs.logofull,
                scale: 4,
              ),
            ),
          ),
          Column(
            children: [
              Hero(
                tag: "button",
                child: GradientBorderButton(
                    title: HelperEnglish.loginWithEmail,
                    onPressed: () {
                      Navigator.pushNamed(context, RoutesString.loginPageRoute);
                    },
                    width: 350),
              ),
              const SizedBox(
                height: 20,
              ),
              const Text(
                HelperEnglish.or,
                style: TextStyle(color: AppColors.text),
              ),
              const SizedBox(
                height: 20,
              ),
              SocialLoginButton(
                title: HelperEnglish.loginWithGoogle,
                onPressed: () async {
                  await authController.signInWithGoogle().then((_) {
                    if (authController.user != null) {
                      Navigator.pushNamed(context, RoutesString.homePageRoute);
                    } else {
                      authController.showErrorDialog(context);
                    }
                  });
                },
              ),
              const SizedBox(
                height: 20,
              ),
              SocialLoginButton(
                title: HelperEnglish.loginWithGithub,
                onPressed: () async {
                  final webViewController = WebViewController()
                    ..setJavaScriptMode(JavaScriptMode.unrestricted)
                    ..setBackgroundColor(const Color(0x00000000))
                    ..setNavigationDelegate(
                      NavigationDelegate(
                        onPageStarted: (String url) async {
                          final urlResult = authController.githubMatchUrl(url);
                          if (urlResult) {
                            final token =
                                await authController.getAccessToken(url);
                            await authController
                                .signInWithGitHub(token)
                                .then((_) {
                              if (authController.user != null) {
                                Navigator.pushNamed(
                                    context, RoutesString.homePageRoute);
                              } else {
                                authController.showErrorDialog(context);
                              }
                            });
                          }
                        },
                        onHttpError: (HttpResponseError error) {
                          Navigator.pop(context);
                        },
                      ),
                    )
                    ..loadRequest(Uri.parse(authController.getGithubAuthURL()));
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: ((context) => WebViewWidget(
                                controller: webViewController,
                              ))));
                },
              ),
              const SizedBox(
                height: 40,
              ),
            ],
          )
        ],
      ),
    ));
  }
}
