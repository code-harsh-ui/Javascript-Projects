console.log("My Library");

// Folow this link for reference https://www.youtube.com/watch?v=l6i8RDrhcqM&t=718s&ab_channel=CodeWithHarry
showBooks();
// Creating a constructor for book object
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}


// Display Constructor
function Display() {

}

// Show Books in the table
function showBooks() {
    // It will fetch all the previous notes which is stored in local storage into the getBooks variable
    let getBooks = localStorage.getItem('notes');
    // console.log(getBooks);
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
        // console.log(bookObj);
    } else {
        bookObj = JSON.parse(getBooks);
        // console.log(bookObj)
    }
    // console.log(bookObj)

    let addRow = "";
    bookObj.forEach(function (element, index) {
        // Adding a Delete Book button and Calling the deleteBook function here in template literals
        // !Important - when we call deleteBook function we used this.id  which means we are passing the value of button id for bookIndex parameter as an argument into deleteBook function 

        // here we are setting the index value as an id of button which we are getting from forEach function parameter

        // this.id - it means fetch the value of id of this element (button).

        // !Important: because of onclick we are getting the particular index element it means if click on 2 index element the index in button id becomes 2
        addRow += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
                  </tr>`;
        console.log(element);
        console.log(index);


    });
    let tableBody = document.getElementById('tableBody');
    // console.log(bookObj);
    if (bookObj.length != 0) {
        tableBody.innerHTML = addRow;
    } else {
        tableBody.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes`;
    }
}

// Delete Book from the table

function deleteBook(bookIndex) {
    // Exmple: Here we have two element first is on 0 index and second is on 1 index and total length of bookObj is 2 because it consists two objects

    // 0: {name: 'Harsh', author: 'Panner Butter Masala', type: 'Fiction'}
    // 1: {name: 'Harry Potter', author: 'J.k.Rowlings', type: 'Fiction'}
    // length: 2
    console.log(bookIndex);
    let getBooks = localStorage.getItem('notes')
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
        // console.log(bookObj);
    } else {
        bookObj = JSON.parse(getBooks);
        // console.log(bookObj)
    }

// Example:-
// we have book object 0: {name: 'Tom and Jerry', author: 'Harsh Jha', type: 'Fiction'} to achieve the particular bookObj we use bookIndex here it is "0" by this we get the name property of that bookObj which is tom here in this case

    let bookName = bookObj[bookIndex].name;
    console.log(bookIndex);
    console.log(bookObj);
    console.log(bookName);

    // here the value of index is 0 because we retrieve the value in (bookIndex) parameter in upper  deleteNote function from button id in template literal and as we know splice removes element from an array so it starts from 0 and remove one element
    bookObj.splice(bookIndex, 1);

    // And here we are setting the updated value of notesObj after splicing into notes in localStorage
    localStorage.setItem('notes', JSON.stringify(bookObj));

    // And here we are grabbing the message bar to show the message after deletion with the help of templete literal
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


// !!Important --------------------------------------------------

// go through prototype object tutorial in js bootcamp to know How book argument is passing in function of display method

// --------------------------------------------------------------

// Adding methods in Display constructor

// The first method is add method which we are inserting in Display constructor lies on line no. 14

// !Important = When we click on button to submit, the event will fire and in that event we have described in if statment that if validate function will return true call the add function method which is the property of Display constructor 

// And by this the add function method will do its job of pushing the book object in localstorage and calling the another function showBooks to do their job simultaneously

// here we are receiving the book object variable in function parameter

Display.prototype.add = function (book) {

    let getBooks = localStorage.getItem('notes');
    if (getBooks == null) {
        bookObj = [];
        // console.log(bookObj);
    }
    else {
        bookObj = JSON.parse(getBooks);
        // console.log(bookObj);
    }
    // console.log(bookObj)
    // Here we are pushing the book object from parameter into bookObj variable
    bookObj.push(book);
    // console.log(bookObj)
    localStorage.setItem('notes', JSON.stringify(bookObj));
    // console.log(getBooks);
    // console.log(bookObj);
    // The reason of calling this function here because the notes in localstorage is not updated in the start we put this function after when notes in localstorage in updated

    // !Important - As per rule the function will not work untill we call that function that is why we put this function here so that firstly the upper methods of this function will do its job then we call this function to perform the tasks which is defined in showBooks function
    showBooks();


}

