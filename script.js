let booksToSell;

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
        <p >$ ${book.price}</p>
        
        <button id=${book.asin} onclick = "addBookToCart(event)" type="button" class="btn btn-outline-primary"><i class="bi bi-cart3"></i></button>
        <button onclick = "removeBookFromPage(event)"  type="button" class="btn btn-outline-primary">Skip</button>
      </div>
      </div>
    </div>`;
    });

    const stringOfBooks = bookItem.join("");
    container.innerHTML += stringOfBooks;
  } catch (err) {}
};

let cart = [];

const addBookToCart = (event) => {
  console.log(event);
  let asin = event.target.id;
  let selectedBook = event.target.parentNode.parentNode;
  cart.push(asin);
  selectedBook.classList.add("text-danger");
  let tableRow = document.querySelector("tbody");
  booksToSell.forEach((item) => {
    console.log(item.asin, "selected", asin);
    if (item.asin == asin) {
      console.log(item.asin, asin);
      tableRow.innerHTML += ` <tr>
        <th scope="row">${item.asin}</th>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td><button type="button" class="btn btn-danger" onclick = "deleteRow(event)"><i class="bi bi-archive"></i></button></td>
      </tr>
      `;

      let count = cart.reduce((number) => {
        return (number += 1);
      }, 0);

      document.getElementById("count").innerText = `${count}`;
    }
  });
};

function deleteRow(event) {
  let rowIndex = event.target.parentNode.parentNode.parentNode.rowIndex;
  document.getElementById("my-table").deleteRow(rowIndex);

  let count = parseInt(document.getElementById("count").innerText);

  document.getElementById("count").innerText = `${--count}`;
}

function deleteTable() {
  var Parent = document.getElementById("t-body");
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }

  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("text-danger");
  }

  document.getElementById("count").innerText = "";
}

const removeBookFromPage = (event) => {
  let selectedBooks = event.target.parentNode.parentNode;
  selectedBooks.classList.add("d-none");
};

document
  .getElementById("search-input")
  .addEventListener("keypress", searchBooks);

document.getElementById("search-btn").addEventListener("click", searchBooks);

function searchBooks() {
  let search = document.querySelector("#search-input").value;
  if (search.length >= 3) {
    let container = document.getElementById("book-row");
    container.innerHTML = "";
    let filtered = booksToSell.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filtered);
    let bookItem = filtered.map((book) => {
      return `
        <div class= "col-3 mb-2"> 
        <div class="card">
        <img src="${book.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p>$ ${book.price}</p>
          
          <button id=${book.asin} onclick = "addBookToCart(event)" type="button" class="btn btn-outline-primary"><i class="bi bi-cart3"></i></button>
          <button onclick = "removeBookFromPage(event)"  type="button" class="btn btn-outline-primary">Skip</button>
        </div>
        </div>
      </div>`;
    });
    const stringOfBooks = bookItem.join("");
    container.innerHTML += stringOfBooks;
  } else {
    getBooks();
  }
}
window.onload = getBooks();
