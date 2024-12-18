fetch("./books.json")
  .then((responce) => responce.json())
  .then((books) => {
    localStorage.setItem("books", JSON.stringify(books));
  });

let initialyShowedItems = 3;
let loadedItems = 3;
let booksListHtml = document.querySelector(".book-grid");
let loadMoreBtn = document.querySelector(".load-more");
const filterList = document.querySelector(".filter-list");
let currentCategory = "All";

function loadInitialItems() {
  let books = JSON.parse(localStorage.getItem("books"));
  displayBooks(books.slice(0, initialyShowedItems));
}

function loadData() {
  let currentDisplayedItems = document.querySelectorAll(".book").length;
  let books = JSON.parse(localStorage.getItem("books"));

  let filteredBooks = filterBooksByCategory(books, currentCategory);
  let booksToLoad = filteredBooks.slice(
    currentDisplayedItems,
    currentDisplayedItems + loadedItems
  );

  displayBooks(booksToLoad);

  if (document.querySelectorAll(".book").length === filteredBooks.length) {
    loadMoreBtn.style.display = "none";
  }
}

function filterBooksByCategory(books, category) {
  if (category === "All") {
    return books;
  } else {
    return books.filter((book) => book.category === category);
  }
}

function displayBooks(booksToDisplay) {
  booksToDisplay.forEach((book) => {
    let bookHtml = `
      <div class="book">
        <a href="book.html?id=${book.id}"><img src="${book.img}" alt="${book.title}" /></a>
        <h4>${book.title}</h4>
        <p>$${book.price} USD</p>
        <button class="book-btn" data-id="${book.id}">Add to Wishlist</button>
      </div>
    `;
    let div = document.createElement("div");
    booksListHtml.appendChild(div);
    div.innerHTML = bookHtml;
    div.style.opacity = 0;
    fadeIn(div);
  });

  document.querySelectorAll(".book-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookId = btn.getAttribute("data-id");
      addBookToWishlist(bookId);
    });
  });
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

filterList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    currentCategory = event.target.innerText;
    booksListHtml.innerHTML = "";
    loadMoreBtn.style.display = "block";

    let books = JSON.parse(localStorage.getItem("books"));
    let filteredBooks = filterBooksByCategory(books, currentCategory);
    displayBooks(filteredBooks.slice(0, initialyShowedItems));
  }
});

loadInitialItems();

// Countdown

const targetDate = new Date("Dec 31, 2024 23:59:59").getTime();
let countdownDiv = document.querySelector(".countdown");

function updateCountdown() {
  const dateNow = new Date().getTime();
  const remainingTime = targetDate - dateNow;
  if (remainingTime <= 0) {
    countdownDiv.innerHTML += "<span>Expired!</span>";
    clearInterval(remainingTime);
    return;
  } else {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    countdownDiv.innerHTML = `
    <span>${days} Days</span>
    <span>${hours} Hours</span>
    <span>${minutes} Minutes</span>
    <span>${seconds} Seconds</span>
    `;
  }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Wishlist

function addBookToWishlist(bookID) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  let books = JSON.parse(localStorage.getItem("books"));
  let bookToAdd = books.find((book) => book.id === bookID);

  if (bookToAdd && !wishlist.find((book) => book.id === bookID)) {
    wishlist.push(bookToAdd);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${bookToAdd.title} book was added to the wishlist!`);
  } else {
    alert(`${bookToAdd.title} book is already in your wishlist!`);
  }
}
