import 'package:flutter/material.dart';

class ProjectsController with ChangeNotifier {
  ProjectsController() {
    length = 7;
    // implement firestore fetching here
  }

  int length=0;
}
