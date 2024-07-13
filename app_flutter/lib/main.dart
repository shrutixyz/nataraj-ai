import 'package:flutter/material.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/utils/routes.dart';

void main() async {
  runApp(const Nataraj());
}

class Nataraj extends StatelessWidget {
  const Nataraj({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Nataraj AI",
      theme: ThemeData(
        fontFamily: 'Inter',
      ),
      initialRoute: RoutesString.welcomePageRoute,
      routes: Routes.getRoutes(),
    );
  }
}
