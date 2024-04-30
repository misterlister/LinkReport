# LinkReport

A program that generates a report of internal links within all pages of a website

## How to use

On the command line, simply enter the command

```
npm run start WEBSITE_URL
```

(replacing "WEBSITE_URL" with the URL for the website you want to obtain a report from)

The program will crawl through the HTML for the website, visiting all internal links,
and keeping track of how many times each one is linked to. Once this is done, you will
be shown a full report of all internal links and their count.