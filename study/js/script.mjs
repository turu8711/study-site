// other.mjsから関数をimport
import { startQuestion } from './other.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const countdownElement = document.getElementById('countdown');
  const startButton = document.getElementById('start-button');

  startButton.addEventListener('click', () => {
    let count = 3;
    countdownElement.textContent = count;
    countdownElement.style.display = 'block';
    startButton.style.display = 'none';

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        countdownElement.textContent = count;
      } else {
        clearInterval(timer);
        countdownElement.textContent = '問題が生成されませんでした';

        // importした関数を呼び出す
        startQuestion();
      }
    }, 1000);
  });
});
