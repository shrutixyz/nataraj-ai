import 'dart:developer';
import 'dart:io';
import 'dart:typed_data';
import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:image/image.dart' as img;

class PoseEstimation {
  late Interpreter _interpreter;
  late List<int> _inputShape;
  late List<int> _outputShape;

  PoseEstimation() {
    _loadModel();
  }

  // Load the tflite model
  void _loadModel() async {
    try {
      _interpreter = await Interpreter.fromAsset('assets/model/posenet.tflite');

      // Get input and output shapes
      _inputShape = _interpreter.getInputTensor(0).shape;
      _outputShape = _interpreter.getOutputTensor(0).shape;
    } catch (e) {
      print('Error loading model: $e');
    }
  }

  // Run inference on the image
  List<Map<String, dynamic>> estimatePose(File imageFile) {
    // Prepare the image for inference
    Uint8List input = _preProcess(imageFile);

    // Allocate output buffer
    List<double> output = List.filled(_outputShape[1] * 3, 0.0);
log(output.toString());
    // Run inference
    _interpreter.run(output, output);
    // _interpreter.run(input, output);

    // Post-process the output to get keypoints
    return _postProcess(output);
  }

  // Pre-process the image: resize, normalize, etc.
  Uint8List _preProcess(File imageFile) {
    // Load the image file as a Uint8List
    img.Image image = img.decodeImage(imageFile.readAsBytesSync())!;

    // Resize image to the required dimensions
    img.Image resizedImage = img.copyResize(image,
        width: _inputShape[1], height: _inputShape[2]);

    // Normalize pixel values to range [0, 1] and flatten
    List<double> normalizedPixels = resizedImage.data!
        .map((pixel) => (pixel.r / 255.0))
        .toList();

    return Float32List.fromList(normalizedPixels).buffer.asUint8List();
  }

  // Post-process the output to extract the keypoints
  List<Map<String, dynamic>> _postProcess(List<double> output) {
    List<Map<String, dynamic>> keypoints = [];

    for (int i = 0; i < _outputShape[1]; i++) {
      double x = output[i * 3];
      double y = output[i * 3 + 1];
      double confidence = output[i * 3 + 2];

      keypoints.add({
        'x': x,
        'y': y,
        'confidence': confidence,
      });
    }

    return keypoints;
  }
}
