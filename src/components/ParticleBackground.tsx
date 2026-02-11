import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const reducedMotion = useReducedMotion();

  // Treat touch devices as "low power" to keep scrolling smooth
  const isCoarsePointer =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  const isLowPower = reducedMotion || isCoarsePointer;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: isLowPower ? 40 : 60,
      interactivity: {
        events: {
          onHover: {
            enable: !isLowPower,
            mode: "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"],
        },
        links: {
          color: "hsl(var(--primary))",
          distance: 150,
          enable: !isLowPower,
          opacity: 0.12,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: isLowPower ? 0.45 : 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: reducedMotion ? 28 : isCoarsePointer ? 45 : 80,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: !isLowPower,
            speed: 0.5,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [isCoarsePointer, isLowPower, reducedMotion]
  );

  if (!init) return null;

  return (
    <Particles id="tsparticles" options={options} className="absolute inset-0 -z-10" />
  );
};

export default ParticleBackground;
