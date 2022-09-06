console.log("Library Project Using ES6 Version");
showBooks();

// THE ONLY DIFFERENCE OF USING CLASS IS WE DON'T HAVE TO ADD THE METHODS INTO THE CONSTRUCTOR BY USING Display.prototype TO THE DISPLAY CONSTRUCTOR, WE ARE PLACING THE METHODS DIRECTLY INTO THE DISPLAY CLASS

// Here we are adding a constructor in Book class template

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// Function to display Books

function showBooks() {

    let getBooks = localStorage.getItem('notes');

    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);

    }

    let addRow = "";
    bookObj.forEach(function (element, index) {

        addRow += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
 


    });
    let tableBody = document.getElementById('tableBody');
    if (bookObj.length != 0) {
        tableBody.innerHTML = addRow;
    } else {
        tableBody.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes`;
    }
}

// Function to delete Book

function deleteBook(bookIndex) {
    let getBooks = localStorage.getItem('notes')
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }

    let bookName = bookObj[bookIndex].name;
    bookObj.splice(bookIndex, 1);

    localStorage.setItem('notes', JSON.stringify(bookObj));

    let message = document.getElementById('message');
    let boldText = 'Deleted';
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>${boldText}: </strong> The book ${bookName} has been deleted from the library
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(() => {
        message.innerHTML = "";
    }, 5000);
    showBooks();

}

// Creating an another class named Display and methods in it
class Display {
    // here we are adding the add method in Display class
    add(book) {

        let getBooks = localStorage.getItem('notes');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(getBooks);
        }

        bookObj.push(book);
        localStorage.setItem('notes', JSON.stringify(bookObj));
        showBooks();
    }

    // here we are adding another method function which is "clear"
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    // adding another function method which is "validate"
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    // adding another function method which is "show" in Display class template
    show(color, displayMessage) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                                <strong>Message:-</strong> ${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`;
        // With the help of settimeout alert banner will disappear after 2 seconds
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }
}

// Adding event listener as it is like we do in prototype method

let libraryForm = document.getElementById('libraryForm');

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {

    let name = document.getElementById("bookName").value;

    let author = document.getElementById("author").value;

    let type;



    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value
    }
    else if (programming.checked) {
        type = programming.value
    }
    else if (cooking.checked) {
        type = cooking.value
    }

    let book = new Book(name, author, type);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
    
        display.clear();

        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry! You cannot add this book');
    }

    e.preventDefault();
}