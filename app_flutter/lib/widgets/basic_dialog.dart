import 'package:flutter/material.dart';
import 'package:nataraj/utils/colors.dart';
import 'package:nataraj/widgets/gradient_border_button.dart';

class BasicDialog extends StatelessWidget {
  const BasicDialog({super.key, required this.title, required this.subtitle});
  final String title; final String  subtitle;
  @override
  Widget build(BuildContext context) {
    return Dialog(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              backgroundColor: AppColors.background,
              shadowColor: AppColors.background,
              surfaceTintColor: AppColors.black,
              child: SizedBox(
                height: 200,
                width: 350,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      title,
                      style:
                         const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                    ),
                  const  SizedBox(
                      height: 20,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20.0),
                      child: Text(
                        subtitle,
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    const  SizedBox(
                      height: 20,
                    ),
                    GradientBorderButton(title: "Close", onPressed: (){
                      Navigator.pop(context);
                    }, width: 200)
                  ],
                ),
              ),
            );
  }
}