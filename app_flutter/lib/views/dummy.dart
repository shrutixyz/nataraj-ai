import 'package:flutter/material.dart';
import 'package:nataraj/controllers/dummy.dart';
import 'package:nataraj/models/dummy.dart';
import 'package:provider/provider.dart';

class CounterView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final controller = CounterController(Provider.of<CounterModel>(context));

    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Consumer<CounterModel>(
          builder: (context, model, child) => Text('${model.counter}'),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: controller.incrementCounter,
        child: Icon(Icons.add),
      ),
    );
  }
}