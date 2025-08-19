import { Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9} from './Question.mjs';
let Question_count = 0  //問題数のカウント
let button_lock = false

// 他のファイルに関数をexport
export function startQuestion() {

    const countdownElement = document.getElementById('countdown'); // ここで取得　　countdownElement を使う処理

    //urlパラメータの内容を取得　例：Check1=true&Check2=false
    const params = new URLSearchParams(window.location.search);

    //最初の問題生成
    lottery();

    function lottery() {
        // 問題数のカウント
        Question_count++;
        document.getElementById("score").textContent = `問題数: ${Question_count}`;


        // 問題の抽選
        // 関数を配列に入れる
        const functionMap = { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9 };
        const functions = [];

        const keys = Object.keys(functionMap);//functionMapの要素数だけ繰り返す
        for (let i = 1; i <= keys.length; i++) {
            const key = `Check${i}`;
            const value = params.get(key) === 'true';

            if (value) {
                console.log(`${key} は true です`);
                functions.push(functionMap[`Q${i}`]);
            }
        }


        // ランダムに選んで実行
        const randomIndex = Math.floor(Math.random() * functions.length);
        let {Question, Answer}= functions[randomIndex]();  // 選ばれた関数を実行

        answer_check(Question,Answer)
    }
    
    function answer_check(Question,Answer) {
       // 一旦空にする
       countdownElement.innerHTML = "";

        // 数式表示（LaTeX対応ならMathJaxでレンダリング）
        const questionSpan = document.createElement("span");
        questionSpan.innerHTML = `$${Question}$`;  // ← LaTeX数式
        countdownElement.appendChild(questionSpan);

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
        if (window.MathJax) {
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

        button_system(Answer, checkBtn, input, resultDiv)
    }
    

    // ボタン押下時の処理
    function button_system(Answer, checkBtn, input, resultDiv) {
        checkBtn.addEventListener('click', () => {
            //const userAnswer = input.value;
            if (button_lock === true) return;
            button_lock = true

            // 入力値をスペース区切りで分割
            const userAnswer = input.value.trim().split(/\s+/); // 空白で分割

            // ソートして比較（順不同対策）
            const isCorrect =
            userAnswer.length === Answer.length &&
            userAnswer.sort().join() === Answer.slice().sort().join();

            if (isCorrect) {
                resultDiv.textContent = '正解！';
                resultDiv.style.color = 'green';
                console.log("◯")
            } else {
                resultDiv.textContent = `答え ${Answer.join(' ')}`;
                resultDiv.style.color = 'red';
                console.log("✕")
                console.log(`you:${userAnswer}`)
                console.log(`Answer:${Answer}`)
            }
            setTimeout(() => {
                resultDiv.textContent = '';
                lottery()
            }, 1500); // 1000ミリ秒 = 1秒遅延
        });
    }
}