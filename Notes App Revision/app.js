console.log('Notes App Revision');

// firstly we are grabbing the add button from its id then we will add click event listener to the button which have id 'addbtn' in html page
// Previously when we reload the page all the notes disapper from webpage so if we want our notes to be displayed even if we reload it we use showNotes function here on top
showNotes();


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    // here we are grabbing the text area from html using its id "addtxt" variable so that we can manupulate the textarea in javascript
    let addTxt = document.getElementById("addTxt");

    // And grabbing the notes from localStorage into the notes variable so that we can use notes variable for further process in js
    let notes = localStorage.getItem("notes");

    // ----------------- For Better understanding of how if else works with notesObj ------------- 


    // localStorage.setItem("notes", "my name is harsh"); 

    // localStorage.clear(); 

    // here we state that if notes in local Storage is null then store an array with the value of 1 in notesObj variable and console it or if notes in localstroage is not empty then store an array with the value of 3 into another noteObj variable which is in else statement and console it

    // note:- notesObj is a variable which contains array and this if else statement is stating that if notes is null then store an empty an array in notesObj variable or if notes is not null then store a parsed array in notesObj variable (in this scenario the notesObj variable stores only one statement at a time which means if the first statement is true then notesObj become empty according to our first statement and if else statement is true then notesObj holds a parsed array according to our second statement)


    if (notes == null) {
        // here we have created a notesObj variable in which we are storing arrays without using let or const if we remove if else statement from here if get an error in console that notesObj is not defined 
        notesObj = [];
        // notesObj = [1];
        console.log(notesObj);
    }
    else {
        // JSON.parse will retrive the notes value stored in localStorage previoulsy 
        notesObj = JSON.parse(notes);
        // notesObj = [3]; 
        // notesObj = ["Harsh"]; 
        console.log(notesObj);
    }
    console.log(notesObj) // consoling here to know the code flow
    notesObj.push(addTxt.value); // it means if we type anything in textarea the value or text will be pushed or add in notesObj variable example:- notesObj already stored an empty array brackets if we push anything in notesObj variable the value is pushed into an empty array like this ["hello"]

    // and

    // for else condition first notesObj stored the value of notes with the help of json.parse and concatenate the value after push example:- notes already stores an array "i am harsh" so i will be stored in notesObj variable using parse method after that we pushed another array into notesObj so it will concatenate both the arrays 'previous and latest' like this "i am harsh", "this is harsh"


    console.log(notesObj) // again consoling here to know the code flow

    // as we know after pushing hello in notesObj variable notesObj variable becomes ["hello"] and with the help of localStorage.setItem we are setting the value of notes - ["hello"] with the help of notesObj variable using stringify method

    // localStorage.setItem('notes', 'notesObj'); //we can do this to but it through an error and set the notes key value "notesObj" as we know form localStorage tutorial
    localStorage.setItem('notes', JSON.stringify(notesObj));


    console.log(notes);   //1 
    console.log(notesObj); //2 consoling here to know the code flow
    // it means after click make the textarea blank again 
    // addTxt.value = "hello";
    addTxt.value = "";  // empty

     // The reason of calling this function here because the notes in localstorage is not updated in the start we put this function after when notes in localstorage in updated

    // !Important - As per rule the function will not work untill we call that function that is why we put this function here so that firstly the upper methods of this clickevent function will do its job then we call showNotes function to perform the tasks which is defined in showNotes function

    showNotes();



})

