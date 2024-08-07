using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DanceStateController : MonoBehaviour
{
    // Start is called before the first frame update
    // flair-> 0, 2
    // hip hop -> -2, 0
    // shuffling -> 2, 0
    Animator animator;
    int step = 0;
    int[] steps;
    int currentStep = 0;
    int startBot = 0;
    void Start()
    {
        animator = GetComponent<Animator>();
        Time.timeScale = 0;
        // SetStepSequence("1_2_3");
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

    void playNextNonIdleAnimation()
    {
        if (steps.Length > 0)
        {
            step = steps[(currentStep)%3];
            currentStep += 1;
            print("step: " + step);
            animator.SetInteger("step", step);
        }
    }

    // Update is called once per frame
    void Update()
    {
        bool shufflePressed = Input.GetKey("1");
        bool flairPressed = Input.GetKey("3");
        bool hipHopPressed = Input.GetKey("2");

        if (shufflePressed)
        {
            step = 1;
        } 
        else if (flairPressed)
        {
            step = 3;
        }
        else if (hipHopPressed)
        {
            step = 2;
        }

        if (shufflePressed || flairPressed || hipHopPressed)
        {
            animator.SetInteger("step", step);
        }
    
    }
}
