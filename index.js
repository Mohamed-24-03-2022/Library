const addBookToLibraryButton = document.querySelector(".addItButton");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const haveYouReadItInput = document.querySelector("#haveYouReadIt");
const formContainer = document.querySelector(".form-container");
const booksContainer = document.querySelector(".books-container");
const addNewBookButton = document.querySelector(".new-books button");
const closeButton = document.querySelector(".close-button");
const body = document.querySelector("body");
const myLibrary = [];

function Book(title, author, pages, haveYouReadIt) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveYouReadIt = haveYouReadIt;
}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveYouReadIt}`;
};
// default items
const book1 = new Book("The Compound Effect", "Darren Hardy", "200", true);
myLibrary.push(book1);


const createCard = () => {
    const bookCard = document.createElement("div");
    const titlePara = document.createElement("p");
    const authorPara = document.createElement("p");
    const pagesPara = document.createElement("p");
    const haveYouReadItPara = document.createElement("p");
    const deleteButton = document.createElement("button");
    const readStatusButton = document.createElement("button");
    // bookCard.setAttribute("data-index-number", i);
    // const index = bookCard.dataset.indexNumber;
    // myLibrary.splice(index, 1);
    bookCard.classList.add("book-card");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete book";
    readStatusButton.classList.add("read-status");
    readStatusButton.textContent = "Change status";
    fillBookCard(bookCard, titlePara, authorPara, pagesPara, haveYouReadItPara, deleteButton, readStatusButton);
}
const deleteCard = (deleteButton, book) => {
    deleteButton.addEventListener("click", (e) => {
        const bookTitle = e.target.parentElement.firstChild.textContent.slice(7);
        if (bookTitle === book.title) {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            e.target.parentElement.remove();
        }
    });
}
const changeStatus = (readStatusButton, book, haveYouReadItPara) => {
    readStatusButton.addEventListener("click", () => {
        if (book.haveYouReadIt === "Yes") {
            book.haveYouReadIt = "No";
        } else {
            book.haveYouReadIt = "Yes";
        }
        haveYouReadItPara.textContent = `Have You Read It: ${book.haveYouReadIt}`;
    });
}
const fillBookCard = (bookCard, titlePara, authorPara, pagesPara, haveYouReadItPara, deleteButton, readStatusButton) => {
    myLibrary.forEach(book => {
        titlePara.textContent = `Title: ${book.title}`;
        authorPara.textContent = `Author: ${book.author}`;
        pagesPara.textContent = `Pages: ${book.pages}`;
        book.haveYouReadIt === true ? (book.haveYouReadIt = "Yes") : (book.haveYouReadIt = "No");
        haveYouReadItPara.textContent = `Have You Read It: ${book.haveYouReadIt}`;
        booksContainer.appendChild(bookCard);
        bookCard.appendChild(titlePara);
        bookCard.appendChild(authorPara);
        bookCard.appendChild(pagesPara);
        bookCard.appendChild(haveYouReadItPara);
        bookCard.appendChild(deleteButton);
        bookCard.appendChild(readStatusButton);
        deleteCard(deleteButton, book);
        changeStatus(readStatusButton, book, haveYouReadItPara);
    });
};
createCard(); // to load default items

const resettingInputs = () => {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    haveYouReadItInput.checked = false;
};
const addBookToLibrary = () => {
    addBookToLibraryButton.addEventListener("click", () => {
        if (!titleInput.value || !authorInput.value || !pagesInput.value) {
            return;
        }
        const newBook = new Book(
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            haveYouReadItInput.checked
        );
        myLibrary.push(newBook);
        createCard();
        resettingInputs();
        closeWindow();
    });
}
addBookToLibrary();
addNewBookButton.addEventListener("click", () => {
    formContainer.style.scale = "1";
    addBookToLibraryButton.style.visibility = "visible";
    closeButton.style.visibility = "visible";
    if ((formContainer.style.visibility = "visible")) {
        body.style.backgroundColor = "#00000087";
    }
});
const closeWindow = () => {
    formContainer.style.scale = "0";
    addBookToLibraryButton.style.visibility = "hidden";
    closeButton.style.visibility = "hidden";
    if ((formContainer.style.visibility = "hidden")) {
        body.style.backgroundColor = "";
    }
};
closeButton.addEventListener("click", closeWindow);