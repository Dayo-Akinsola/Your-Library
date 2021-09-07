let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

Book.prototype.readChange = function(){
    this.read = !this.read;
}

const saveToLocalStorage = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

const setLibrary = () => {
    if (!localStorage.getItem('library')){
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
}

const updateLibrary = () => {
    if (localStorage.getItem('library')){
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
}

const bookCount = (myLibrary) => {
    let count = 0;
    myLibrary.forEach(book => count++);
    return count;
}

const readCount = (myLibrary) => {
    let count = 0;
    myLibrary.forEach(book => { if(book.read) count++; });
    return count;
}

const unreadCount = (myLibrary) => {
    let count = 0
    myLibrary.forEach(book => { if(!book.read) count++; });
    return count;
}



const showBookForm = () => {
    const symbol = document.querySelector('.add-symbol');
    const formContainer = document.querySelector('.form-container-modal');
    const cancel = document.querySelector('.cancel');
    const inputs = document.querySelectorAll('.book-info');

    symbol.addEventListener('click', () => {
        formContainer.style.display = 'block';
    })

    cancel.addEventListener('click', () => {
        formContainer.style.display = 'none';
        inputs.forEach(input => {
            input.style.borderColor = 'rgb(207, 217, 222);';
            input.nextElementSibling.value = '';
            input.value = '';
        }
    )
    })
}

const displayBooks = () => {
    const booksDisplay = document.querySelector('.books-display');
    booksDisplay.textContent = '';
    const stats = document.querySelector('.book-stats').children;
    let key = 0;
    let index = 0;
    if (myLibrary.length === 0) setLibrary();
    else updateLibrary();
    const currentLibrary = JSON.parse(localStorage.getItem('library'));
    currentLibrary.forEach(book => {
        currentLibrary[index] = Object.assign(new Book(book.read = book.read), book);
        index++;
    })
    myLibrary = currentLibrary;

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
                        readButton.style.backgroundColor = '#85E4FF';
                    }
                    else{
                        readButton.textContent = 'Not Read';
                        readButton.style.backgroundColor = '#FAC796';
                    }
                    readButton.classList.add('read-button');
                    bookDiv.appendChild(readButton);
                    break;
            }

        }
        
        booksDisplay.appendChild(bookDiv);
        key++;
    })
    stats[0].textContent = `Total Books: ${bookCount(myLibrary)}`;
    stats[1].textContent = `Read Books: ${readCount(myLibrary)}`;
    stats[2].textContent = `Unread Books ${unreadCount(myLibrary)}`;    

    
    deleteBook();
    toggleRead();
}

const addBook = () => {
    const inputs = document.querySelectorAll('.book-info');
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
        let formComplete = true;

        inputs.forEach(input => {
            const warning = input.nextElementSibling;
            if (!input.value){
                warning.textContent = `${input.placeholder} must be filled.`
                input.style.borderColor = '#bb1411';
                formComplete = false;
            }

            else{
                warning.textContent = '';
                input.style.borderColor = 'rgb(207, 217, 222)';
            }
        })

        if (formComplete){
            select.value === 'true' ? newBook.read = true : newBook.read = false;
            myLibrary.push(newBook);
            inputs.forEach(input => input.value = "");
            formContainer.style.display = 'none';
            saveToLocalStorage();
            displayBooks();
        }

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
                saveToLocalStorage();
                displayBooks();
            })
        })
    })
}

const toggleRead = () => {
    const readButtons = document.querySelectorAll('.read-button');
    readButtons.forEach(button => {
        button.addEventListener('click', () =>{
            myLibrary[button.parentNode.dataset.key].readChange();
            displayBooks();
        })
    })
}

showBookForm();
addBook();
displayBooks();


