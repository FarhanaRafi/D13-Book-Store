let booksToSell = [];

const getBooks = async () => {
  try {
    let res = await fetch("https://striveschool-api.herokuapp.com/books");
    console.log(res);
    let books = await res.json();
    booksToSell = books;
    console.log(books);
    let container = document.querySelector("#book-row");
    let bookItem = books.map((book) => {
      return `
      <div class= "col-3 mb-2"> 
      <div class="card">
      <img src="${book.img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p id=${book.asin}>$ ${book.price}</p>
        
        <button id=${book.asin} onclick = "addBookToCart(event)" type="button" class="btn btn-outline-primary"><i class="bi bi-cart3"></i></button>
        <button id=${book.asin} onclick = "removeBookFromPage(event)"  type="button" class="btn btn-outline-primary">Skip</button>
      </div>
      </div>
    </div>`;
    });
    booksToSell.push(bookItem);
    const stringOfBooks = bookItem.join("");
    container.innerHTML += stringOfBooks;
  } catch (err) {}
};

let cart = [];

const addBookToCart = (event) => {
  console.log(event);
  let asin = event.target.id;
  let selectedBook = event.target.parentNode.parentNode;
  cart.push(selectedBook);
  selectedBook.classList.add("text-danger");
  let tableRow = document.querySelector("tbody");
  console.log(booksToSell);
  booksToSell.forEach((item) => {
    if (item.asin === asin) {
      console.log(item);
      tableRow.innerHTML += ` <tr>
        <th scope="row">${item.asin}</th>
        <td>${item.title}</td>
        <td>${item.price}</td>
      </tr>
      `;
    }
  });
};

const removeBookFromPage = (event) => {
  let selectedBooks = event.target.parentNode.parentNode;
  selectedBooks.classList.add("d-none");
};
function searchBook() {
  document
    .getElementById("search-input")
    .addEventListener("keypress", function () {
      let search = document.querySelector("#search-input").value;
      if (search.length >= 3) {
        let container = document.querySelector("#book-row");
        container.innerHTML = "";
        let filtered = booksToSell.filter((book) => {
          book.title.includes(search);
        });
        let bookItem = filtered.map((book) => {
          return `
        <div class= "col-3 mb-2"> 
        <div class="card">
        <img src="${book.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p id=${book.asin}>$ ${book.price}</p>
          
          <button id=${book.asin} onclick = "addBookToCart(event)" type="button" class="btn btn-outline-primary"><i class="bi bi-cart3"></i></button>
          <button id=${book.asin} onclick = "removeBookFromPage(event)"  type="button" class="btn btn-outline-primary">Skip</button>
        </div>
        </div>
      </div>`;
        });
        const stringOfBooks = bookItem.join("");
        container.innerHTML += stringOfBooks;
      } else {
        getBooks();
      }
    });
}

window.onload = getBooks();
