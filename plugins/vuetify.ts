// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
      background: '#121212',
      surface: '#121212',
      primary: '#007acc',
      'primary-darken-1': '#00ACC1',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  }

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
        defaultTheme: 'darkTheme',
        themes: {
          darkTheme,
        },
      },
  })
  app.vueApp.use(vuetify)
})
