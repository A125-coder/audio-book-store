fetch("./books.json")
  .then((responce) => responce.json())
  .then((books) => {
    localStorage.setItem("books", JSON.stringify(books));
  });

let initialyShowedItems = 3;
let loadedItems = 3;
let booksListHtml = document.querySelector(".book-grid");
let loadMoreBtn = document.querySelector(".load-more");

function loadInitialItems() {
  let books = JSON.parse(localStorage.getItem("books"));
  let booksList = "";
  let counter = 0;
  for (const book of books) {
    if (counter < initialyShowedItems) {
      booksList += `
        <div class="book">
            <img src="${book.img}" alt="${book.title}" />
            <h4>${book.title}</h4>
            <p>$${book.price}USD</p>
        </div>
    `;
    }
    counter++;
  }
  let div = document.createElement("div");
  booksListHtml.appendChild(div);
  div.innerHTML = booksList;
}
loadInitialItems();

function loadData() {
  let currentDisplayedItems = document.querySelectorAll(".book").length;
  let books = JSON.parse(localStorage.getItem("books"));
  let booksList = "";
  let counter = 0;
  for (const book of books) {
    if (
      counter >= currentDisplayedItems &&
      counter < loadedItems + currentDisplayedItems
    ) {
      booksList += `
        <div class="book">
            <img src="${book.img}" alt="${book.title}" />
            <h4>${book.title}</h4>
            <p>$${book.price}USD</p>
        </div>
    `;
    }
    counter++;
  }
  let div = document.createElement("div");
  booksListHtml.appendChild(div);
  div.innerHTML = booksList;
  div.style.opacity = 0;

  if (document.querySelectorAll(".book").length === books.length) {
    loadMoreBtn.style.display = "none";
  }

  fadeIn(div);
}

function fadeIn(div) {
  let opacity = 0;
  let interval = setInterval(() => {
    if (opacity <= 1) {
      opacity += 0.1;
      div.style.opacity = opacity;
    } else {
      clearInterval(interval);
    }
  }, 30);
}
