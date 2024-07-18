import 'package:flutter/material.dart';
import 'package:nataraj/controllers/auth/auth_controller.dart';
import 'package:nataraj/controllers/home/projects_controller.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/widgets/custom_gradient_border_button.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';
import 'package:nataraj/widgets/no_active_projects.dart';
import 'package:nataraj/widgets/project_tile.dart';
import 'package:provider/provider.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final authController = Provider.of<AuthController>(context);
    final projectsController = Provider.of<ProjectsController>(context);
    //     WidgetsBinding.instance.addPostFrameCallback((_) {
    //   if (authController.user != null) {
    //     Navigator.pushReplacementNamed(context, RoutesString.welcomePageRoute);
    //   }
    // });
    return Scaffold(
      body: SizedBox(
        width: double.infinity,
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                  padding: EdgeInsets.all(20.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Image.asset(
                        AssetSrcs.logo,
                        scale: 5,
                      ),
                      CustomGradientBorderButton(
                        title: "Sign Out",
                        onPressed: () async {
                          await authController.signOut().then((value){
                            if(authController.user==null){
                              Navigator.pushNamedAndRemoveUntil(context, RoutesString.welcomePageRoute, (route) => false);
                            }
                          });
                        },
                        width: 150,
                        height: 40,
                        bg: AppColors.background,
                      ),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Text(
                  "Hi ${authController.user?.displayName?.split(" ")[0] ?? 'Guest'}!",
                  style:const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ),
              projectsController.length==0?const Expanded(
                  child: Padding(
                padding: EdgeInsets.all(20),
                child: Center(
                  child: NoActiveProjects(),
                ),
              )): Expanded(
                  child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                  const Row(
                      children: [
                        Text("YOUR PROJECTS", style: TextStyle(fontSize: 12, fontWeight: FontWeight.normal), textAlign: TextAlign.start,),
                      ],
                    ),
                    const SizedBox(height: 10,),
                    Expanded(child: ListView.builder(
                    itemCount: projectsController.length,
                      itemBuilder: ((context, index) {
                      return ProjectTile();
                    }))),
                    GradientBorderButton(title: "VIEW PAST PRACTICE REPORTS", onPressed: (){
                      Navigator.pushNamed(context, RoutesString.allReportsPageRoute);
                    }, width: 350)
                  ],
                )
              )
              
              )
              
            ],
          ),
        ),
      ),
    );
  }
}
