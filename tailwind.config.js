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
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
  ],
};
