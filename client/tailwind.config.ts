import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        brand: {
          navy: "#1E3A5F",
          deep: "#0B1020",
          midnight: "#16223A",
          gold: "#F5C518",
          mutedGold: "#8A6B00",
          ink: "#0B1020",
          cream: "#FAFAF7",
          line: "#D8DDE6",
          mist: "#EEF1F4",
          surface: "#FFFFFF",
          text: "#0B1020",
          mutedText: "#64748B"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        "brand-soft": "0 18px 50px rgba(11, 16, 32, 0.08)",
        "brand-lift": "0 24px 70px rgba(11, 16, 32, 0.14)",
        "gold-line": "0 0 0 1px rgba(245, 197, 24, 0.34)",
        "gold-glow": "0 16px 42px rgba(245, 197, 24, 0.20)",
        "navy-glow": "0 24px 80px rgba(30, 58, 95, 0.16)"
      }
    }
  },
  plugins: [animate]
};

export default config;
