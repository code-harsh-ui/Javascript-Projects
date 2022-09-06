console.log('CV Screener in Javascript');

// Data is an arrays of objects which contain information about the candidates

const data = [
    {
        name: 'Rohan Das',
        age: 18,
        city: 'Kolkata',
        language: 'Python',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
        name: 'Pulkit',
        age: 28,
        city: 'Jaipur',
        language: 'Javascript',
        framework: 'React',
        image: 'https://randomuser.me/api/portraits/men/76.jpg'
    },
    {
        name: 'Himanshi',
        age: 38,
        city: 'Banglore',
        language: 'Php',
        framework: 'Codeigniter',
        image: 'https://randomuser.me/api/portraits/women/77.jpg'
    },
    {
        name: 'Deepank',
        age: 29,
        city: 'Mumbai',
        language: 'C++',
        framework: 'Angular',
        image: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    {
        name: 'Gulshan',
        age: 45,
        city: 'Bihar',
        language: 'Go',
        framework: 'Vue',
        image: 'https://randomuser.me/api/portraits/men/79.jpg'
    }
]

console.log(data.length); // length is 5



// Creating an iterator to iterate the arrays of object in data

function cvIterator(profiles){
    console.log(profiles);
    console.log(profiles.length);
    console.log(profiles[2]); // profiles is an array and on index 2 we have an object
    let nextIndex = 0;
    return{
        next: function(){
            // Using ternary operator here as we know we can use ternary in console or return directly without using if statment

            // In ternary operator we are saying that if nextIndex value is less than profiles.length return an object "{value: profiles[nextIndex++],done:false}:" otherwise return "{done:true}"

            return nextIndex<profiles.length ? // here the profiles length is 5 
            // Using ternary operator we are saying if nextIndex is smaller than 5 run the iterator
            // by using array indexing method array[0] , array[1] and so on. We have an object on each index in data array
            {value: profiles[nextIndex++],done:false}:  // 
            // and if nextIndex length exceeds than 5 it means we don't have left any object left in data array to iterate so return done:true
            {done: true}
        }
    };
};

// Calling the iterator and sending the sample arrays which is stored "data" variable into the iterator function parameter "profiles"
let candidates = cvIterator(data);

nextCv(); // Calling the function here so that our template will not left blanked at first

// Event listener for Next button
const next = document.getElementById('next');
next.addEventListener('click', nextCv);


function nextCv(){
    // Going through to each and every object value one by one by using next() method of iterator
    // first object value in data array= {name: 'Rohan Das', age: 18, city: 'Kolkata', language: 'Python', framework: 'Django', …} and so one after every click on next button using next function
    const currentCandidate = candidates.next().value  // visit iterator tutorial for more clarifi..
    console.log(currentCandidate); // An object will stored in currentCandidate with each itera..
    let image = document.getElementById('image');
    let profile = document.getElementById('profile');
    if(currentCandidate != undefined){
    // Injecting the image in "div" id "image"  

    // So as we know we can fetch the properties of object like this object.lastname
    // console.log(data[0].name); // example "Rohan Das from array"

    image.innerHTML =`<img src = '${currentCandidate.image}'>`

    profile.innerHTML = `<ul class="list-group">
    <li class="list-group-item">Name: ${currentCandidate.name}.</li>
    <li class="list-group-item">${currentCandidate.age} Years Old.</li>
    <li class="list-group-item">Lives in ${currentCandidate.city}.</li>
    <li class="list-group-item">Primarily works on ${currentCandidate.language}.</li>
    <li class="list-group-item">With ${currentCandidate.framework} framework.</li>

  </ul>`}
        else{
            alert('End of candidate applications')
            // when the application is completed window will reload
            window.location.reload();
        }
}
