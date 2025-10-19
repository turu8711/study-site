import { E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18 } from './english/Question.mjs';
import { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9 } from './math/Question.mjs';
import { Q10 } from './math/Question1.mjs';
let Question_count = 0  //問題数のカウント
let correct_answer = 0
let correct_percent = 0
let button_lock = false

let timer;          // setInterval用
let elapsed = 0;    // 経過時間（秒）
const display = document.getElementById("time");
const startBtn = document.getElementById("start");

// 他のファイルに関数をexport
export function startQuestion() {

    const countdownElement = document.getElementById('countdown'); // ここで取得　　countdownElement を使う処理

    //urlパラメータの内容を取得　例：Check1=true&Check2=false
    const params = new URLSearchParams(window.location.search);

    // Subjectの値を取得
    const subject = params.get("Subject");// "math" や "english" など

    //最初の問題生成
    lottery();

    function lottery() {
        // 問題数のカウント
        console.log(Question_count)
        console.log(correct_answer, Question_count)
        Question_count++;

        document.getElementById("score").textContent = `問題数: ${Question_count}`;

        //英語

        //数学

        // 問題の抽選
        // 関数を配列に入れる
        let functionMap;
        const subject_Q = params.get("Subject") === "math" ? "Q" : "E"; // 例: mathなら Q1,Q2…、englishなら E_1,E_2…

        if (subject === "math") {
            functionMap = { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10 };
        } else if (subject === "english") {
            functionMap = { E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18 };
        } else {
            console.error("未知の subject:", subject);
            return; // 処理を中断
        }
        const functions = [];

        const keys = Object.keys(functionMap);//functionMapの要素数だけ繰り返す
        for (let i = 1; i <= keys.length; i++) {
            const key = `Check${i}`;
            const value = params.get(key) === 'true';

            if (value) {
                console.log(`${key} は true です`);
                functions.push(functionMap[subject_Q + i]);
            }
        }
        // ランダムに選んで実行
        const randomIndex = Math.floor(Math.random() * functions.length);
        let { Question, Answer } = functions[randomIndex]();  // 選ばれた関数を実行
        answer_check(Question, Answer)
    }

    function answer_check(Question, Answer) {
        // 一旦空にする
        countdownElement.innerHTML = "";

        if (subject === "math") {
            // 数式表示（LaTeX対応ならMathJaxでレンダリング）
            const questionSpan = document.createElement("span");
            questionSpan.innerHTML = `$${Question}$`;  // ← LaTeX数式
            countdownElement.appendChild(questionSpan);
        } else {
            const questionSpan = document.createElement("span");
            questionSpan.textContent = Question; // 文字列としてそのまま表示
            countdownElement.appendChild(questionSpan);
        }

        // 入力欄
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'answer';
        input.placeholder = '答え';
        input.style.marginLeft = "8px"; // 左に少し余白
        countdownElement.appendChild(input);

        // 答え合わせボタン
        const checkBtn = document.createElement('button');
        checkBtn.textContent = '答え合わせ';
        checkBtn.style.marginLeft = "8px"; // これも余白
        countdownElement.appendChild(checkBtn);

        // MathJaxで数式レンダリング
        if (subject === "math" && window.MathJax) {
            MathJax.typesetPromise([countdownElement]);
        }


        button_lock = false;

        // 結果表示用の要素を作る（なければ）
        let resultDiv = document.getElementById('result');
        if (!resultDiv) {
            resultDiv = document.createElement('div');
            resultDiv.id = 'result';
            countdownElement.parentNode.insertBefore(resultDiv, countdownElement.nextSibling);
        }

        timerstart()
        button_system(Answer, checkBtn, input, resultDiv)
    }


    // ボタン押下時の処理
    function button_system(Answer, checkBtn, input, resultDiv) {
        checkBtn.addEventListener('click', () => {
            //const userAnswer = input.value;
            if (button_lock === true) return;
            button_lock = true

            let userAnswer;
            let isCorrect;

            if (subject === "math") {
                // 入力値をスペース区切りで分割
                userAnswer = input.value.trim().split(/\s+/); // 空白で分割

                // ソートして比較（順不同対策）
                isCorrect =
                    userAnswer.length === Answer.length &&
                    userAnswer.sort().join() === Answer.slice().sort().join();
            } else if (subject === "english") {
                userAnswer = input.value.trim().toLowerCase(); // 前後の空白を削除

                // 配列のどれかと一致するかチェック
                isCorrect = Answer.some(ans => ans.toLowerCase() === userAnswer);

            }

            if (isCorrect) {
                resultDiv.textContent = '正解！';
                resultDiv.style.color = 'green';
                console.log("◯")
                correct_answer++;//計算用
            } else {
                resultDiv.textContent = `答え ${Answer.join(' ')}`;
                resultDiv.style.color = 'red';
                console.log("✕")
                console.log(`you:${userAnswer}`)
                console.log(`Answer:${Answer}`)
            }

            //正答率計算
            correct_percent = (correct_answer / Question_count * 100).toFixed(1)

            // 小数点が ".0" の場合は整数だけ表示
            if (correct_percent.endsWith(".0")) correct_percent = parseInt(correct_percent); // 文字列→整数に変換

            document.getElementById("score1").textContent = `正答率: ${correct_percent}%`;

            setTimeout(() => {
                resultDiv.textContent = '';
                lottery()
            }, 1500); // 1000ミリ秒 = 1秒遅延
        });
    }
}

// 時間を hh:mm:ss に変換
function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

// 表示更新
function updateDisplay() {
    display.textContent = formatTime(elapsed);
}

function timerstart() {
    if (!timer) {
        timer = setInterval(() => {
            elapsed++;
            updateDisplay();
        }, 1000);
    }
}
// スタート
startBtn.addEventListener("click", () => {
    if (!timer) {
        timerstart()
    } else {
        clearInterval(timer); timer = null;
    }
});

// 初期表示
updateDisplay();