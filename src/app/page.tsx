'use client';
import Image from "next/image";
import { useRef } from "react";
import { IMAGE_PATHS } from "@/constants";


export default function Home() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  return (
    <main className="h-screen w-screen overflow-hidden relative">
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
