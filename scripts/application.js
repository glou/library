//Main code for the app.
//I'll write other files if it get too big.

//All books will be stored, as objects, inside a single array
let myLibrary = [];

//Function constructor for 'Book' objects
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read    
}

Book.prototype.showInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

Object.defineProperty(Book.prototype, "showInfo", {enumerable:false});

//To put books into the library
function addToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


const bookCards = document.getElementsByClassName("books");
//To display saved books
//Takes one argument, indicating to show all the library or to just update (skipping the loop)
function displayBooks(update) {    
    let bookCard;
    let bookInfo;
    if (!update){
        myLibrary.forEach(function (book) {
            bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookInfo = document.createTextNode(book.showInfo());
            bookCard.appendChild(bookInfo);         
            bookCards[0].appendChild(bookCard);
        })
    } else {
        bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookInfo = document.createTextNode(myLibrary[myLibrary.length - 1].showInfo());
        bookCard.appendChild(bookInfo);         
        bookCards[0].appendChild(bookCard);
    }    
}


document.getElementById("open-form").addEventListener("click", () => document.getElementById("add-book").style.display = "block");
document.getElementById("book-form").onsubmit = (e) => {
    e.preventDefault();
    let fields = document.querySelectorAll("input");
    addToLibrary(fields[0].value, fields[1].value, fields[2].value, fields[3].value); 
    displayBooks(true);
}
document.getElementById("close-form").addEventListener("click", () => document.getElementById("add-book").style.display = "none");





