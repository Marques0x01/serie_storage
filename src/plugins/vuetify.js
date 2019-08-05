import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3,
    secondary: colors.grey.lighten1,
    error: colors.red.accent3,
    white: colors.shades.white
  }
})
