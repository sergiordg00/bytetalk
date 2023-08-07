/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './shared-components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgprimary: "rgb(var(--bg-primary) / <alpha-value>)",
        bgsecondary: "rgb(var(--bg-secondary) / <alpha-value>)",
        bgtertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
        bgempty: "rgb(var(--bg-empty) / <alpha-value>)",
        textprimary: "rgb(var(--text-primary) / <alpha-value>)",
        textsecondary: "rgb(var(--text-secondary) / <alpha-value>)",
        textmuted: "rgb(var(--text-muted) / <alpha-value>)",
        borderprimary: "rgb(var(--border-primary) / <alpha-value>)",
        bordersecondary: "rgb(var(--border-secondary) / <alpha-value>)",
        accentprimary: "rgb(var(--accent-primary) / <alpha-value>)",
        accentsecondary: "rgb(var(--accent-secondary) / <alpha-value>)",
        hoverprimary: "rgb(var(--hover-primary) / <alpha-value>)",
        hoversecondary: "rgb(var(--hover-secondary) / <alpha-value>)",

        // @tip: IT WOULD BE BETTER TO HAVE MULTIPLE SHADES OF EACH COLORS LIKE THE DEFAULT TAILWIND CONFIG DOES (100, 200, 300...)
        // @note: if some values require "transparent", dont add it here and use theme provider instead and use clsx to add the class conditionally
        // @reminder_for_myself: always define the color palette in the begginning of the project
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
  ],
};
