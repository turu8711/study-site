//グローバル関数
let Question
let Answer
let a
let b
let c
let d
let e
let f
let g

export function Q1() {//1-1
    a = getRandomInt(0, 9)
    b = getRandomInt(0, 9)
    Answer = [a*b]
    console.log(`${a}*${b}=${Answer}`);
    Question = `${a} × ${b} = `;
    return { Question, Answer }
}

export function Q2() {//1-2
    a = getRandomInt(10, 99)
    b = getRandomInt(10, 99)
    Answer = [a*b]
    console.log(`${a}*${b}=${Answer}`);  
    Question = `${a} × ${b} = `;
    return { Question, Answer }
}

export function Q3() {//1-3
    a = getRandomInt(100, 999)
    b = getRandomInt(100, 999)
    Answer = [a*b]
    console.log(`${a}*${b}=${Answer}`);  
    Question = `${a} × ${b} = `;
    return { Question, Answer }
}

export function Q4() {//2-1
    a = getRandomInt(-9, 9)
    b = getRandomInt(-9, 9)
    c = a+b
    d = a*b
    Answer = [`(x${formatWithPlus(a)})`,`(x${formatWithPlus(b)})`]
    if (a === b) Answer = [`(x${formatWithPlus(a)})^2`]
    console.log(Answer);  
    Question = `x^2 ${formatWithPlus(c)}x ${formatWithPlus(d)} = `;
    return { Question, Answer }
}

export function Q5() {//2-2
    a = getRandomInt(0, 1)
    if (a === 1) {
        a = getRandomInt(0, 1)
        c = getRandomInt(0, 1)

        a = (a === 1) ? getRandomInt(-9, 9, true) : 1;
        c = (c === 1) ? getRandomInt(-9, 9, true) : 1;
    } else {
        a = 1
        c = 1
    }
 


    b = getRandomInt(-9, 9, true)
    d = getRandomInt(-9, 9, true)
    e = a*c
    f = a*d+b*c
    g = b*d
    console.log(a,b,c,d,e,f,g)
    if (a === 1) a = ''
    if (c === 1) c = ''
    if (e === 1) e = ''
    Answer = [`${e}x^2${formatWithPlus(f)}x${formatWithPlus(g)}`]
    console.log(Answer);//ac x^2+ ( ad + bc ) x+ bd
    Question = `(${a}x${formatWithPlus(b)})(${c}x${formatWithPlus(d)}) = `;
    return { Question, Answer }
}

//乱数生成
function getRandomInt(min, max, not = false) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (not) {
        const candidates = [];
        for (let i = min; i <= max; i++) {
            if (i !== 0) {
                candidates.push(i);
            }
        }

        if (candidates.length === 0) {
            throw new Error("0を除外すると選択肢がありません");
        }

        const randomIndex = Math.floor(Math.random() * candidates.length);
        return candidates[randomIndex];
    }

    // 通常の乱数（0含む）
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//正の数なら+を付ける
function formatWithPlus(n) {
    return (n > 0 ? '+' : '') + n;
}