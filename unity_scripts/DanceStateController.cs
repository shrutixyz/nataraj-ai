using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DanceStateController : MonoBehaviour
{
    Animator animator;
    int step = 0;
    int[] steps;
    public float rotationSpeed = 10.0f;
    float mouseXTotal = 0;
    int currentStep = 0;

    // Start is called before the first frame update
    void Start()
    {
        animator = GetComponent<Animator>();
        Time.timeScale = 0;
        // SetStepSequence("1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20");
        // ControlPlayState(2);
    }

    public void ControlPlayState (int playState) {
    if (playState == 0)
    {
        print("pausing game");
        Time.timeScale = 0;
    }
    else if (playState == 2)
    {
        Time.timeScale = 1;
        currentStep = 0;
        playNextNonIdleAnimation();
    }
    else
    {
        print("resuming game");
        Time.timeScale = 1;
    }
  }

    void SetStepSequence(string sequence)
    {
        string[] stepsString = sequence.Split(new string[] { "_" }, StringSplitOptions.None);
        steps = Array.ConvertAll(stepsString, s => int.Parse(s));
        print("started" + step);
    }

    void ResetOrientation()
    {
        print("called reset");
        transform.Rotate(Vector3.up, mouseXTotal, Space.World);
        mouseXTotal = 0;
    }

    void playNextNonIdleAnimation()
    {
        if (steps.Length > 0)
        {
            step = steps[(currentStep)%(steps.Length)];
            currentStep += 1;
            print("step: " + step);
            animator.SetInteger("step", step);
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButton(0))
        {
            float mouseX = Input.GetAxis("Mouse X") * rotationSpeed;
            transform.Rotate(Vector3.up, -mouseX, Space.World);
            mouseXTotal += mouseX;
        }

        bool isResetOrientation = Input.GetKey("1");
        if (isResetOrientation)
        {
            ResetOrientation();
        }

    }
}
