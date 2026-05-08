import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#05070b",
        panel: "rgba(8, 12, 20, 0.72)",
        line: "rgba(255,255,255,0.08)",
        neon: {
          50: "#eaffea",
          100: "#ceffcf",
          200: "#a6ffa9",
          300: "#74ff7a",
          400: "#40ff4f",
          500: "#00ff66",
          600: "#00d44f",
          700: "#009f3d",
          800: "#007831",
          900: "#005a25",
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,255,102,0.18), 0 0 30px rgba(0,255,102,0.14)",
        soft: "0 10px 40px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "grid-fine": "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
        "hero-radial": "radial-gradient(circle at top, rgba(0,255,102,.20), transparent 35%), radial-gradient(circle at 80% 20%, rgba(0,153,255,.14), transparent 25%), radial-gradient(circle at 30% 60%, rgba(0,255,102,.08), transparent 20%)"
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" }
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "80px 80px" }
        }
      },
      animation: {
        glowPulse: "glowPulse 4s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        gridMove: "gridMove 14s linear infinite"
      }
    }
  },
  plugins: [],
};
export default config;
