import type { Config } from 'tailwindcss'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                darkBlue: {
                    light: '#e8eaec',
                    'light-hover': '#dce0e3',
                    'light-active': '#b7bfc4',
                    DEFAULT: '#173141', // Normal
                    hover: '#152c3b',
                    active: '#122734',
                    dark: '#112531',
                    'dark-hover': '#0e1d27',
                    'dark-active': '#0a161d',
                },
                blueGreen: {
                    light: '#eaf8f8',
                    'light-hover': '#e0f5f4',
                    'light-active': '#bfeae8',
                    DEFAULT: '#30bbb4',
                    hover: '#2ba8a2',
                    active: '#269690',
                    dark: '#248c87',
                    'dark-hover': '#1d706c',
                    'dark-active': '#165451',
                },
                yellow: {
                    light: '#fef8e9',
                    'light-hover': '#fef5dd',
                    'light-active': '#fdeab9',
                    DEFAULT: '#f7bb1e',
                    hover: '#dea81b',
                    active: '#c69618',
                    dark: '#b98c17',
                    'dark-hover': '#947012',
                    'dark-active': '#6f540d',
                },
                grey: {
                    light: '#f7f7f7',
                    'light-hover': '#f3f3f3',
                    'light-active': '#e7e7e7',
                    DEFAULT: '#b0b0b0',
                    hover: '#9e9e9e',
                    active: '#8d8d8d',
                    dark: '#848484',
                    'dark-hover': '#6a6a6a',
                    'dark-active': '#4f4f4f',
                },
                neutrals: {
                    white: {
                        light: '#fefeff',
                        'light-hover': '#fdfeff',
                        'light-active': '#fbfcff',
                        normal: '#f1f6ff',
                        'normal-hover': '#d9dde6',
                        'normal-active': '#c1c5cc',
                        dark: '#b5b9bf',
                        'dark-hover': '#919499',
                        'dark-active': '#6c6f73',
                        darker: '#545659',
                    },
                    grey: {
                        light: '#f7f7f7',
                        'light-hover': '#f3f3f3',
                        'light-active': '#e7e7e7',
                        normal: '#b0b0b0',
                        'normal-hover': '#9e9e9e',
                        'normal-active': '#8d8d8d',
                        dark: '#848484',
                        'dark-hover': '#6a6a6a',
                        'dark-active': '#4f4f4f',
                        darker: '#3e3e3e',
                    },
                    blacks: {
                        light: '#e8e8ea',
                        'light-hover': '#dddde0',
                        'light-active': '#b8b8be',
                        normal: '#1a1a2e',
                        'normal-hover': '#171729',
                        'normal-active': '#151525',
                        dark: '#141423',
                        'dark-hover': '#10101c',
                        'dark-active': '#0c0c15',
                        darker: '#090910',
                    },
                },
                signals: {
                    validation: {
                        light: '#e7fbf3',
                        'light-hover': '#dbf9ec',
                        'light-active': '#b5f4d8',
                        normal: '#10da82',
                        'normal-hover': '#0ec475',
                        'normal-active': '#0dae68',
                        dark: '#0ca462',
                        'dark-hover': '#0a834e',
                        'dark-active': '#07623a',
                        darker: '#064c2e',
                    },
                    warning: {
                        light: '#fff5ee',
                        'light-hover': '#fff0e6',
                        'light-active': '#ffe1cb',
                        normal: '#ff9e57',
                        'normal-hover': '#e68e4e',
                        'normal-active': '#cc7e46',
                        dark: '#bf7741',
                        'dark-hover': '#995f34',
                        'dark-active': '#734727',
                        darker: '#59371e',
                    },
                    forbidden: {
                        light: '#ffefef',
                        'light-hover': '#ffe7e7',
                        'light-active': '#ffcdcd',
                        normal: '#ff5e5e',
                        'normal-hover': '#e65555',
                        'normal-active': '#cc4b4b',
                        dark: '#bf4747',
                        'dark-hover': '#993838',
                        'dark-active': '#732a2a',
                        darker: '#592121',
                    },
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            letterSpacing: {
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0',
                wide: '0.025em',
                wider: '0.05em',
            },
            fontFamily: {
                display: ['Carrois Gothic SC', 'sans-serif'], // Pour les titres Display
                heading: ['Questrial', 'sans-serif'], // Pour les titres H1 à H6
                body: ['Quattrocento Sans', 'sans-serif'], // Pour le texte courant
            },
            fontSize: {
                // Taille pour les styles Display
                'display-1': ['149px', { lineHeight: '1.2' }],
                'display-2': ['119px', { lineHeight: '1.2' }],
                'display-3': ['95px', { lineHeight: '1.2' }],

                // Taille pour les titres (Heading)
                h1: ['76px', { lineHeight: '1.2' }],
                h2: ['61px', { lineHeight: '1.2' }],
                h3: ['49px', { lineHeight: '1.2' }],
                h4: ['39px', { lineHeight: '1.2' }],
                h5: ['31px', { lineHeight: '1.2' }],
                h6: ['25px', { lineHeight: '1.2' }],

                // Taille pour le texte Body
                'text-1': ['20px', { lineHeight: '1.6' }],
                'text-2': ['16px', { lineHeight: '1.6' }],
                'text-3': ['15px', { lineHeight: '1.6' }],
                'text-4': ['13px', { lineHeight: '1.6' }],
                'text-5': ['11px', { lineHeight: '1.6' }],
                'text-6': ['10px', { lineHeight: '1.6' }],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
