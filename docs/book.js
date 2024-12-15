fetch("./books.json")
  .then((responce) => responce.json())
  .then((books) => {
    localStorage.setItem("books", JSON.stringify(books));
  });

let bookInfo = document.getElementById("book-details");

function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function displayBookDetails() {
  const bookId = getBookIdFromURL();
  const books = JSON.parse(localStorage.getItem("books"));
  const book = books.find((b) => b.id === bookId);

  if (book) {
    const bookDetails = `
        <div class="book-detail">
          <img src="${book.img}" alt="${book.title}" />
          <div class="book-detail-flex">
          <h2>${book.title}</h2>
          <p>${book.stock}</p>
          <p>$${book.price} USD</p>
          <p>${book.description}</p>
          </div>
        </div>
      `;
    bookInfo.innerHTML = bookDetails;
  } else {
    bookInfo.innerHTML = "<p>Book not found!</p>";
  }
}

displayBookDetails();
