console.log('Notes App Revision');


// showNotes();


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    // here we are grabbing the element which have id "addTitle" same as we do for addTxt
    let addTitle = document.getElementById("addTitle");

    let notes = localStorage.getItem("notes");

    // !!Important = The reason why we are putting the object into the blank array is because we cannot retrieve the object length directly like this
    /*

    a = {
    name: "Harsh",
    class: 'six',
    channel: "codewithharsh"
    };
    console.log(a.length); // it says undefined

    // So to do this we use square brackets to put the object into the array like this

    a = [{
    name: "Harsh",
    class: 'six',
    channel: "codewithharsh"
    }];
    console.log(a.length);  // Now we get the length which is 1
    
    */


    if (notes == null) {
        notesObj = [];
        console.log(notesObj);
    }
    else {
        notesObj = JSON.parse(notes);
        console.log(notesObj);
    }

    // creating an object name myObj 
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    // console.log(myObj);
    // Note:- Here we are pushing the object into blank array notesObj it will display in console like this [{…}]
    // Now notesObj is array of objects 
    notesObj.push(myObj);

    // console.log(notesObj);

    localStorage.setItem('notes', JSON.stringify(notesObj));

    addTxt.value = "";
    // 
    addTitle.value = "";

    // The reason of calling this function here because the notes in localstorage is not updated in the start we put this function after when notes in localstorage in updated

    // !Important - As per rule the function will not work untill we call that function that is why we put this function here so that firstly the upper methods of this clickevent function will do its job then we call showNotes function to perform the tasks which is defined in showNotes function

    showNotes();



})

//----------------- EXAMPLE OF USING FOREACH LOOP IN OBJECT -----------------
// 

// In this object name, salary, channel are keys called keys and Harsh, 2, code with harsh are its values and both are called key value pair 
/*
    let employee = {
        name: 'Harsh',
        salary: 2,
        channel: "code with harsh"
    }
    let employee2 = {
        name: 'Tom',
        salary: 5,
        channel: "code with tom"
    }

    notesObj = [];
    // pushing both objects in notesObj variable
    notesObj.push(employee,employee2);
    console.log(notesObj);
    // here the element of this function is {name: 'Harsh', salary: 2, channel: 'code with harsh'} in first iteration and the index is 0

    // Similarly the element of this function is {name: 'Tom', salary: 5, channel: 'code with tom'}in second iteration and the index is 1
    notesObj.forEach(function(element,index){
        console.log(`My name is ${element.name} and my salary is ${element.salary} and my channel is ${element.channel}`);
        console.log(index);
        console.log(element);
    })

*/

function showNotes() {
    // It will fetch all the previous notes which is stored in local storage into the notes variable
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }

    else {

        notesObj = JSON.parse(notes);
    }

    let html = '';

    // Right now an Object stroed in nottsObj variable that is why with the help of forEach loop we are grabbing the element and index like this element.title and element.text like we do in object for grabbing the value with the help of their key name
    notesObj.forEach(function (element, cardIndex) {
        // In this template literal here the element is myObj and we are retrieving its value by using its key grabbing method
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${cardIndex + 1}. ${element.title}</h5>
                     <p class="card-text">${element.text}</p>
                     <button id="${cardIndex}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                  </div>
                 </div>`
        // Obtaining the object keys in console
        console.log(element);
        console.log(element.title);
        console.log(element.text);
    });

    console.log(notesObj);


    let notesElem = document.getElementById('notes');

    // !!Important = The reason why we are putting the object into the blank array is because we cannot retrieve the object length directly like this
    /*

    a = {
    name: "Harsh",
    class: 'six',
    channel: "codewithharsh"
    };
    console.log(a.length); // it says undefined

    // So to do this we use square brackets to put the object into the array like this

    a = [{
    name: "Harsh",
    class: 'six',
    channel: "codewithharsh"
    }];
    console.log(a.length);  // Now we get the length which is 1
    
    */
    if (notesObj.length != 0) {

        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes`
    }
}


function deleteNote(cardIndexxx) {

    console.log(cardIndexxx);

    console.log(notesObj)

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    notesObj.splice(cardIndexxx, 1);
    console.log(notesObj)


    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();

}


let search = document.getElementById('searchTxt');

search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    console.log('input event fired!', inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    console.log(noteCards);

    Array.from(noteCards).forEach(function (element) {
        console.log(element);

        let cardTxt = element.getElementsByTagName('p')[0].innerText;

        console.log(cardTxt);


        if (cardTxt.includes(inputVal)) {

            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })

})


