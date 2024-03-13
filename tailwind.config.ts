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
        "98%": "98%",
        "90vh": "90vh",
        "95vh": "95vh",
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
        "green-250": "#1ed29f",
        'white-0': 'rgba(255,255,255)',
        'white-100': 'rgba(255,255,255,0.1)',
        'white-900': 'rgba(255,255,255,0.9)',
        'pale-200': 'rgb(242, 239, 229)',
        'pale-300': 'rgb(227, 225, 217)',
        'pale-500': 'rgb(199, 200, 204)',
        'pale-600': 'rgb(180, 180, 184)',
        'pale-700': 'rgb(92, 131, 116)',
        'pale-800': 'rgb(27, 66, 66)',
        'pale-900': 'rgb(9, 38, 53)',
      }
    },
  },
  plugins: [],
};
export default config;
