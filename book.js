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

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
console.log(myLibrary);

const displayBooks = () => {
    myLibrary.forEach(book => {
        
    })
}
