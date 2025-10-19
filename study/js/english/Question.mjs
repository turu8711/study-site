//グローバル関数
let Question
let Answer
let data
let a
let type

//json読み込み
fetch('js/english/word.csv')
    .then(response => response.text())
    .then(text => {
        // 改行で行ごとに分割
        const rows = text.trim().split(/\r?\n/);

        // 各行をカンマで分割して2次元配列に
        data = rows.map(row => row.split(',').map(cell => cell.trim()));
        console.log(data);
    })
    .catch(error => console.error(error));
//-------------------------------------------------------------------

export function E1() {//1-1
    a = getRandomInt(0, 19)
    return make_question();
}

export function E2() {//1-2
    a = getRandomInt(20, 39)
    return make_question();
}

export function E3() {//1-3
    a = getRandomInt(40, 59)
    return make_question();
}

export function E4() {//1-4
    a = getRandomInt(60, 79)
    return make_question();
}

export function E5() {//1-5
    a = getRandomInt(80, 99)
    return make_question();
}

export function E6() {//1-6
    a = getRandomInt(100, 119)
    return make_question();
}

export function E7() {//1-7
    a = getRandomInt(120, 139)
    return make_question();
}

export function E8() {//1-1
    a = getRandomInt(140, 172)
    return make_question();
}

export function E9() {//1-1
    type = true
    a = getRandomInt(0, 19)
    return make_question();
}

export function E10() {//1-2
    type = true
    a = getRandomInt(20, 39)
    return make_question();
}

export function E11() {//1-3
    type = true
    a = getRandomInt(40, 59)
    return make_question();
}

export function E12() {//1-4
    type = true
    a = getRandomInt(60, 79)
    return make_question();
}

export function E13() {//1-5
    type = true
    a = getRandomInt(80, 99)
    return make_question();
}

export function E14() {//1-6
    type = true
    a = getRandomInt(100, 119)
    return make_question();
}

export function E15() {//1-7
    type = true
    a = getRandomInt(120, 139)
    return make_question();
}

export function E16() {//1-7
    type = true
    a = getRandomInt(140, 172)
    return make_question();
}

export function E17() {//1-8
    type = true
    a = getRandomInt(174, 189)
    return make_question();
}

export function E18() {//1-8
    type = true
    a = getRandomInt(190, 190)
    return make_question();
}
//--------------------------------------------------------------------
function make_question() {
    Question = data[a][0]
    Answer = data[a].slice(1);
    if (type) {
        Answer = [Question]
        Question = data[a][1]
    }
    console.log(Question,Answer);
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