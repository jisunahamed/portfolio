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
            mode: "grab", // Stick to cursor like active connections
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.8,
              color: "hsl(var(--primary))",
            },
          },
        },
      },
      particles: {
        color: {
          value: "hsl(var(--primary))", // Unified node color
        },
        links: {
          color: "hsl(var(--primary))",
          distance: 180, // Longer connections
          enable: !isLowPower,
          opacity: 0.2, // Subtle lines
          width: 1,
          triangles: {
            enable: true,
            opacity: 0.05, // Faint web effect
          }
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: isLowPower ? 0.3 : 0.6, // Slower, more deliberate movement
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: reducedMotion ? 30 : isCoarsePointer ? 50 : 90,
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
        },
        shape: {
          type: "circle", // Nodes
        },
        size: {
          value: { min: 2, max: 4 }, // Slightly larger nodes
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
