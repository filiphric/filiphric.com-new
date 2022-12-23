module.exports = {
  root: true,
  plugins: ['tailwindcss'],
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off'
  }
}
