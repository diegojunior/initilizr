var plugins = [{
      plugin: require('/home/diego/developer/source-projects/start.spring.io-master/start-client/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/diego/developer/source-projects/start.spring.io-master/start-client/node_modules/gatsby-plugin-prefetch-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":[{"family":"Karla","variants":["400","700"]}]},
    },{
      plugin: require('/home/diego/developer/source-projects/start.spring.io-master/start-client/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"initializr","short_name":"start","start_url":"/","background_color":"#6db33f","theme_color":"#6db33f","display":"minimal-ui","icon":"src/images/initializr-icon.png"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
