import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:nataraj/controllers/firebase/firebase_messaging_bg_controller.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/utils/routes.dart';

Future<void> main() async {
    WidgetsFlutterBinding.ensureInitialized();
    await Firebase.initializeApp();
    FlutterError.onError = (errorDetails) {
      FirebaseCrashlytics.instance.recordFlutterFatalError(errorDetails);
    };
    // Pass all uncaught asynchronous errors that aren't handled by the Flutter framework to Crashlytics
    PlatformDispatcher.instance.onError = (error, stack) {
      FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      return true;
    };
    await initFirebaseMessaging();
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
        scaffoldBackgroundColor: AppColors.background,
      ),
      themeMode: ThemeMode.dark,
      initialRoute: RoutesString.welcomePageRoute,
      routes: Routes.getRoutes(),
    );
  }
}
