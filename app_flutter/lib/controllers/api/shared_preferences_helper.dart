import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';



class DancePracticeReport {
  DateTime dateTime;
  double matchRate;
  String musicUrl;
  String videourl;

  DancePracticeReport({
    required this.dateTime,
    required this.matchRate,
    required this.musicUrl,
    required this.videourl
  });

  Map<String, dynamic> toJson() {
    return {
      'dateTime': dateTime.toIso8601String(),
      'matchRate': matchRate,
      'musicUrl': musicUrl,
      'videourl':videourl.toString()
    };
  }

  factory DancePracticeReport.fromJson(Map<String, dynamic> json) {
    return DancePracticeReport(
      dateTime: DateTime.parse(json['dateTime']),
      matchRate: json['matchRate'],
      musicUrl: json['musicUrl'],
      videourl: json['videourl']
    );
  }
}


class SharedPreferencesHelper {
  static const String _reportsKey = 'dance_practice_reports';

  Future<void> addReport(DancePracticeReport report) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String>? reportsJson = prefs.getStringList(_reportsKey) ?? [];
    reportsJson.add(jsonEncode(report.toJson()));
    await prefs.setStringList(_reportsKey, reportsJson);
  }

  Future<void> deleteReport(int index) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String>? reportsJson = prefs.getStringList(_reportsKey) ?? [];
    if (index >= 0 && index < reportsJson.length) {
      reportsJson.removeAt(index);
      await prefs.setStringList(_reportsKey, reportsJson);
    }
  }

  Future<List<DancePracticeReport>> getReports() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String>? reportsJson = prefs.getStringList(_reportsKey) ?? [];
    return reportsJson.map((reportJson) => DancePracticeReport.fromJson(jsonDecode(reportJson))).toList();
  }
}