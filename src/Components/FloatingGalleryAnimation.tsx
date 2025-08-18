'use client';
import React, { useRef } from 'react'
import Image from "next/image";
import {PLANES_DATA } from "@/constants";
import gsap from "gsap";

function FloatingGalleryAnimation() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  const planes = [plane1, plane2, plane3];

  const speed = 0.1; // Controls the speed of the mouse movement. Adjust as needed.
  let xForce = 0;
  let yForce = 0;
  let requestAnimationFrameId: number | null = null;
  const easing = 0.08;


  const manageMouseMove = (event: React.MouseEvent) => {
    // Event handler accesses the y and x movement of the current mouseMove event and using gsap we control the direction of each plane and the speed that it moves in.
    // Further reduced speed on plane2 and 3 so we get a move balanced and clean animation of a floating effect.
    const { movementX, movementY } = event;
    xForce = movementX * speed;
    yForce = movementY * speed;

    if (requestAnimationFrameId === null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  // Using linear interpolation to apply easing to the movement of the planes so they don't just float away immediately.
  // This function takes a start value, an end value, and an amount (between 0 and 1) to interpolate between the two values.
  // The closer the amount is to 0, the closer the result will be to the start value; the closer it is to 1, the closer it will be to the end value.
  const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing); // Smoothly reduce the force to zero
    yForce = lerp(yForce, 0, easing);

    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` })
    gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` })
    gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25} ` })

    if (Math.abs(xForce) < 0.01) xForce = 0; // Reset xForce if it's very small
    if (Math.abs(yForce) < 0.01) yForce = 0; // Reset yForce if it's very small

    if (xForce !== 0 && yForce !== 0) {
      requestAnimationFrame(animate); // recursive function call to keep the animation going
    } else {
      cancelAnimationFrame(requestAnimationFrameId!)
      requestAnimationFrameId = null;
    }
  }



  return (
    <main className="h-screen w-screen overflow-hidden relative" onMouseMove={manageMouseMove}>
      {PLANES_DATA.map((images, planeIndex) => (
        <div key={planeIndex} ref={planes[planeIndex]} className="plane">
          {images.map((imagePath, index) => (
            <Image src={imagePath} alt={'image'} width={200} height={200} key={index} />
          ))}
        </div>
      ))}
    </main>
  )
}

export default FloatingGalleryAnimation