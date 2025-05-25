import { defineConfig } from "@pandacss/dev";
import { alertRecipe } from "./iview/components/alert/alert.recipe";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./iview/**/*.{js,jsx,ts,tsx,vue}"],
  exclude: [],
  strictTokens: true,
  strictPropertyValues: true,
  // Generate all recipe variants in the CSS, including those based on props
  staticCss: {
    recipes: {
      alert: ['*']
    }
  },
  theme: {
    slotRecipes: {
      alert: alertRecipe,
    },
    tokens: {
      colors: {
        transparent: { value: 'transparent' },
        alert: {
          success: {
            border: { value: 'rgb(183, 235, 143)' },
            bg: { value: 'rgb(246, 255, 237)' },
            icon: { value: 'rgb(82, 196, 26)' }
          },
          info: {
            border: { value: '#abdcff' },
            bg: { value: '#f0faff' },
            icon: { value: 'rgb(24, 144, 255)' }
          },
          warning: {
            border: { value: 'rgb(255, 214, 102)' },
            bg: { value: 'rgb(255, 251, 230)' },
            icon: { value: 'rgb(250, 173, 20)' }
          },
          error: {
            border: { value: 'rgb(255, 163, 158)' },
            bg: { value: 'rgb(255, 241, 240)' },
            icon: { value: 'rgb(245, 34, 45)' }
          },
          text: {
            default: { value: 'rgba(0, 0, 0, 0.65)' },
            dark: { value: 'rgba(0, 0, 0, 0.85)' },
            light: { value: 'rgba(0, 0, 0, 0.45)' },
            hover: { value: 'rgba(0, 0, 0, 0.75)' }
          }
        }
      },
      durations: {
        '0': { value: '0s' },
        'fastest': { value: '50ms' },
        'faster': { value: '100ms' },
        'fast': { value: '150ms' },
        'default': { value: '200ms' },
        'slow': { value: '300ms' },
        'slower': { value: '500ms' },
        'slowest': { value: '1s' }
      },
      easings: {
        'linear': { value: 'linear' },
        'ease-in': { value: 'ease-in' },
        'ease-out': { value: 'ease-out' },
        'ease-in-out': { value: 'ease-in-out' },
        alert: {
          default: { value: 'ease-in-out' },
          close: { value: 'ease-in-out' },
        }
      },
      spacing: {
        'none': { value: '0' },
        'xs': { value: '4px' },
        'sm': { value: '8px' },
        '-sm': { value: '-8px' },
        'md': { value: '12px' },
        'lg': { value: '16px' },
        'xl': { value: '24px' },
        '-xl': { value: '-24px' },
        'xxl': { value: '32px' },
        'xxxl': { value: '48px' },
        '50p': { value: '50%' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '4px' }
      },
      borderWidths: {
        none: { value: '0' },
        thin: { value: '1px' },
        thick: { value: '2px' },
        thicker: { value: '4px' }
      },
      borders: {
        none: { value: 'none' },
        thin: { value: '1px solid' },
        thick: { value: '2px solid' },
        thicker: { value: '4px solid' },
        default: { value: '1px solid' }
      },
      fontSizes: {
        xs: { value: '12px' },
        sm: { value: '14px' },
        md: { value: '16px' },
        lg: { value: '28px' }
      },
      lineHeights: {
        xs: { value: '16px' },
        sm: { value: '21px' },
        md: { value: '22px' },
        lg: { value: '1.5' }
      }
    }
  },
  outdir: "styled",
});
