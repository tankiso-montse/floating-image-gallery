'use client';
import Image from "next/image";
import { useRef } from "react";
import { IMAGE_PATHS } from "@/constants";
import gsap from "gsap";


export default function Home() {
  const plane1 = useRef(null); 
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  const speed = 0.1; // Controls the speed of the mouse movement. Adjust as needed.
  let xForce = 0; 
  let yForce = 0;
  let requestAnimationFrameId: number | null = null;


  const manageMouseMove = (event: React.MouseEvent) => {
    // Event handler accesses the y and x movement of the current mouseMove event and using gsap we control the direction of each plane and the speed that it moves in.
    // Further reduced speed on plane2 and 3 so we get a move balanced and clean animation of a floating effect.
    const {movementX, movementY} = event;
      xForce = movementX * speed; 
      yForce = movementY * speed;

    if (requestAnimationFrameId === null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const animate = () => {
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25} `})
    requestAnimationFrame(animate); // recursive function call to keep the animation going
  }

  return (
    <main className="h-screen w-screen overflow-hidden relative" onMouseMove={manageMouseMove}>
      <div ref={plane1} className="plane">
        <Image src={IMAGE_PATHS.image1} alt="image" width={200} height={200} />
        <Image src={IMAGE_PATHS.image2} alt="image" width={200} height={200} />
        <Image src={IMAGE_PATHS.image3} alt="image" width={200} height={200} />
      </div>
      <div ref={plane2} className="plane">
        <Image src={IMAGE_PATHS.image4} alt="image" width={200} height={200} />
        <Image src={IMAGE_PATHS.image6} alt="image" width={200} height={200} />
        <Image src={IMAGE_PATHS.image8} alt="image" width={200} height={200} />
      </div>
      <div ref={plane3} className="plane">
        <Image src={IMAGE_PATHS.image5} alt="image" width={200} height={200} />
        <Image src={IMAGE_PATHS.image7} alt="image" width={200} height={200} />
      </div>
    </main>
  );
}
