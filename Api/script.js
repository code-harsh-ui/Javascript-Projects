console.log('Daily News');


// Grabbing the news container
let newsAccordian = document.getElementById('newsAccordian')
console.log(newsAccordian);



// Initializing the news api parameters
let source = 'in';
let apiKey = 'cfe6186e249941bab158966357415194';
// creating an ajax get request
const xhr = new XMLHttpRequest();

// injecting the variables into the url using template literals
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apiKey}`, true);

// What to do after calling the request
xhr.onload = function () {
    if (this.status === 200) {
        // here we are getting three reponses 1. status "ok" 2. totol results "10" 3. Objects in an array "which is article"
        let json = JSON.parse(this.responseText)
        console.log(json);
        // so here we are grabbing the article "Objects in an array"
        let articles = json.articles
        // Now we have muliple objects in array in article variable
        console.log(articles);
        // Creating a blank variable so that we can inject the template in this variable
        let newsHtml = "";

        articles.forEach(function (element, index) {
            // storing the accordion template into the news variable
            let news = `<div"class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                ${index + 1}:   ${element.title}
                </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                ${element.content} <a style="text-decoration:none;" href= "${element.url}" target="_blank">Read more</a>
                </div>
                </div>
            </div>`
            // Injecting the the accordion template into newsHtml variable
            newsHtml += news;
        });
        // Now we are injecting the template into inner Html
        newsAccordian.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

// Sending the request
xhr.send();