import 'dart:convert';
import 'dart:developer';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:nataraj/models/auth/github_auth_model.dart';
import 'package:nataraj/models/auth/user_model.dart';
import 'package:http/http.dart' as http;
import 'package:nataraj/widgets/basic_dialog.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';


class AuthController with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  String email = "";
  String password = "";
  String loginErrorMessage = "";
 
  AuthController() {
    _auth.authStateChanges().listen((User? user) {
      _user = UserModel(
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      );
      if (user == null) {
        _user = null;
      }
      notifyListeners();
    });
  }

  void updateEmail(String text) {
    email = text;
  }

  void updatePassword(String text) {
    password = text;
  }

  Future<dynamic> signinWithEmailPassword() async {
    try {
      final result = await _auth.signInWithEmailAndPassword(
          email: email, password: password);
      log(result.toString());
      return result.user;
    } catch (e) {
      log(e.toString());
      loginErrorMessage = e.toString();
      return e.toString();
    }
  }

  UserModel? _user;

  UserModel? get user => _user;


  GithubAUthModel? _githubAUthModel;

  GithubAUthModel? get githubAuth => _githubAUthModel;

  bool githubMatchUrl(String url) {
    return url
        .startsWith('https://nataraj-ai.firebaseapp.com/__/auth/handler?code');
  }

  String getGithubAuthURL(){
    return  'https://github.com/login/oauth/authorize?client_id=$clientId&redirect_uri=https://nataraj-ai.firebaseapp.com/__/auth/handler&scope=read:user';
  }

  Future<void> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      final GoogleSignInAuthentication googleAuth =
          await googleUser!.authentication;

      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final UserCredential userCredential =
          await _auth.signInWithCredential(credential);
      final User? user = userCredential.user;

      _user = UserModel(
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      );
      notifyListeners();
    } catch (e) {
      loginErrorMessage = e.toString();
      log(e.toString());
    }
  }

  final String? clientId = dotenv.env['GITHUB_CLIENT_ID'];
  final String? clientSecret = dotenv.env['GITHUB_CLIENT_SECRET'];
  final String redirectUrl =
      'https://nataraj-ai.firebaseapp.com/__/auth/handler';

  Future<void> signInWithGitHub(accessToken) async {
    try {
      final AuthCredential credential =
          GithubAuthProvider.credential(accessToken);
      final UserCredential userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);
      final User? user = userCredential.user;
      _user = UserModel(
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      );
      notifyListeners();
    } catch (e) {
      loginErrorMessage = e.toString();
      log(e.toString());
    }
  }

  Future<String?> getAccessToken(String url) async {
    final code = Uri.parse(url).queryParameters['code'];
    // final code = "5dd018e31cb9cc26ceea";

    final response = await http.post(
      Uri.parse('https://github.com/login/oauth/access_token'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      
      body: jsonEncode({
        'client_id': clientId,
        'client_secret': clientSecret,
        'code': code,
        'redirect_uri': redirectUrl,
      }),
    );

    final accessToken = jsonDecode(response.body)['access_token'];
    return accessToken;
  }

  Future<void> signOut() async {
    await _auth.signOut();
    await _googleSignIn.signOut();
    _user = null;
    notifyListeners();
  }

  void showErrorDialog(context) {
    showDialog(
        context: context,
        builder: (context) => BasicDialog(
              title: "Error Logging In",
              subtitle: loginErrorMessage,
            ));
  }
}
