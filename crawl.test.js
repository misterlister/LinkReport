import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "./crawl.js"

// normalizeURL tests

test("normalizeURL base test", () => {
    const input = "https://example.com/path"
    const output = normalizeURL(input)
    const expected = "example.com/path"
    expect(output).toEqual(expected)
})

test("normalizeURL subdomain test", () => {
    const input = "https://subdomain.example.com/path"
    const output = normalizeURL(input)
    const expected = "subdomain.example.com/path"
    expect(output).toEqual(expected)
})

test("normalizeURL trailing slash test", () => {
    const input = "https://example.com/path/"
    const output = normalizeURL(input)
    const expected = "example.com/path"
    expect(output).toEqual(expected)
})

test("normalizeURL capital test", () => {
    const input = "https://EXAMPLE.com/path"
    const output = normalizeURL(input)
    const expected = "example.com/path"
    expect(output).toEqual(expected)
})

test("normalizeURL http test", () => {
    const input = "http://example.com/path"
    const output = normalizeURL(input)
    const expected = "example.com/path"
    expect(output).toEqual(expected)
})

test("normalizeURL fragment test", () => {
    const input = "https://example.com/path#main"
    const output = normalizeURL(input)
    const expected = "example.com/path"
    expect(output).toEqual(expected)
})

test("normalizeURL query test", () => {
    const input = "https://example.com/path?query=this"
    const output = normalizeURL(input)
    const expected = "example.com/path"
    expect(output).toEqual(expected)
})

// getURLsFromHTML tests

test("getURLsFromHTML absolute path test", () => {
    const input = "<html><body><div><a href='https://blog.example.com'>Absolute link</a> </div></html></body>"
    const baseUrl = "https://example.com"
    const output = getURLsFromHTML(input, baseUrl)
    const expected = ["https://blog.example.com/"]
    console.log(output)
    console.log(expected)
    expect(output).toEqual(expected)
})

test("getURLsFromHTML relative path test", () => {
    const input = "<html><body><div><a href='/newpath'>Relative link</a></div></html></body>"
    const baseUrl = "https://example.com"
    const output = getURLsFromHTML(input, baseUrl)
    const expected = ["https://example.com/newpath"]
    console.log(output)
    console.log(expected)
    expect(output).toEqual(expected)
})

test("getURLsFromHTML absolute and relative path test", () => {
    const input = "<html><body><div><a href='/newpath/anotherpath'>Relative Link</a><a href='https://other.com/path'>Absolute Link</a></div></html></body>"
    const baseUrl = "https://example.com"
    const output = getURLsFromHTML(input, baseUrl)
    const expected = ["https://example.com/newpath/anotherpath", "https://other.com/path"]
    console.log(output)
    console.log(expected)
    expect(output).toEqual(expected)
})

test("getURLsFromHTML empty URL test", () => {
    const input = "<html><body><div><a href=''>Empty Link</a></div></html></body>"
    const baseUrl = "https://example.com"
    const output = getURLsFromHTML(input, baseUrl)
    const expected = ["https://example.com/"]
    console.log(output)
    console.log(expected)
    expect(output).toEqual(expected)
})