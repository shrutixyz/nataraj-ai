import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class ProjectsController with ChangeNotifier {

   final baseUrl = "https://singular-node-429217-j4.uc.r.appspot.com";
  Future<dynamic> fetchProjects(uid) async {
    final response = await http.get(Uri.parse("$baseUrl/fetchprojects/$uid"));
    loading = false;
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      projects = data["projects"];
      length = data["projects"].length;
      log(projects.toString());
      notifyListeners();
      
    } else {
      throw Exception('Failed to load data');
    }
  }

  ProjectsController() {
    // length = 7;
    // implement firestore fetching here
  }

  int length=-1;
  List<dynamic> projects = [];
  bool loading = true;
}
