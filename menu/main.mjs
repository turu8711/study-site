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
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const params = new URLSearchParams(window.location.search);

  // URLからチェック状態を復元
  checkboxes.forEach((checkbox) => {
    const value = params.get(checkbox.id);
    checkbox.checked = value === 'true';
  });

  // 初期状態に基づいてリンクを更新
  const link = document.getElementById('nextPageLink');
  if (link) {
    link.href = `../study/math.html?${params.toString()}`;
  }

  // チェック変更時にURLとリンクを更新
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const newParams = new URLSearchParams();
      checkboxes.forEach(cb => {
        newParams.set(cb.id, cb.checked);
      });

      const newUrl = `${location.pathname}?${newParams.toString()}`;
      history.replaceState(null, '', newUrl);

      // リンク更新
      if (link) {
        link.href = `../study/math.html?${newParams.toString()}`;
      }
    });
  });
});
