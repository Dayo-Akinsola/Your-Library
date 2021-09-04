let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

Book.prototype.readChange = function(){
    this.read = !this.read;
}

const book1 = new Book('Algorithms in C', 'Robert Sedgewick', 964, false);
const book2 = new Book('Of Mice And Men', 'John Steinbeck', 107, true);
const book3 = new Book('Pride And Prejudice', 'Jane Austen', 408, true);
const book4 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);


const showBookForm = () => {
    const symbol = document.querySelector('.add-symbol');
    const formContainer = document.querySelector('.form-container-modal');
    const cancel = document.querySelector('.cancel');

    symbol.addEventListener('click', () => {
        formContainer.style.display = 'block';
    })

    cancel.addEventListener('click', () => {
        formContainer.style.display = 'none';
    })
}

const displayBooks = () => {
    const booksDisplay = document.querySelector('.books-display');
    booksDisplay.textContent = '';
    let key = 0;
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        const bookHead = document.createElement('div');
        const title = document.createElement('h3');
        const deleteSymbol = document.createElement('span');

        bookDiv.classList.add('book-div');
        bookDiv.dataset.key = `${key}`;
        title.classList.add('title');
        deleteSymbol.classList.add('delete-symbol');
        bookHead.classList.add('book-heading');

        deleteSymbol.innerHTML = '&#8339;'
        title.textContent = book.title;
        bookHead.appendChild(deleteSymbol);
        bookHead.appendChild(title);
        bookDiv.appendChild(bookHead);

        for (let i = 0 ; i <= 2; i++){
            let span;

            switch(i){
                case 0:
                    span = document.createElement('span');
                    span.textContent = `Author: ${book.author}`;
                    span.classList.add('info');
                    bookDiv.appendChild(span);
                    break;
                case 1:
                    span = document.createElement('span');
                    span.textContent = `Number of Pages: ${book.pages}`;
                    span.classList.add('info');
                    bookDiv.appendChild(span);
                    break;
                case 2:
                    const readButton = document.createElement('button');
                    if (book.read === true){
                        readButton.textContent ='Read';
                        readButton.style.backgroundColor = 'green';
                    }
                    else{
                        readButton.textContent = 'Not Read';
                        readButton.style.backgroundColor = 'dodgerblue';
                    }
                    readButton.classList.add('read-button');
                    bookDiv.appendChild(readButton);
                    break;
            }

        }
        
        booksDisplay.appendChild(bookDiv);
        key++;
    })
    deleteBook();
    toggleRead();
}

const addBook = () => {
    const inputs = document.querySelectorAll('input');
    const select = document.querySelector('select');
    const addNewBook = document.querySelector('.add-new-book');
    const formContainer = document.querySelector('.form-container-modal');
    addNewBook.addEventListener('click', () => {
        const newBook = new Book();
        inputs.forEach(input => {
            switch(input.name){
                case 'title':
                    newBook.title = input.value;
                    break;
                case 'author':
                    newBook.author = input.value;
                    break;
                case 'pages':
                    newBook.pages = input.value;
            }
        })
        select.value === 'true' ? newBook.read = true : newBook.read = false;
        myLibrary.push(newBook);
        formContainer.style.display = 'none';
        displayBooks();

    })
}

const deleteBook = () => {
    const deleteButtons = document.querySelectorAll('.delete-symbol');
    const books = document.querySelectorAll('.book-div');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            books.forEach(book => {
                if (button.parentNode.parentNode.dataset.key === book.dataset.key){
                    myLibrary.splice(book.dataset.key, 1);
                }
                displayBooks();
            })
        })
    })
}

const toggleRead = () => {
    const readButtons = document.querySelectorAll('.read-button');
    const books = document.querySelectorAll('.book-div');
    readButtons.forEach(button => {
        button.addEventListener('click', () =>{
            console.log(button.parentNode.dataset.key);
            books.forEach(book => {
                console.log(book.dataset.key);
                if (button.parentNode.dataset.key === book.dataset.key){
                    myLibrary[book.dataset.key].readChange();
                    console.log(myLibrary);
                }
                displayBooks();
            })
        })
    })
}

showBookForm();
addBook();
displayBooks();
toggleRead();


