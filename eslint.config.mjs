// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Templates keep short elements and their attributes on one line.
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
})
