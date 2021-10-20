//Main code for the app.

//TODO: Steps 6 and 7 from TOP

//All books will be stored, as objects, inside a single array
let myLibrary = [];

//Function constructor for 'Book' objects
function Book(title, author, pages, read) {
    this.title = "\"" + title + "\"";
    this.author = author
    this.pages = pages
    this.read = read    
}
Book.prototype.showInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function removeFromLibrary(e) {
    let bookIndex = +e.target.parentElement.dataset.index; //Data attribute created in the following function
    myLibrary.splice(bookIndex, 1);
    displayBooks(true);
}

//To display saved books
//Takes one argument, indicating to show all the library or to just update (skipping the loop)
//Creates node(s) for the info, the text node from Book.prototype and button(s) node(s)
const bookCards = document.getElementsByClassName("books"); //Stores the display containter
function displayBooks(allContent) {    
    let bookCard;
    let bookInfo;
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
            deleteBook = document.createElement("button")
            deleteBook.type = "button";
            deleteBook.appendChild(document.createTextNode("Delete"));
            bookCard.appendChild(bookInfo);         
            bookCard.appendChild(deleteBook);
            bookCards[0].appendChild(bookCard);
        })
    } else {
        bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", (myLibrary.length - 1));
        bookInfo = document.createTextNode(myLibrary[myLibrary.length - 1].showInfo());
        deleteBook = document.createElement("button")
        deleteBook.type = "button";
        deleteBook.appendChild(document.createTextNode("Remove"));
        bookCard.appendChild(bookInfo);         
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
    if (e.target.type = "button") removeFromLibrary(e);
})





