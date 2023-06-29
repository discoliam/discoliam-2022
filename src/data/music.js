require('dotenv').config()

const path = require('path')
const axios = require('axios')
const { AssetCache } = require('@11ty/eleventy-fetch')

let bigData = []
let asset = new AssetCache('music')

async function requestReleases(pageKey = 1) {
  let url = `https://api.discogs.com/users/discoliam/collection/folders/0/releases?token=${process.env.DISCOG_TOKEN}&page=${pageKey}&per_page=100&sort=artist`

  try {
    const response = await axios.get(url)

    // let next = response.data.pagination.urls.next
    let totalPages = response.data.pagination.pages
    bigData.push(...response.data.releases)

    if (pageKey < totalPages) {
      pageKey++
      await new Promise((resolve) => setTimeout(resolve, 200)) // setup a sleep depend your api request/second requirement.
      return await requestReleases(pageKey)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = async function () {
  // If saved in cache, return that instead of fetching all the data
  if (asset.isCacheValid('8h')) {
    console.log('Cached Version')
    return asset.getCachedValue()
  }

  return await requestReleases().then(() => {
    console.log('API Version')
    asset.save(bigData, 'json')
    return bigData
  })
}
