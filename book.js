let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

const book1 = new Book('Algorithms in C', 'Robert Sedgewick', 964, 'not read yet');
const book2 = new Book('Of Mice And Men', 'John Steinbecl', 107, 'read');
const book3 = new Book('Pride And Prejudice', 'Jane Austen', 408, 'read');
const book4 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'read');

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);

const showBookForm = () => {
    const symbol = document.querySelector('.add-symbol');
    const formContainer = document.querySelector('.form-container');
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
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        const title = document.createElement('h3');
        title.classList.add('title');
        bookDiv.appendChild(title);

        for (let i = 0 ; i <= 2; i++){
            const span = document.createElement('span');
            span.classList.add('info');

            switch(i){
                case 0:
                    span.textContent = book.author;
                    break;
                case 1:
                    span.textContent = book.pages;
                    break;
                case 2:
                    span.textContent = book.read;
                    break;
            }

            bookDiv.appendChild(span);
        }
        
        booksDisplay.appendChild(bookDiv);
    })
}

showBookForm();
displayBooks();