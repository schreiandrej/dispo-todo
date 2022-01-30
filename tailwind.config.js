module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        base: 'var(--color-text-base)',
        hover: 'var(--color-text-hover)',
        accent: 'var(--color-text-accent)',
        inverted: 'var(--color-text-inverted)',
        'heading-1': 'var(--color-heading-1)',
        'heading-2': 'var(--color-heading-2)',
        'heading-3': 'var(--color-heading-3)',
        'heading-4': 'var(--color-heading-4)'
      },
      backgroundColor: {
        base: 'var(--color-background)',
        accent: 'var(--color-background-accent)'
      },
      borderColor: {
        base: 'var(--color-border)',
        active: 'var(--color-border-active)',
        hover: 'var(--color-border-hover)'
      },
      ringColor: {
        active: 'var(--color-border-active)',
        focus: 'var(--color-border-focus)',
        hover: 'var(--color-border-hover)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};