// The second function method is clear method which we are inserting in Display constructor lies on line no. 14
Display.prototype.clear = function () {
    // Grabbing the form using its id
    let libraryForm = document.getElementById('libraryForm');
    // And using the reset property to clear the form after click
    libraryForm.reset();
}

// Here we are creating validate method function for display construtor

// Here book is an object in this function which is stored in book variable that is why we are using book.name and book.author in if-else statement
// console.log(book); 
Display.prototype.validate = function (book) {
    // console.log(book.name.length);
    // In this statement we are saying that if book.name length is less than 2 or book.author length is less than 2 then execute the if statement otherwise run the else statement
    if (book.name.length < 2 || book.author.length < 2) {
        // if book.name and author length is less that 2 then return false otherwise return true
        return false;
    }
    else {
        return true;
    }
}

// Here we are creating show method function for display constructor

Display.prototype.show = function (color, displayMessage) {
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

// Adding submit event listener to library form so that when we click on add button all the functions and methods will run simultaneously and will show the result on the page.

// Here we are grabbing the form which have id libraryForm
let libraryForm = document.getElementById('libraryForm');
// Adding the "submit" event listener in the form 
// The reason of grabbing form not the button is when we have any button inputs present in form the default behaviour of that button is to submit the form
libraryForm.addEventListener('submit', libraryFormSubmit);

// If we have any button in form the default behaviour of that button is to submit the form instantly, to prevent that behaviour we use preventDefault function which is the property of e object in event listener

// here e is called event object generally we use event object to fetch the information about that event which we have used
function libraryFormSubmit(e) {

    // console.log(e, 'yes, You have submitted the library form')
    // Grabbing the value of inputs by its id from html into the variables "name" and "author"

    // for argument "name"
    let name = document.getElementById("bookName").value;
    // for argument "author"
    let author = document.getElementById("author").value;
    // for argument "type"
    let type;


    // And for radio button we've grabbed all the inputs by id which have type radio
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    // Here we are saying that if the radio button id "fiction" is checked store the fiction input value (mention in input tag value = "Fiction") in "type" variable similarly if the input radio button id "programming" is checked store the programming input value (mention in input tag value = "Programming") in "type" variable and so for cooking too
    if (fiction.checked) {
        type = fiction.value
    }
    else if (programming.checked) {
        type = programming.value
    }
    else if (cooking.checked) {
        type = cooking.value
    }
    // console.log(type); 

    // ! Important:- Here we have created the new Book object with the help of "Book" constructor which lies on line no. 4
    // And passing the parameters name, author, type into the Book constructor
    let book = new Book(name, author, type);
    // console.log(book);
    // console.log(book.name.length);
    // console.log(book.author.length);

    // Here we have created new Display object with the help of "Display" constructor which lies on line no. 14 ! Important
    let display = new Display();

    // console.log(display);


    // !! Important - here book is an object stored in book variable which we are passing as an argument in validate & add methods

    // Here we are checking the condition if display.validate returns true or false it means that the display variable is defined or not if display is defined then run the if statement and if display is not defined then run the else statement

    // !Important :- And the boolean value true and false is provided by validate function method
    if (display.validate(book)) {

        // Here we are calling the add method which is in Display constructor added by using prototype method and passing the (book object which is stored in "book" variable as an argument) into the add method
        display.add(book);
        // Similarly we are adding the another method "clear" in Display constructor and calling it here with the help of display object.clear() method which lies in the Display constructor 
        display.clear();
        // adding the third method in display constructor named "show"

        // success and danger is a bootstrap functionality to change color of alert tab in green for success and red for danger and here we are passing it into color parameter in show method function as an argument
        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry! You cannot add this book');
    }

    // here we are consoling the display object to check wherther our new prototypes "add" and "clear" is added in display object or not
    // console.log(display); 


    // e object have a predefined property preventDefault(); which helps us to prevent submitting the form automatically
    e.preventDefault();
}


