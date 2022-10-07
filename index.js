const myGlobalObj = (() => {
    const addBookToLibraryButton = document.querySelector(".addItButton");
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    const haveYouReadItInput = document.querySelector("#haveYouReadIt");
    const formContainer = document.querySelector(".form-container");
    const booksContainer = document.querySelector(".books-container");
    const openFormButton = document.querySelector(".open-form button");
    const closeButton = document.querySelector(".close-button");
    const body = document.querySelector("body");
    const myLibrary = [];
    let booksCard = "";

    class Book {
        constructor(title, author, pages, haveYouReadIt) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.haveYouReadIt = haveYouReadIt;
        }
        createCard() {
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
            readStatusButton.classList.add("read-status");
            deleteButton.textContent = "Delete book";
            readStatusButton.textContent = "Change status";
            this.fillBookCard(bookCard, titlePara, authorPara, pagesPara, haveYouReadItPara, deleteButton, readStatusButton);
        }
        fillBookCard(bookCard, titlePara, authorPara, pagesPara, haveYouReadItPara, deleteButton, readStatusButton) {
            const book = this;
            titlePara.textContent = `Title: ${book.title}`;
            authorPara.textContent = `Author: ${book.author}`;
            pagesPara.textContent = `Pages: ${book.pages}`;
            (book.haveYouReadIt === true) ? (book.haveYouReadIt = "Yes") : (book.haveYouReadIt = "No");
            haveYouReadItPara.textContent = `Have You Read It: ${book.haveYouReadIt}`;
            booksContainer.appendChild(bookCard);
            bookCard.appendChild(titlePara);
            bookCard.appendChild(authorPara);
            bookCard.appendChild(pagesPara);
            bookCard.appendChild(haveYouReadItPara);
            bookCard.appendChild(deleteButton);
            bookCard.appendChild(readStatusButton);
            this.deleteCard(deleteButton, book);
            this.changeStatus(readStatusButton, book, haveYouReadItPara);
        }
        deleteCard(deleteButton, book) {
            deleteButton.addEventListener("click", (e) => {
                myLibrary.splice(myLibrary.indexOf(book), 1);
                e.target.parentElement.style.scale = "0";
                setTimeout(() => e.target.parentElement.remove(), 300);
            });
        }
        changeStatus(readStatusButton, book, haveYouReadItPara) {
            readStatusButton.addEventListener("click", () => {
                (book.haveYouReadIt === "Yes") ? (book.haveYouReadIt = "No") : (book.haveYouReadIt = "Yes");
                haveYouReadItPara.textContent = `Have You Read It: ${book.haveYouReadIt}`;
            });
        }
    }
    // sample items
    const bookSample1 = new Book(
        "The Compound Effect",
        "Darren Hardy",
        "200",
        true
    );
    const bookSample2 = new Book(
        "Atomic Habit",
        "James Clear",
        "320",
        true
    );
    const bookSample3 = new Book(
        "The Millionaire Fastlane",
        "Mj Demarco",
        "340",
        true
    );
    const bookSample4 = new Book(
        "Think and Grow Rich",
        "Napoleon Hill",
        "238",
        true
    );
    myLibrary.push(bookSample1, bookSample2, bookSample3, bookSample4);
    myLibrary.forEach((bookSample) => bookSample.createCard());


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
            newBook.createCard();
            resettingInputs();
            closeWindow();
        });
    };
    addBookToLibrary();
    // opening the form container
    const openForm = () => {
        booksCard = document.querySelectorAll(".book-card");
        formContainer.style.scale = "1";
        addBookToLibraryButton.style.visibility = "visible";
        closeButton.style.visibility = "visible";
        if ((formContainer.style.visibility = "visible")) {
            body.style.backgroundColor = "#00000087";
            booksCard.forEach(bookCard => bookCard.style.backgroundColor = "#e3e3e357");
        }
    };
    // closing the form container
    const closeWindow = () => {
        booksCard = document.querySelectorAll(".book-card");
        formContainer.style.scale = "0";
        addBookToLibraryButton.style.visibility = "hidden";
        closeButton.style.visibility = "hidden";
        if ((formContainer.style.visibility = "hidden")) {
            body.style.backgroundColor = "";
            booksCard.forEach(bookCard => bookCard.style.backgroundColor = "#ffffff");
        }
    };
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeWindow();
        }
    });

    closeButton.addEventListener("click", closeWindow);

    body.addEventListener('click', (e) => {
        if (openFormButton.contains(e.target)) {
            openForm();

        } // closing the window if clicking outside the formContainer
        else if (!formContainer.contains(e.target)) {
            closeWindow();
        }
    });
})();