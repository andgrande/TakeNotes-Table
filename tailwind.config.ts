import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderSpacing: {
        "0.25": "0.0625rem",
      },
      maxWidth: {
        "1/12": "8.333333%",
      },
      minWidth: {
        "1/5": "20%",
      },
      maxHeight: {
        "116px": "116px",
      },
      height: {
        "116px": "116px",
      },
      animation: {
        "blinking": "blinking 2s",
        "sliding": "sliding 0.3s"
      },
      colors: {
        "teal-150": "#bdffff",
        "teal-250": "#9ffaf6",
        "teal-350": "#81f6ec",
        "teal-450": "#62f1e3",
        "teal-550": "#44ecd9",
        "green-150": "#28e5b0",
        "green-250": "#1ed29f"
      }
    },
  },
  plugins: [],
};
export default config;
