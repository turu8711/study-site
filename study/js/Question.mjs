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
let h

let n
let o
let p
let q
let r

export function Q1() {//1-1
    a = getRandomInt(0, 9)
    b = getRandomInt(0, 9)
    Answer = [a * b]
    console.log(`${a}*${b}=${Answer}`);
    Question = `${a} \\times ${b} = `;//  "\\times" = ×(かけ算)
    return { Question, Answer }
}

export function Q2() {//1-2
    a = getRandomInt(10, 99)
    b = getRandomInt(10, 99)
    Answer = [a * b]
    console.log(`${a}*${b}=${Answer}`);
    Question = `${a} \\times ${b} = `;
    return { Question, Answer }
}

export function Q3() {//1-3
    a = getRandomInt(100, 999)
    b = getRandomInt(100, 999)
    Answer = [a * b]
    console.log(`${a}*${b}=${Answer}`);
    Question = `${a} \\times ${b} = `;
    return { Question, Answer }
}

export function Q4() {//2-1
    a = getRandomInt(-9, 9)
    b = getRandomInt(-9, 9)
    c = a + b
    d = a * b
    Answer = [`(x${formatWithPlus(a)})`, `(x${formatWithPlus(b)})`]
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
    e = a * c
    f = a * d + b * c
    g = b * d
    console.log(a, b, c, d, e, f, g)
    if (a === 1) a = ''
    if (c === 1) c = ''
    if (e === 1) e = ''
    Answer = [`${e}x^2${formatWithPlus(f)}x${formatWithPlus(g)}`]
    console.log(Answer);//ac x^2+ ( ad + bc ) x+ bd
    Question = `(${a}x${formatWithPlus(b)})(${c}x${formatWithPlus(d)}) = `;
    return { Question, Answer }
}

export function Q6() {//3-1

    a = getRandomInt(0, 3)
    if (a === 0) {
        a = getRandomInt(2,13)
        b = 1
        Answer = a
    } else {
        a = getRandomInt(2,13)
        do {
            b = getRandomInt(2, 20);
        } while (!isPrime(b)); // 素数にする
        Answer = [`${a}√${b}`]; // 例: 2√3
    }
    c = a**2
    c = c * b
    Question = `\\sqrt{${c}} = `;
    console.log(`√${c} = ${Answer}`);
    return { Question, Answer };
}

export function Q7() {//3-2
    do {
        do {
            a = getRandomInt(4, 2000);
        } while (isPrime(a)); // 素数以外にする
        [b,c] = Simplify_route(a)
    } while (b === 1);  // 簡単にした時に外に整数を出せないとき
    if (c === 0) Answer = b // √を消せるとき
    else Answer = [`${b}√${c}`]; // 例: 2√3
    Question = `\\sqrt{${a}} = `;
    console.log(`√${a} = ${Answer}`);
    return { Question, Answer };
}



export function Q8() {//3-3
    do {
        a = getRandomInt(-9, 9, true)
        do {
            b = getRandomInt(2, 11)
        } while (!isPrime(b)); // 素数にする
        c = getRandomInt(-9, 9, true)
        do {
            d = getRandomInt(2, 11)
        } while (!isPrime(d)); // 素数にする
        e = getRandomInt(-9, 9, true)
    } while (a === e || b === d)

    if (a+e===0) Answer = [`${c}√${d}`]
    else Answer = [`${a + e}√${b}`, `${c}√${d}`]

    f = [format_Root(a), format_Root(c), format_Root(e)]
    a = [format_Num(a ** 2 * b), format_Num(c ** 2 * d), format_Num(e ** 2 * b)]

    b = getRandomInt(0, 2)
    
    if (b === 2 ) c = 1
    else c = 0
    if (f[c] === '+') f[c] = '';
    
    if (b === 0) b = [0, 2, 1] // aab
    if (b === 1) b = [0, 1, 2] // aba
    if (b === 2) b = [1, 0, 2] // baa
    c = ''
    Question = ''
    for (let i = 0; i < b.length; i++) {
        Question = Question + `${f[b[i]]}` + `\\sqrt{${a[b[i]]}}`
        c = c + `${f[b[i]]}√${a[b[i]]}`
    }
    Question = Question+ ` = `;
    c = c + `=${Answer}`

    console.log(c);
    return { Question, Answer }
}

export function Q9() {//3-4
    a = getRandomInt(0, 9)
    b = getRandomInt(0, 9)
    Answer = [a * b]
    console.log(`${a}*${b}=${Answer}`);
    Question = `${a} \\times ${b} = `;
    return { Question, Answer }
}


//----------------------------------------------------

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
function format_Root(n, not = false) {
    if (not) return (n > 0 ? '' : '-');
    return (n > 0 ? '+' : '-');
}
//  絶対値に変換
function format_Num(n) {
    return n < 0 ? -n : n;
}

//素数判定
function isPrime(n) {
    if (n <= 1) return false;   // 1以下は素数ではない
    if (n === 2) return true;   // 2は素数
    if (n % 2 === 0) return false; // 偶数は2以外素数でない

    // 3 以上の奇数を確認
    const sqrtN = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= sqrtN; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

function Simplify_route(n) {
    let o = n
    let p = []
    let i = 2

    //素因数分解
    while (!(isPrime(n) || o <= i)) {
        if (n % i === 0) {
            n = n / i
            p.push(i)
        } else {
            i++;
        }
    }
    p.push(n)

    let q = 1
    let r = 1

    //√の外に出す
    for (i = 0; i < p.length; i++) {
        while (!(q >= p.length || p.length < 2)) {
            if (p[i] === p[q]) {
                r = r * p[i]
                p.splice(i, 1)
                p.splice(q - 1, 1)
            } else q++;
        }
        q = i + 2
    }
    //√の中をかける
    while (p.length > 1) {
        p[0] = p[0] * p[1];
        p.splice(1, 1)
    }
if (p[0] === undefined) p = 0;
else p = p[0];
return [r, p]
}