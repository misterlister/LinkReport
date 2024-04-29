import { JSDOM } from "jsdom"

function normalizeURL(url) {
    const urlObj = new URL(url)
    let urlPath = `${urlObj.host}${urlObj.pathname}`
    if (urlPath.slice(-1) === "/") {
        urlPath = urlPath.slice(0, -1)
    }
    return urlPath
}

function getURLsFromHTML(htmlString, baseURL) {
    const linkUrls = []
    const htmlObj = new JSDOM(htmlString)
    htmlObj.window.document.querySelectorAll("a").forEach(link => {
        let newUrl = link.href
        try {
            if (newUrl[0] === "/") {
                newUrl = baseURL + newUrl
            }
            linkUrls.push(newUrl)
        } catch(err) {
            console.log(`${err.message}: ${newUrl}`)
        }
        
    })
    return linkUrls
}

export { normalizeURL, getURLsFromHTML }