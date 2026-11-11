/* ポートフォリオの画像をクリックすると拡大表示する（全ページ共通） */
(function () {
  var SELECTOR = ".portfolio-card .card-image img";

  // 拡大表示用の枠をつくる
  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "画像の拡大表示");
  overlay.hidden = true;

  var bigImg = document.createElement("img");
  bigImg.className = "lightbox-img";

  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "閉じる");
  closeBtn.textContent = "×";

  overlay.appendChild(bigImg);
  overlay.appendChild(closeBtn);

  var lastFocus = null;

  function openBox(src, alt) {
    lastFocus = document.activeElement;
    bigImg.src = src;
    bigImg.alt = alt || "";
    overlay.hidden = false;
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function closeBox() {
    overlay.hidden = true;
    bigImg.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
    if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }

  function init() {
    document.body.appendChild(overlay);

    // 画像があるものだけ、キーボードでも開けるようにする
    var imgs = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute("src");
      if (src) {
        imgs[i].setAttribute("tabindex", "0");
        imgs[i].setAttribute("role", "button");
      }
    }

    // 画像クリックで開く（src が空の「作成中」は開かない）
    document.addEventListener("click", function (e) {
      var img = e.target.closest ? e.target.closest(SELECTOR) : null;
      if (!img) return;
      var src = img.getAttribute("src");
      if (!src) return;
      openBox(img.currentSrc || src, img.alt);
    });

    // Enter / Space でも開く
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var img = e.target.closest ? e.target.closest(SELECTOR) : null;
        if (img && img.getAttribute("src")) {
          e.preventDefault();
          openBox(img.currentSrc || img.getAttribute("src"), img.alt);
        }
      }
      if (e.key === "Escape" && !overlay.hidden) {
        closeBox();
      }
    });

    // 暗い部分か × をクリックで閉じる
    overlay.addEventListener("click", closeBox);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
