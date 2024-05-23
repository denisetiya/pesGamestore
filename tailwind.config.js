/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

const config = withMT({
  content: [
    './index.html',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './node_modules/@material-tailwind/react/components/**/*.js',
    './node_modules/@material-tailwind/react/components/**/*.ts',
    './node_modules/@material-tailwind/react/components/**/*.jsx',
    './node_modules/@material-tailwind/react/components/**/*.tsx',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

export default config;