function startHeader(header) {
  const topBar = document.querySelector(".topbar");

  if (!topBar) {
    return;
  }

  function moveOverlayBar() {
    const topBarHeight = topBar.getBoundingClientRect().height;

    if (window.scrollY >= topBarHeight) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", moveOverlayBar);
  window.addEventListener("resize", moveOverlayBar);
  moveOverlayBar();
}

const headerBox = document.getElementById("header");

if (headerBox) {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerBox.innerHTML = data;
      startHeader(document.querySelector(".header-layout"));
    });
} else {
  startHeader(document.body);
}

function loadPreviewCards(pageFile, boxId) {
  fetch(pageFile)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data, "text/html");
      var cards = doc.querySelectorAll(".home .card");
      var box = document.getElementById(boxId);

      if (!box) {
        return;
      }
      var htmlText = "";
      var i = 0;

      while (i < 6 && i < cards.length) {
        htmlText = htmlText + cards[i].outerHTML;
        i = i + 1;
      }

      box.innerHTML = htmlText;
    });
}

loadPreviewCards("trending.html", "trending-products");
loadPreviewCards("preorders.html", "preorders-products");
loadPreviewCards("upcoming.html", "upcoming-products");

const footerBox = document.getElementById("footer");

if (footerBox) {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerBox.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
}
