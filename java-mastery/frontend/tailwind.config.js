export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'gradient': 'gradient 5s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            gradient: {
                '0%, 100%': { 'background-position': '0% 50%' },
                '50%': { 'background-position': '100% 50%' },
            },
        }
    }
  },
  plugins: []
};
