import { JSDOM } from "jsdom"

function normalizeURL(url) {
    const URLObj = new URL(url)
    let URLPath = `${URLObj.host}${URLObj.pathname}`
    if (URLPath.slice(-1) === "/") {
        URLPath = URLPath.slice(0, -1)
    }
    return URLPath
}

function getURLsFromHTML(htmlString, baseURL) {
    const URLs = []
    const htmlObj = new JSDOM(htmlString)
    const anchors = htmlObj.window.document.querySelectorAll("a")

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let currentURL = anchor.getAttribute('href')
            try {
                currentURL = new URL(currentURL, baseURL).href
                URLs.push(currentURL)
            } catch(err) {
                console.log(`${err.message}: ${newURL}`)
            }
        }
    }
    return URLs
}

async function getHTML(url) {
    let response
    try {
        response = await fetch(url)
    } catch (err) {
        throw new Error(`Network Error: ${err.message}`)
    }
    if (response.status > 399) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("text/html")) {
        throw new Error(`Error: non-HTML response: ${contentType}`)
    }
    return response.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    // If this link leads to a different host, return the current page list
    if (baseURLObj.hostname != currentURLObj.hostname) {
        return pages
    }
    const normalizedURL = normalizeURL(currentURL)
    // If this link has been found before, increment the count
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL] ++
        return pages
    }
    // If this is a new link, add it to the page list
    pages[normalizedURL] = 1
    console.log(`Scanning ${currentURL} for links`)
    let htmlText = ""
    try {
        htmlText = await getHTML(currentURL)
    } catch (err) {
        console.log(`${err.message}`)
        return pages
    }
    // Recursively look for links within this page
    const nextURLs = getURLsFromHTML(htmlText, baseURL)
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }
    return pages
}



export { normalizeURL, getURLsFromHTML, crawlPage }