module.exports = {
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'Recipes',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    components: {
      title: 'Recipes',
      needsAuth: true,
    },
    i18n: {
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
