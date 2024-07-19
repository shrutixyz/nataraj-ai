import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DancePage extends StatelessWidget {
  const DancePage({super.key});

  @override
  Widget build(BuildContext context) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      SystemChrome.setPreferredOrientations([DeviceOrientation.landscapeLeft]);
    });
    return const Placeholder();
  }
}