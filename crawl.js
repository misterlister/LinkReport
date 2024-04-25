
function normalizeURL(url) {
    const urlObj = new URL(url)
    let urlPath = `${urlObj.host}${urlObj.pathname}`
    if (urlPath.slice(-1) === "/") {
        urlPath = urlPath.slice(0, -1)
    }
    return urlPath
}

export { normalizeURL }