console.log('Magical Notes');


// Previously when we reload the page all the notes disapper from webpage so if we want our notes to be displayed even if we reload it we use showNotes function here on top


showNotes();

// First we grabbed the add button from html using element selector

let addBtn = document.getElementById('addBtn');
// And then apply a click event listener into that button
addBtn.addEventListener('click', function (e) {

    // And in event listener we have defined the work of function here
    // first we grabbed the text area using its id into addTxt variable
    let addTxt = document.getElementById('addTxt');


    // then we grabbed the notes from local storage into notes variable

    // localStorage.setItem('notes', 'My name is harsh jha'); // for better understanding we set the value of notes in local storage here 

    // localStorage.clear();   // This command will help to clear the local storage

    let notes = localStorage.getItem('notes');  // but right now there is nothing like notes in local storage "null"

    // (Code for testing)
    // it will console the value of notes which is my name is harsh jha
    // console.log(notes) 

    // then we use if-else condition in event listener function stating that if notes have no any value in local storage please store empty array in notesObj variable 
    if (notes == null) {
          // here we have created a notesObj variable without using let or const if we remove if else statement from here if get an error in console that notesObj is not defined 
        notesObj = [];
        // console.log(notesObj); 
    }

    // and if notes in have any value which meanns any string in local storage please parse 
    else {
        notesObj = JSON.parse(notes); // it will convert the lookalike array into an actual array and stored it into notesObj variable
        console.log(notesObj);  
    }

    notesObj.push(addTxt.value);  // it means if we type anything in textarea the value will be pushed into notesObj variable here, means the value is stored in this notesObj

    // And the value which is typed in textarea stored into notesObj variable that value will be set for notes key in local storage with the help of localStorage.setItem

    // Now we are setting the value of notes in local storage so that else condition will apply and pasre this string into an array

    // we cannot just put notesObj we must need to convert it. With the help of jason.stringigy only then it will set the value for notes in local storage
    // JSON.stringify will return a lookalike array but actually it is a string

    // As we know we have a value stored in notesObj with the help of "push" so we are stringifying that value and putting that lookalike string into notes in local storage

    // !Important - Here we have set the notes in local storage
    localStorage.setItem('notes', JSON.stringify(notesObj));

    // it is used to clear the textarea after we push the value into notesObj 
    addTxt.value = "";
    console.log(notesObj);

    // calling the function "showNotes" here 
    showNotes();
});

// We used showNotses function to display our card in webpage

// Function to show elements from local Storage - it will read all the elements from local storage and display it into the webpage

// Similarly we create a function for card addition it means if we click on add button both event listener and show function will run simlutaneouly and add a card below textarea 

function showNotes() {

    let notes = localStorage.getItem('notes');
    console.log(notes);


    if (notes == null) {
        notesObj = [];
        console.log(notesObj); 
    }

    // and if notes have any value which meanns any string in local storage please parse 
    else {

        //(((((((((((( !! important = now we have an array stored into notesObj )))))))))))))))))))
        notesObj = JSON.parse(notes); // it will convert the lookalike array into an actual array
        console.log(notesObj);  
    }

    // creating a variable name html and putting into template literal
    // a blank string in variable name html
    let html = '';


    // ------------------------------------------------------------------------------
    // Example of simple foreach loop 

    // !! Important foreach loop is a loop which runs each element in array in order one by one 

    // These are the values that will return in console for element, index and array

    // element = 3, 5, 6, 34, 76
    // index = 0, 1, 2, 3, 4
    // array = [3, 5, 6, 34, 76]; x 5

    // let arr = [3, 5, 6, 34, 76];

    // arr.forEach(function (arrayNumbers, index, array) {
    //     console.log(arrayNumbers, index, array);
    // });

    // or we can create function outside from loop and call the function in foreach loop 

    // arr.forEach(loop);   // giving the function name "loop"

    // The first parameter in function is for element second for index and third for an array we can use any name for parameters but the order of element, index and array in function is same

    // function loop(aary, dfdf, sfdfd) {
    //     console.log(dfdf, aary, sfdfd);

    // }

    // This loop is used to iterate html for cards  !! Important
    // let friendsNew = ['Jarry', 'Peter', 'Kyle', 'Jeremy', 'Emma'];
    // friendsNew.forEach(function (element) {
    //     console.log("Hello friends " + element);
    // })

    //------------------------------------------------------------------------------

    // With the help of forEach loop we can print the card again and again
    // Converting the html string into array using forEach Loop !! Important

    // due to json.parse in else statement we have an array stored into notesObj that is why we are iterating this array with the help of forEach loop 

    // Watch yahoo baba tutorial on youtube for more clarification of forEach Loop
    //------------------------------------------------------------------------------------------------

    // if we type i am harsh jha in textarea we know it will stored in noteObj variable like this if we console that value we get 0: i am harsh jha  >> 0 in index and i am harsh jha is a element

    // thats how we use forEach loop to iterate these value in html

    //-----------------------------------------------------------------------------------------------



    // we have stored various strings in an array(notesObj) in notesObj variable ['i am harsh', 'this is harsh', 'yellow', bill] we use foreach loop to iterate the strings element one by one



    // Here we have an parsed array "hi this is harsh" stored in notesObj and we are running foreach loop to iterate this parsed array so we get "hi this is harsh" in element and 0 its index
    notesObj.forEach(function (element, index) {
        // both will increment the number by 1
        // a += 1;
        // a++;

        // console.log(element, index); 

        // index + 1 will prevent the index starting from 0 as we know from previous js tutorials 

        // here html += means it will add the cards into html again without replacing the previous one

        // here we called the function on button means if anyone click on the delete note button the below function name deleteNote should be called (Onclick = "deleteNote") in Html 

        // And giving the id index
        html += `  <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note Demo ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
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
        notesElem.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes`
    }
}

// Function to delete a note

// In Template literal we used this.id because it uses the recent id "index(0,1,2 and so on)" for that whole element(button) which means if we click on 0 index card the id of button became 0 and if we click on 1 index card the id of button changed into 1



// we are getting only index because in template literal (in forEach loop for element, index and array) we gave button id as index with dollar sign to retrive index from from forEach loop function. If we change it to element we get the element of that particular card in webpage

// deleteNote function is created for onclick button in template literals

// This function will called when we click on delete note button 

function deleteNote(index) {
    console.log('i am deleting', index);

    let notes = localStorage.getItem('notes');
    // console.log(notes); 

    if (notes == null) {
        notesObj = [];
        // console.log(notesObj); 
    }

    // and if notes have any value which meanns any array in local storage please parse into notesObj
    else {

        //(((((((((((( !! important = now we have an array stored into notesObj )))))))))))))))))))
        notesObj = JSON.parse(notes); // it will convert the lookalike array into an actual array
        // console.log(notesObj);  
    }

    // splice is used when we want to remove multiple elements from an array 
    // marks.splice(1, 3);  //it means start from 1 position and remove 3 elements from an array
    // console.log(marks);

    // here the value of index is 0 because we retrieve the value in (index) parameter in upper  deleteNote function from button id in template literal and as we know splice removes element from an array so it starts from 0 and remove one element
    notesObj.splice(index, 1); 
    // if we don't convert into array we are unable to splice the element of template literal using its index 

    // And here we are setting the updated value of notesObj after splicing into notes in localStorage
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}





