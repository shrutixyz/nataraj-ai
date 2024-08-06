import 'package:flutter/material.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/views/auth/email_login_page.dart';
import 'package:nataraj/views/auth/welcome_page.dart';
import 'package:nataraj/views/error/404_page.dart';
import 'package:nataraj/views/home/home_page.dart';
import 'package:nataraj/views/practice/generating_report_page.dart';
import 'package:nataraj/views/reports/all_reports_page.dart';

class Routes {
  static Map<String, WidgetBuilder> getRoutes() {
    return {
      RoutesString.welcomePageRoute: (context) => const WelcomePage(),
      RoutesString.loginPageRoute: (context) => const EmailLoginPage(),
      RoutesString.allReportsPageRoute: (context) => const AllReports(),
      // RoutesString.configurationPageRoute: (context) => const ConfigurationPage(),
      // RoutesString.dancePageRoute: (context) => const DancePage(),
      RoutesString.generatingReportPageRoute: (context) => const GeneratingReportPage(),
      RoutesString.homePageRoute: (context) => const HomePage(),
      RoutesString.notFoundRoute: (context) => const FourOhFourPage(),
      // RoutesString.singleReportPageRoute: (context) => const SingleReport(),
    };
  }
}