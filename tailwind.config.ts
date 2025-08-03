import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-body)',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			serif: [
  				'var(--font-heading)',
  				'Georgia',
  				'Cambria',
  				'serif'
  			],
  			signal: [
  				'var(--font-signal)'
  			],
  			hind: [
  				'var(--font-hind)'
  			]
  		},
  		colors: {
  			shadow: {
  				DEFAULT: '#131321',
  				rgb: '19, 19, 33'
  			},
  			indigo: {
  				DEFAULT: '#2C2A4A',
  				rgb: '44, 42, 74'
  			},
  			orchid: {
  				DEFAULT: '#4F518C',
  				rgb: '79, 81, 140'
  			},
  			lilac: {
  				DEFAULT: '#9D7AD6',
  				rgb: '144, 122, 214'
  			},
  			lavender: {
  				DEFAULT: '#DABFFF',
  				rgb: '218, 191, 255'
  			},
  			skyward: {
  				DEFAULT: '#7FEDFF',
  				rgb: '127, 222, 255'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			website: {
  				background: '#f9f9f9',
  				text: '#333',
  				primary: '#3498db',
  				secondary: '#f1c40f',
  				accent: '#e74c3c'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		zIndex: {
  			'60': '60'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'orb-wave': {
  				'0%, 100%': {
  					transform: 'scale(1) translate(0, 0) rotate(0deg)',
  					opacity: '0.3'
  				},
  				'50%': {
  					transform: 'scale(1.05) translate(5px, 5px) rotate(180deg)',
  					opacity: '0.5'
  				}
  			},
  			'orb-wave-slow': {
  				'0%, 100%': {
  					transform: 'scale(1) translate(0, 0) rotate(0deg)',
  					opacity: '0.2'
  				},
  				'50%': {
  					transform: 'scale(1.02) translate(2px, 2px) rotate(180deg)',
  					opacity: '0.4'
  				}
  			},
  			'voice-wave': {
  				'0%, 100%': {
  					height: '100%',
  					transform: 'scaleY(0.2)'
  				},
  				'50%': {
  					height: '100%',
  					transform: 'scaleY(0.4)'
  				}
  			},
  			fadeUpOut: {
  				'0%': {
  					opacity: '0.4',
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(-1em)'
  				}
  			},
  			moveHorizontal: {
  				'0%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				},
  				'50%': {
  					transform: 'translateX(50%) translateY(10%)'
  				},
  				'100%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				}
  			},
  			moveInCircle: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(180deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			moveVertical: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'50%': {
  					transform: 'translateY(50%)'
  				},
  				'100%': {
  					transform: 'translateY(-50%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'orb-wave': 'orb-wave 0.4s ease-in-out infinite',
  			'orb-wave-slow': 'orb-wave-slow 2s ease-in-out infinite',
  			'voice-wave': 'voice-wave 1s ease-in-out infinite',
  			fadeUpOut: 'fadeUpOut 0.5s ease-out forwards',
  			first: 'moveVertical 30s ease infinite',
  			second: 'moveInCircle 20s reverse infinite',
  			third: 'moveInCircle 40s linear infinite',
  			fourth: 'moveHorizontal 40s ease infinite',
  			fifth: 'moveInCircle 20s ease infinite'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: 'none',
  					color: 'hsl(var(--foreground))',
  					h1: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '700',
  						fontSize: '2.25rem',
  						marginTop: '2rem',
  						marginBottom: '1.5rem',
  						fontFamily: 'var(--font-heading)'
  					},
  					h2: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '700',
  						fontSize: '1.875rem',
  						marginTop: '2rem',
  						marginBottom: '1rem',
  						fontFamily: 'var(--font-heading)'
  					},
  					h3: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '600',
  						fontSize: '1.5rem',
  						marginTop: '1.5rem',
  						marginBottom: '0.75rem',
  						fontFamily: 'var(--font-heading)'
  					},
  					p: {
  						color: 'hsl(var(--foreground))',
  						marginTop: '1.25rem',
  						marginBottom: '1.25rem',
  						fontFamily: 'var(--font-body)'
  					},
  					a: {
  						color: 'hsl(var(--primary))',
  						textDecoration: 'none',
  						fontWeight: '500',
  						'&:hover': {
  							color: 'hsl(var(--primary))'
  						}
  					},
  					strong: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '600'
  					},
  					ul: {
  						listStyleType: 'disc',
  						paddingLeft: '1.625rem'
  					},
  					ol: {
  						listStyleType: 'decimal',
  						paddingLeft: '1.625rem'
  					},
  					li: {
  						marginTop: '0.5rem',
  						marginBottom: '0.5rem'
  					},
  					blockquote: {
  						fontStyle: 'italic',
  						color: 'hsl(var(--muted-foreground))',
  						borderLeftWidth: '4px',
  						borderLeftColor: 'hsl(var(--primary))',
  						paddingLeft: '1rem',
  						marginTop: '1.5rem',
  						marginBottom: '1.5rem'
  					},
  					code: {
  						color: 'hsl(var(--foreground))',
  						backgroundColor: 'hsl(var(--muted))',
  						borderRadius: '0.25rem',
  						padding: '0.125rem 0.25rem',
  						fontFamily: 'ui-monospace, monospace'
  					},
  					'code::before': {
  						content: ''
  					},
  					'code::after': {
  						content: ''
  					},
  					pre: {
  						color: 'hsl(var(--foreground))',
  						backgroundColor: 'hsl(var(--muted))',
  						borderRadius: '0.375rem',
  						padding: '1rem',
  						marginTop: '1.5rem',
  						marginBottom: '1.5rem'
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), typography],
};

export default config;
