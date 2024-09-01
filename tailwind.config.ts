import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-cinzel)"],
        secondary: ["var(--font-libre-baskerville)"],
      },
    },
  },
  presets: [require("@relume_io/relume-tailwind")],
  plugins: [],
};
export default config;