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
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
};

Object.defineProperty(Book.prototype, "showInfo", {enumerable:false});

//To put books into the library
function addToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

//To display saved books
function displayBooks() {
    let newItem;
    let infoNode;
    let bookInfo;
    myLibrary.forEach(function (book) {
        newItem = document.createElement("ul");        
        for (prop in book) {
            infoNode = document.createElement("li");
            bookInfo = document.createTextNode(book[prop]);
            infoNode.appendChild(bookInfo)
            newItem.appendChild(infoNode);
        }
        document.body.appendChild(newItem);
        document.body.append(document.createElement("br"));
    })
}


addToLibrary("harry potter", "rowling", "500", "sim");
addToLibrary("harry potter 2", "jk rowling", "421", "sim");
addToLibrary("teste", "eu", "10", "não");