// we are using this function to display notes in localStorage in our html page 
function showNotes() {
    // It will fetch all the previous notes data which is stored in local storage into the notes variable
    let notes = localStorage.getItem('notes');
    // console.log(notes);

    // previously the we use loop for clickEvent and now we are using loop again for the showNotes function 
    if (notes == null) {
        notesObj = [];
        // console.log(notesObj);
    }

    // and if notes have any value which meanns any string in local storage please parse 
    else {

        //(((((((((((( !! important = now we have an array stored into notesObj )))))))))))))))))))
        notesObj = JSON.parse(notes); // it will convert the lookalike array into an actual array
        // console.log(notesObj);
        // console.log(notes);
    }
    // creating a blank variable name html so that we can insert the cards in this blank string

    let html = '';
    notesObj.forEach(function (element, cardIndex) {
        // here html += means it will add the cards into html again without replacing the previous one 
        // In Button we used cardIndex as an id which becomes 0,1,2 and so on with every iteration because cardIndex is a parameter of forEach loop
        // and we use onclick which means if we click on this button it will call or run the function deleteNote
        // !Important - when we call deleteNote function we used this.id  which means we are passing the value of button id for cardIndexxx parameter as an argument into deleteNote function 
        // this.id is used to grab the current value of button id which will change after every iteration 
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Note ${cardIndex + 1}</h5>
                     <p class="card-text">${element}</p>
                     <button id="${cardIndex}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                  </div>
                 </div>`
    });

    // This line of code used to display message when we don't have any notes or to display the notes from html
    //!!important (((NOW WE ARE GRABBING NOTES FROM HTML PAGE NOT FROM LOCAL STORAGE)))
    // grabbing the div which have id = 'notes' in index.html  
    let notesElem = document.getElementById('notes');
    // if notesObj.length is not equal to zero print the html card 
    // It means if notesObj length have any value in it, it will print the html card
    if (notesObj.length != 0) {

        // getting that html variable from template literal 
        notesElem.innerHTML = html;
    }
    // else if notesObj.length is equal to zero then print this innerHTMl
    else {
        notesElem.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes`;
    }
}

// here we are retrieving the value of button id as an argument in cardIndexxx parameter

// This function will called when we click on delete note button

function deleteNote(cardIndexxx) {

    // console.log(cardIndexxx);

    // console.log(notesObj)

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
        // console.log(notesObj);
    }
    else {
        notesObj = JSON.parse(notes);
        // console.log(notesObj);
    }

    // splice is used when we want to remove multiple elements from an array 
    // let marks = (1,3,4,6,6,7,7,7,8);
    // marks.splice(1, 3);  //it means start from 1 position and remove 3 elements from an array
    // console.log(marks);

    // here the value of index is 0 because we retrieve the value in (cardIndexxx) parameter in upper  deleteNote function from button id in template literal and as we know splice removes element from an array so it starts from 0 and remove one element
    notesObj.splice(cardIndexxx, 1);
    // if we don't convert into array we are unable to splice the element of template literal using its index because indexing method works only in array
    // console.log(notesObj)

    // And here we are setting the updated value of notesObj after splicing into notes in localStorage
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}

// Filter 
// For filtering we have grabbed the search input using its id searchTxt into search variable

let search = document.getElementById('searchTxt');
// Adding event listener to search input box
// In this event listener we are using input event it means if we type anything into the input the event will fire
search.addEventListener("input", function () {
    //taking the input value into the inputVal variable
    // toLowerCase function is used to convert uppercase text into lowercase text here it says if we type any capital letter in search it will convert it into lowercase means small letter so that we match to cardTxt variable value
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired!', inputVal);
    // here we have grabbed all the cards present in our html using its class name noteCard and the set of code is present in template literal inserted using javascript
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(noteCards);
    // here we are running forEach loop for the cards as we know we can't run the loop directly into html collection if we do we get only div's not the inner content so first we have to convert it into an array (Array.from) only then we can run the loop to get all the cards with inner content one by one 

    // This loop is used to iterate html for cards  !! Important
    // let friendsNew = ['Jarry', 'Peter', 'Kyle', 'Jeremy', 'Emma'];
    // friendsNew.forEach(function (element, index) {
    //     console.log("Hello friends " + element + index);
    // })


    // !! Important = Same thing we do for cards like we do in forEach loop for elements 
    Array.from(noteCards).forEach(function (element) {
        // console.log(element);
        // Here we are grabing the paragraphs from element
        // In this case we have only one paragraph tag in noteCard div that is why we use [0] index to grab the first paragraph from the div but if we have multiple paragraphs we can grab them by uisng indexing method
        // So now we have all the content of paragraph stored into cardTxt variable

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // Its very important to grab the innertext of paragraph only then include function will work because include function matches the texts only in text format not the text which is in div
        // console.log(cardTxt);

        //------------------------ includes()---------------------------------

        // for more clarification on includes function check this link - https://www.youtube.com/watch?v=fsfFAe5fhpc&ab_channel=YahooBaba

        // includes function is used to check whether the search text present in the array or not
        // Example :- 
        // let a = element.getElementsByTagName('p')[0].innerText;
        //    console.log(a);
        //    let b = a.includes("f");
        //    console.log(b)// --- Result in console will be true because in the upper paragraph f exists
        //            let b = a.includes("Sanjay");
        //                console.log(b) --- Result in console will be false because in the upper paragraph Sanjay doesn't exist
        // !Important note:- includes function is a case sensitive means the function matches the exact same value not capital or small letter difference that is why we used toLowerCase function in inputVal
        // ---------------------------------------------------------------------

        // so here the inlcudes function will match the texts of paragraph which is stored in cardTxt variable to the input element value which is stored in inputVal variable
        if (cardTxt.includes(inputVal)) {
            // here this is the element of forEach loop to display cards 
            element.style.display = 'block';
        }
        else {
            // And here we use the element to hide the card element
            element.style.display = 'none';
        }
    })

})






