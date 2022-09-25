const addBookToLibraryButton = document.querySelector(".addItButton");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const haveYouReadItInput = document.querySelector("#haveYouReadIt");

const formContainer = document.querySelector(".form-container");
const booksContainer = document.querySelector(".books-container");
const addNewBookButton = document.querySelector(".new-books button");
const closeButton = document.querySelector(".close-button");
// const deleteButton = document.querySelector(".delete-button");
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
const book2 = new Book("Atomic habit", "James Clear", "350", true);
myLibrary.push(book1, book2);

// declaring i here to the for loop so it doesn't iterate over elements that are already iterated over.
let i = 0;
const displayBookCard = () => {
    for (i; i < myLibrary.length; i++) {
        const bookBox = document.createElement("div");
        bookBox.classList.add("book-box");
        bookBox.setAttribute("data-index-number", i);

        booksContainer.appendChild(bookBox);
        const titleP = document.createElement("p");
        const authorP = document.createElement("p");
        const pagesP = document.createElement("p");
        const haveYouReadItP = document.createElement("p");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete book";

        const book = myLibrary[i];
        titleP.textContent = `Title: ${book.title}`;
        authorP.textContent = `Author: ${book.author}`;
        pagesP.textContent = `Pages: ${book.pages}`;

        if (book.haveYouReadIt === true) {
            book.haveYouReadIt = "Yes";
        } else {
            book.haveYouReadIt = "No";
        }
        haveYouReadItP.textContent = `Have You Read It: ${book.haveYouReadIt}`;

        bookBox.appendChild(titleP);
        bookBox.appendChild(authorP);
        bookBox.appendChild(pagesP);
        bookBox.appendChild(haveYouReadItP);
        bookBox.appendChild(deleteButton);
    }
};
displayBookCard();

const resettingInputs = () => {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    haveYouReadItInput.checked = false;
};
function addBookToLibrary() {
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
        displayBookCard();
        resettingInputs();
        closeWindow();
        console.log(i);
        console.log(myLibrary);
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

// body.addEventListener("click", closeWindow);


const deleteBookBox = () => {
    deleteButton.addEventListener("click", () => {
        const index = bookBox.dataset.indexNumber;
        console.log(myLibrary);
        myLibrary.splice(index, 1);
        console.log(myLibrary);
    });
}
setTimeout(() => {
    deleteBookBox();
}, 300);