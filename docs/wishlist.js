function displayWishlist() {
  const wishlistHtml = document.querySelector(".wishlist-books__grid");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlistHtml.innerHTML = "";

  if (wishlistHtml.length === 0) {
    wishlistHtml.innerHTML = "<h2>Your wishlist is empty!</h2>";
    return;
  }

  wishlist.forEach((book) => {
    const bookHtml = `
        <div class="wishlist-book">
            <a href="book.html?id=${book.id}">
                <img src="${book.img}" alt="${book.title}" />
            </a>
            <h4>$${book.price} USD</h4>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
        </div>
        `;
    wishlistHtml.insertAdjacentHTML("beforeend", bookHtml);
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookId = btn.getAttribute("data-id");
      removeFromWishlist(bookId);
    });
  });
}

function removeFromWishlist(bookId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((book) => book.id !== bookId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayWishlist();
}
displayWishlist();
