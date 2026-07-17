import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a3d52",
          "navy-dark": "#072d3d",
          green: "#10b981",
          "green-dark": "#059669",
          "green-light": "#d1fae5",
          border: "#e5e7eb",
          purple: "#7c3aed",
          red: "#dc2626",
          amber: "#f59e0b",
          card: "#f5f6f8",
          body: "#1f2937",
          muted: "#6b7280",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        thai: [
          "var(--font-thai)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
