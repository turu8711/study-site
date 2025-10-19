import { getRandomInt } from "./calculation.mjs";
let Answer
let Question
let a
let b
let b_sub
let c
let d

b = 
    [
        ["(ax+b)(cx+d)", "acx^2+(ad+bc)x+bd"],
        ["(x+p)(x+q)", "x^2+(p+q)x+pq"],
        ["(x±p)^2", "x^2±px+p^2"],
        ["(x+p)(x-p)", "x^2-p^2"],
        ["(a+b+c)^2", "a^2+b^2+c^2+2ab+2ac+2bc"]
    ]

export function Q10() {//1-1
    a = getRandomInt(0, 4)
    c = getRandomInt(0, 1)
    if (c === 0) d = 1
    else d = 0

    Answer = [b[a][d]]
    console.log(`${b[a][c]}=${Answer}`);
    Question = `${b[a][c]}= `;//  "\\times" = ×(かけ算)
    return { Question, Answer }
}

export function Q11() {//1-1
    a = getRandomInt(5, 10)
    c = getRandomInt(0, 1)
    if (c === 0) d = 1
    else d = 0

    Answer = [b[a][d]]
    console.log(`${b[a][c]}=${Answer}`);
    Question = `${b[a][c]}= `;//  "\\times" = ×(かけ算)
    return { Question, Answer }
}