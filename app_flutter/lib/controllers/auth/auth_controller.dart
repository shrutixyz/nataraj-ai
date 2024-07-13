import 'package:nataraj/models/auth/auth_model.dart';

class AuthController {
  final AuthModel model;
  AuthController(this.model);
  void authWithEmail() {
    model.emailAuth();
  }
}
