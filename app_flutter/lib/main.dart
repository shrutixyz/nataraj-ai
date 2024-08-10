import 'dart:developer';
import 'dart:io';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:nataraj/controllers/auth/auth_controller.dart';
import 'package:nataraj/controllers/firebase/firebase_messaging_bg_controller.dart';
import 'package:nataraj/controllers/home/projects_controller.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/utils/constants.dart';
import 'package:nataraj/utils/routes.dart';
import 'package:nataraj/views/pose_net.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:provider/provider.dart';
import "package:http/http.dart" as http;
import 'package:image/image.dart' as img;

  Future<void> requestPermissions() async {
    var status = await Permission.camera.status;
    if (!status.isGranted) {
      await Permission.camera.request();
    }

    status = await Permission.microphone.status;
    if (!status.isGranted) {
      await Permission.microphone.request();
    }

    status = await Permission.storage.status;
    if (!status.isGranted) {
      await Permission.storage.request();
    }
  }

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await requestPermissions();
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
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthController()),
        ChangeNotifierProvider(create: (context) => ProjectsController()),
      ],
      child: MaterialApp(
        title: "Nataraj AI",
        theme: ThemeData(
            fontFamily: 'Inter',
            scaffoldBackgroundColor: AppColors.background,
            brightness: Brightness.dark,
            primarySwatch: Colors.amber,
            textTheme: const TextTheme(
              bodyMedium: TextStyle(color: Colors.white),
            )),
        themeMode: ThemeMode.dark,
        initialRoute: RoutesString.welcomePageRoute,
        routes: Routes.getRoutes(),
      ),
    );
  }
}
