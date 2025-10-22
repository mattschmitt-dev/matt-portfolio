import React, { useEffect, useMemo, useState } from "react"
import TopNavbar from "../components/TopNavbar"
import ScrollToTopButton from "../components/ScrollToTopButton"
import Footer from "../components/Footer"
import QRCodeContainer from "@components/QRCodeContainer"
import Image from 'next/image'
import BackgroundImage from "/public/images/background-image.png"
import BackgroundAVIF from "/public/images/background.avif"
import DarkBackgroundImage from "/public/images/dark-background-image.png"
import DarkBackgroundAVIF from "/public/images/dark-background.avif"
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showQR, setShowQR] = useState(false);
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1ff",
        },
        opacity: 0
      },
      fpsLimit: 120,
      interactivity: {
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#30a736ff",
        },
        links: {
          color: "#348038ff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );
  return (
    <>
      <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">

        {/* Background Styling Starts */}
        <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
          <div className="w-[108rem] flex-none flex justify-end">
            {/* <picture>
              <source srcSet={BackgroundAVIF.toString()} type="image/avif" />
              <Image
                src={BackgroundImage}
                className="w-[71.75rem] flex-none max-w-none dark:hidden"
                width={900}
                height={261}
                alt="Background Image"
                quality={50}
                priority
                decoding="async"
                style={{ width: "auto", height: "auto" }}
              />
            </picture>
            <picture>
              <source srcSet={DarkBackgroundAVIF.toString()} type="image/avif" />
              <Image
                src={DarkBackgroundImage}
                className="w-[90rem] flex-none max-w-none hidden dark:block"
                width={900}
                height={385}
                alt="Dark Background Image"
                quality={50}
                priority
                decoding="async"
                style={{ width: "auto", height: "auto" }}
              />
            </picture> */}
            {init && (
              <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
              />)}
          </div>
        </div>
        {/* Background Styling Ends */}

        <TopNavbar />
        <main className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-darkFifth">{children}</main>
        <Footer setShowQR={setShowQR} showQR={showQR} />
        <ScrollToTopButton />
        <QRCodeContainer showQR={showQR} setShowQR={setShowQR} />
      </div>
    </>
  )
}
