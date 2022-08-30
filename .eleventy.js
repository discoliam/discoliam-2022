const Image = require('@11ty/eleventy-img')

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [null],
    formats: ['webp', 'jpeg', 'svg'],
    outputDir: 'dist/assets/images',
    urlPath: '/assets/images',
    svgShortCircuit: true,
  })

  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = (config) => {
  config.addNunjucksAsyncShortcode('image', imageShortcode)
  config.addJavaScriptFunction('image', imageShortcode)
  config.addNunjucksShortcode('year', () => `${new Date().getFullYear()}`)
  config.addPassthroughCopy({
    'src/assets/icons/favicon': '/assets/icons/favicon',
  })

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      data: 'data',
      output: 'dist',
    },
  }
}
