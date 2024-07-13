import 'dart:developer';
import 'package:flutter/material.dart';

class AuthModel with ChangeNotifier {
    void emailAuth()async{
      log("check");
      notifyListeners();
    }
}