import { test, expect } from "@jest/globals"
import { normalizeURL } from "./crawl.js"

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