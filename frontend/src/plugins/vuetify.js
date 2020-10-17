import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken2, // #424242
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.pink.accent2, // #FF4081
        text: colors.grey.darken2,
        text2: colors.white         // #3F51B5
      },
    },
  },
});
