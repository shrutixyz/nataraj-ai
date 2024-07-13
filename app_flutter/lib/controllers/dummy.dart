import 'package:nataraj/models/dummy.dart';

class CounterController {
  final CounterModel model;

  CounterController(this.model);

  void incrementCounter() {
    model.increment();
  }
}