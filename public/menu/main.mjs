document.addEventListener("DOMContentLoaded", function () {
  // トグル機能
  const toggles = document.querySelectorAll(".toggle-title");
  toggles.forEach(title => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      content.classList.toggle("open");

      if (content.classList.contains('open')) {
        title.textContent = title.textContent.replace('▼', '▲')
      } else {
        title.textContent = title.textContent.replace('▲', '▼')
      }
    });
  });
});

// URL反映機能
window.addEventListener('pageshow', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');//チェックボックス取得
  const params = new URLSearchParams(window.location.search);

  // Subjectが無ければ必ず追加
  if (!params.has("Subject")) {
    params.set("Subject", subject());
    history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
  }

  // URLからチェック状態を復元
  checkboxes.forEach((checkbox) => {//パラメータからボックスを復元
    const value = params.get(checkbox.id);
    checkbox.checked = value === 'true';
  });

  // 初期状態に基づいてリンクを更新
  const link = document.getElementById('nextPageLink');
  if (link) {
    link.href = `../study/Question.html?${params.toString()}`;
  }

  // チェック変更時にURLとリンクを更新
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const newParams = new URLSearchParams();

      // ここで必ず Subject=math を入れる
      newParams.set("Subject", subject());

      checkboxes.forEach(cb => {
        newParams.set(cb.id, cb.checked);
      });

      const newUrl = `${location.pathname}?${newParams.toString()}`;
      history.replaceState(null, '', newUrl);
      // 初期状態に基づいてリンクを更新
      if (link) {
        link.href = `../study/Question.html?${params.toString()}`;
      }
    });
  });
});

//教科の判定
function subject() {
  let subject_name
  const path = window.location.pathname;//パスの取得
  if (path.endsWith("math.html")) subject_name = "math";
  else if (path.endsWith("english.html")) subject_name = "english";
  console.log(subject_name)
  return (subject_name)
}