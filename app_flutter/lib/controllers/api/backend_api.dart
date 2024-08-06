import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class BackendAPI with ChangeNotifier {
  final baseUrl = "https://singular-node-429217-j4.uc.r.appspot.com";
  Future<dynamic> fetchProjects(uid) async {
    final response = await http.get(Uri.parse("$baseUrl/fetchprojects/$uid"));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Failed to load data');
    }
  }

  Future<String> getSuggestions() async {
    final response = await http.get(Uri.parse("$baseUrl/getsuggestion"));
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      return data["suggestion"]??"No suggestions";
    } else {
      throw Exception('Failed to load data');
    }
  }
}
