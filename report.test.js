import { test, expect } from "@jest/globals"
import { sortPages } from "./report"

test("sortPages backwards order test", () => {
    const input = { "One": 1,
                    "Two": 2,
                    "Five": 5
                    }
    const output = sortPages(input)
    const expected = [["Five", 5], ["Two", 2], ["One", 1]]
    expect(output).toEqual(expected)
})

test("sortPages mixed order test", () => {
    const input = { "One": 1,
                    "Three": 3,
                    "Two": 2,
                    "Six": 6,
                    "Five": 5,
                    "Four": 4
                    }
    const output = sortPages(input)
    const expected = [["Six", 6], ["Five", 5], ["Four", 4], ["Three", 3], ["Two", 2], ["One", 1]]
    expect(output).toEqual(expected)
})

test("sortPages duplicate value test", () => {
    const input = { "FirstOne": 1,
                    "SecondOne": 1,
                    "FirstThree": 3,
                    "Two": 2,
                    "SecondThree": 3,
                    }
    const output = sortPages(input)
    const expected = [["FirstThree", 3], ["SecondThree", 3], ["Two", 2], ["FirstOne", 1], ["SecondOne", 1]]
    expect(output).toEqual(expected)
})