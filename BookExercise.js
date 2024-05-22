const myLibrary = [
    {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        pages: 310,
        read: true,
    },
    {
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        pages: 1077,
        read: false,
    },
];


//Book constructor

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    const newBook = new Book(
        title.value,
        author.value, 
        pages.value, 
        read.checked ? true : false
    );

    myLibrary.push(newBook);
    displayLibrary();
    bookDialog.close();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.value = '';
};

//Manage cards

const cardsDiv = document.querySelector('#cards');

//Loop to display entire library

function displayLibrary(){
    cardsDiv.innerHTML = '' 
    for (book of myLibrary){
        const card = document.createElement('div');
        const h3 = document.createElement('h3');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const readBtn = document.createElement('button');
        const delBtn = document.createElement('img');

        h3.textContent = book.title;
        p1.textContent = book.author;
        p2.textContent = book.pages;

        card.classList.add('card');
        p1.classList.add('author');
        p2.classList.add('pages');
        readBtn.classList.add('card-read');
        readBtn.textContent = book.read === true ? 'READ' : 'NOT READ';
        delBtn.classList.add('card-delete');
        delBtn.src = './delete.svg';
        card.setAttribute('data-index', myLibrary.indexOf(book));
        
        card.appendChild(h3);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(readBtn);
        card.appendChild(delBtn);
        
        cardsDiv.appendChild(card);
}};

displayLibrary();

//Buttons on card (Delete and Read)

function cardBtns(e) {
    const dataInd = e.target.parentNode.getAttribute('data-index');
    if (e.target.classList.contains('card-delete')) {
        myLibrary.splice(dataInd, 1);
    } else if (e.target.classList.contains('card-read')) {
        if (myLibrary[dataInd].read === true) {
            myLibrary[dataInd].read = false;
        } else {
            myLibrary[dataInd].read = true;
        }
    };
    displayLibrary();
};

//LISTENERS

const showButton = document.querySelector("#showDialog");
const bookDialog = document.querySelector("dialog");
const submitModal = document.querySelector('#confirmBtn');
const cancelModal = document.querySelector('#cancelBtn');

showButton.addEventListener("click" , (e) =>{
    e.preventDefault();
    bookDialog.showModal();
});

submitModal.addEventListener('click',
    addBookToLibrary
);

cancelModal.addEventListener("click", (e) =>{
    e.preventDefault();
    bookDialog.close();
});

cardsDiv.addEventListener("click", cardBtns);