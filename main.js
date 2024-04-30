import { crawlPage } from "./crawl.js"

async function main() {
    if (process.argv.length < 3) {
        console.log("Error: No website provided")
        return
    }
    if (process.argv.length > 3) {
        console.log("Error: Too many arguments")
        return
    }
    const baseURL = process.argv[2]
    console.log(`Beginning scan of: ${baseURL}...`)
    const pages = await crawlPage(baseURL)
    console.log(pages)
}

main()