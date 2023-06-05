import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    where,
    query,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCtjDCKBbH-vipPs9n8HF4Y3GXPkheJ1wE',
    authDomain: 'library-b17ef.firebaseapp.com',
    projectId: 'library-b17ef',
    storageBucket: 'library-b17ef.appspot.com',
    messagingSenderId: '1020333395162',
    appId: '1:1020333395162:web:98246575ea27744652e9e3',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addDocuments = async (book) => {
    try {
        const docRef = await addDoc(
            collection(db, 'books'),
            Object.assign({}, book)
        );
        console.log('Document written with ID: ', docRef);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

const addBookToLibraryButton = document.querySelector('.addItButton');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const haveYouReadItInput = document.querySelector('#haveYouReadIt');
const formContainer = document.querySelector('.form-container');
const booksContainer = document.querySelector('.books-container');
const openFormButton = document.querySelector('.open-form button');
const closeButton = document.querySelector('.close-button');
const body = document.querySelector('body');
let booksCard = '';

class Book {
    constructor(title, author, pages, haveYouReadIt) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveYouReadIt = haveYouReadIt;
    }
}
function createCard(book) {
    const bookCard = document.createElement('div');
    const titlePara = document.createElement('p');
    const authorPara = document.createElement('p');
    const pagesPara = document.createElement('p');
    const haveYouReadItPara = document.createElement('p');
    const deleteButton = document.createElement('button');
    const readStatusButton = document.createElement('button');
    bookCard.classList.add('book-card');
    deleteButton.classList.add('delete-button');
    readStatusButton.classList.add('read-status');
    deleteButton.textContent = 'Delete book';
    readStatusButton.textContent = 'Change status';

    fillBookCard(
        book,
        bookCard,
        titlePara,
        authorPara,
        pagesPara,
        haveYouReadItPara,
        deleteButton,
        readStatusButton
    );
}
function fillBookCard(
    book,
    bookCard,
    titlePara,
    authorPara,
    pagesPara,
    haveYouReadItPara,
    deleteButton,
    readStatusButton
) {
    titlePara.textContent = `Title: ${book.title}`;
    authorPara.textContent = `Author: ${book.author}`;
    pagesPara.textContent = `Pages: ${book.pages}`;

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
}
function deleteCard(deleteButton, book) {
    deleteButton.addEventListener('click', async (e) => {
        e.target.parentElement.style.scale = '0';
        setTimeout(() => e.target.parentElement.remove(), 300);

        const q = query(collection(db, 'books'), where('title', '==', book.title));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    });
}
function changeStatus(readStatusButton, book, haveYouReadItPara) {
    readStatusButton.addEventListener('click', async () => {
        book.haveYouReadIt === 'Yes'
            ? (book.haveYouReadIt = 'No')
            : (book.haveYouReadIt = 'Yes');
        haveYouReadItPara.textContent = `Have You Read It: ${book.haveYouReadIt}`;

        const q = query(collection(db, 'books'), where('title', '==', book.title));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, book);
        });
    });
}

const resettingInputs = () => {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    haveYouReadItInput.checked = false;
};

const addBookToLibrary = () => {
    addBookToLibraryButton.addEventListener('click', () => {
        if (!titleInput.value || !authorInput.value || !pagesInput.value) {
            return;
        }
        const newBook = new Book(
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            haveYouReadItInput.checked
        );

        addDocuments(newBook);
        createCard(newBook);

        resettingInputs();
        closeWindow();
    });
};
addBookToLibrary();

// opening the form container
const openForm = () => {
    booksCard = document.querySelectorAll('.book-card');
    formContainer.style.scale = '1';
    addBookToLibraryButton.style.visibility = 'visible';
    closeButton.style.visibility = 'visible';
    if ((formContainer.style.visibility = 'visible')) {
        body.style.backgroundColor = '#00000087';
        booksCard.forEach(
            (bookCard) => (bookCard.style.backgroundColor = '#e3e3e357')
        );
    }
};

// closing the form container
const closeWindow = () => {
    booksCard = document.querySelectorAll('.book-card');
    formContainer.style.scale = '0';
    addBookToLibraryButton.style.visibility = 'hidden';
    closeButton.style.visibility = 'hidden';
    if ((formContainer.style.visibility = 'hidden')) {
        body.style.backgroundColor = '';
        booksCard.forEach(
            (bookCard) => (bookCard.style.backgroundColor = '#ffffff')
        );
    }
};
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWindow();
    }
});

closeButton.addEventListener('click', closeWindow);
body.addEventListener('click', (e) => {
    if (openFormButton.contains(e.target)) {
        openForm();
    } // closing the window if clicking outside the formContainer
    else if (!formContainer.contains(e.target)) {
        closeWindow();
    }
});

// sample items
const bookSample1 = new Book(
    'The Compound Effect',
    'Darren Hardy',
    '200',
    'Yes'
);
const bookSample2 = new Book('Atomic Habit', 'James Clear', '320', 'Yes');
const bookSample3 = new Book(
    'The Millionaire Fastlane',
    'Mj Demarco',
    '340',
    'Yes'
);
const bookSample4 = new Book(
    'Think and Grow Rich',
    'Napoleon Hill',
    '238',
    'Yes'
);

const createCardsOnLoading = async () => {
    const querySnapshot = await getDocs(collection(db, 'books'));

    if (!querySnapshot.docs.length) {
        await addDocuments(bookSample1);
        await addDocuments(bookSample2);
        await addDocuments(bookSample3);
        await addDocuments(bookSample4);
    }

    querySnapshot.forEach((doc) => {
        createCard(doc.data());
    });
};
createCardsOnLoading();
