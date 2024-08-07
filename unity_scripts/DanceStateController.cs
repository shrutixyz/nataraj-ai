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
    int currentStep = 0;
    void Start()
    {
        animator = GetComponent<Animator>();
    }

    void playNextNonIdleAnimation()
    {
        print("here");
        step = ((currentStep) % 3) + 1;
        currentStep += 1;
        animator.SetInteger("step", step);
        print("step: " + step + "current step: " + currentStep);
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
