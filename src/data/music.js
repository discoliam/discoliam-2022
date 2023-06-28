require('dotenv').config()

const path = require('path')
const axios = require('axios')
const flatCache = require('flat-cache')

const CACHE_KEY = 'releases'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'releases.json'

let bigData = []

async function requestReleases(pageKey = 1) {
  let url = `https://api.discogs.com/users/discoliam/collection/folders/0/releases?token=${process.env.DISCOG_TOKEN}&page=${pageKey}&per_page=100&sort=artist`

  try {
    const response = await axios.get(url)

    // let next = response.data.pagination.urls.next
    let totalPages = response.data.pagination.pages
    let totalItems = response.data.pagination.items
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
  // load cache
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  // if we have a cache, return cached data
  if (cachedItems) {
    return cachedItems
  }

  return await requestReleases().then(() => {
    cache.setKey(CACHE_KEY, bigData)
    cache.save()
    return bigData
  })
}
