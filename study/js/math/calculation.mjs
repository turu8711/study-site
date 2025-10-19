//乱数生成
export function getRandomInt(min, max, not = false) {
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
export function formatWithPlus(n) {
    return (n > 0 ? '+' : '') + n;
}
export function format_Root(n, not = false) {
    if (not) return (n > 0 ? '' : '-');
    return (n > 0 ? '+' : '-');
}
//  絶対値に変換
export function format_Num(n) {
    return n < 0 ? -n : n;
}

//素数判定
export function isPrime(n) {
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

export function Simplify_route(n) {
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