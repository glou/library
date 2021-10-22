//Main code for the app.

//TODO: Steps 6 and 7 from TOP

//All books will be stored, as objects, inside a single array
let myLibrary = [];

//Function constructor for 'Book' objects
function Book(title, author, pages, read) {
    this.title = "\"" + title + "\"",
    this.author = author,
    this.pages = pages,
    this.read = read 
}
Book.prototype.showInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(Boolean(+this.read) ? 'Read' : 'Not read')}`;
};

function addToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));    
}

function removeFromLibrary(e) {
    let bookIndex = +e.target.parentElement.dataset.index;
    myLibrary.splice(bookIndex, 1);
    displayBooks(true);
}

//Updates read/not read status inside the object and in display
function updateStatus(e) {
    let bookCard = e.target.parentElement;
    let bookIndex = +bookCard.dataset.index; //Data attribute created in the following function
    myLibrary[bookIndex].read = e.target.value;
    let textNode = bookCard.firstChild;    
    while (textNode.nodeType != Node.TEXT_NODE) {
        textNode = textNode.nextSibling;        
    }
    textNode.textContent = myLibrary[bookIndex].showInfo();
}

//To display saved books
//Takes one argument, indicating to show all the library or to just show the added book (skipping the loop)
const bookCards = document.getElementsByClassName("books"); //Stores the display containter
function displayBooks(allContent) {    
    let bookCard;
    let bookInfo;
    let statusBook;
    let deleteBook;
    if (allContent){
        while (bookCards[0].firstChild) {
            bookCards[0].removeChild(bookCards[0].firstChild); //Will redo all the display
        }
        myLibrary.forEach(function (book) {            
            bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.setAttribute("data-index", myLibrary.indexOf(book)); //To identify books in the array
            bookInfo = document.createTextNode(book.showInfo());            
            statusBook = document.createElement("input");
            statusBook.type = "range";
            statusBook.min = "0";
            statusBook.max = "1";
            statusBook.value = book.read;
            statusBook.appendChild(document.createTextNode("Have you read it?"));
            deleteBook = document.createElement("button")
            deleteBook.type = "button";
            deleteBook.appendChild(document.createTextNode("Delete"));
            bookCard.appendChild(bookInfo);
            bookCard.appendChild(statusBook);
            bookCard.appendChild(deleteBook);
            bookCards[0].appendChild(bookCard);
        })
    } else {
        bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", (myLibrary.length - 1));
        bookInfo = document.createTextNode(myLibrary[myLibrary.length - 1].showInfo());        
        statusBook = document.createElement("input");
        statusBook.type = "range";
        statusBook.min = "0";
        statusBook.max = "1";
        statusBook.value = myLibrary[myLibrary.length - 1].read;
        statusBook.appendChild(document.createTextNode("Have you read it?"));
        deleteBook = document.createElement("button")
        deleteBook.type = "button";
        deleteBook.appendChild(document.createTextNode("Remove"));
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(statusBook);         
        bookCard.appendChild(deleteBook);                
        bookCards[0].appendChild(bookCard);
    }    
}

//The two following handlers purpose is to create a show/hide function
//for the formulary
document.getElementById("open-form").addEventListener("click", () => 
    document.getElementById("add-book").style.display = "block");
document.getElementById("close-form").addEventListener("click", () => 
    document.getElementById("add-book").style.display = "none");

//'Add' button
document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();    
    if (myLibrary.find(({title}) => title === "\"" + document.getElementById("title").value + "\"")) {
        alert("There is already a book with this title in the library!");
        return;
    }
    const data = new FormData(document.getElementById("book-form"));    
    let fields = [];    
    for (const entry of data.values()) {
        fields.push(entry);
    }    
    addToLibrary(fields[0], fields[1], fields[2], fields[3]); 
    displayBooks(false); 
    //Clear all text fields after pressing to add
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
})

//'Remove' button
bookCards[0].addEventListener("click", (e) => {
    if (e.target.type === "button") removeFromLibrary(e);
})

//'Read' slider
bookCards[0].addEventListener("click", (e) => {
    if (e.target.type === "range") updateStatus(e);
})





