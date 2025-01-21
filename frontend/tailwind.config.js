/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mywhite: "#fceee3",
        myred: "#ff5052",
        myyellow: "#ffdc02",
        myviolet: "#c4b5fd",
        //mygreen: "#b5fdc4",
        mygreen: "#0CCE6B",
      },
      backgroundImage: {
        mainbg:
          "linear-gradient(to bottom, #c4b5fd, #c4b5fd 30% ,#fceee3 30%, #fceee3)",
        logs: "linear-gradient(to left, #ffdc02 50%, #fceee3 50%)",
      },
      boxShadow: {
        neobrutalism: "3px 3px 0 0 black",
        neobrutalismHover: "6px 6px 0 0 black",
        smallNeobrutalism: "2px 2px 0 0 black",
        smallNeobrutalismHover: "4px 4px 0 0 black",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        minerva: ["minerva", "sans-serif"],
      },
    },
  },
  plugins: [],
};
