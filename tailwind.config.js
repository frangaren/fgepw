const plugin = require('tailwindcss/plugin')

const textDecorationColorPlugin = plugin(function ({ addComponents, theme}) {
  const colors = theme('colors', {});
  const components = [];

  for (const color in colors) {
    if (typeof colors[color] === 'string') {
      components.push({
        [`.tdc-${color}`]: {
          'text-decoration-color': `${colors[color]} !important`,
        }
      });
    } else {
      for (const variant in colors[color]) {
        components.push({
          [`.tdc-${color}-${variant}`]: {
            'text-decoration-color': `${colors[color][variant]} !important`,
          }
        });
      }
    }
  }

  addComponents(components, {
    variants: [
      'hover',
    ],
  });
});

const textDecorationThicknessPlugin = plugin(function ({ addComponents, theme}) {
  const thicknesses = theme('decorationThickness', {});
  const components = [];

  for (const thickness in thicknesses) {
    components.push({
      [`.tdt-${thickness}`]: {
        'text-decoration-thickness': `${thicknesses[thickness]} !important`,
      }
    });
  }

  addComponents(components, {
    variants: [
      'hover',
    ],
  });
});

const textUnderlineOffsetPlugin = plugin(function ({ addComponents, theme}) {
  const offsets = theme('underlineOffset', {});
  const components = [];

  for (const offset in offsets) {
    components.push({
      [`.uo-${offset}`]: {
        'text-underline-offset': `${offsets[offset]}`,
      }
    });
  }

  addComponents(components, {
    variants: [
      'hover',
    ],
  });
});

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'code': `url('${process.env.PATH_PREFIX ?? ''}/theme/img/code.png')`,
      },
      borderWidth: {
        '1': '1px',
      },
      colors: {
        primary: '#1c3144',
        secondary: '#db6b6b',
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1024px',
          '2xl': '1024px',
        }
      },
      decorationThickness: {
        zero: '0',
        sm: '0.0625rem',
        md: '0.1255rem',
        lg: '0.25rem',
        xl: '0.5rem',
        '2xl': '1rem',
      },
      minWidth: {
        sm: '4rem',
        md: '8rem',
        lg: '16rem',
        xl: '32rem',
        '2xl': '64rem',
      },
      underlineOffset: {
        sm: '0.0625rem',
        md: '0.1255rem',
        lg: '0.25rem',
        xl: '0.5rem',
        '2xl': '1rem',
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [
    textDecorationColorPlugin,
    textDecorationThicknessPlugin,
    textUnderlineOffsetPlugin,
  ],
}
