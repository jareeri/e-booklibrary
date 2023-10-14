// books class
class Book{
    constructor(id, image, title, author, category, release_date, rating, description){
        this.id = id;
        this.image = image;
        this.title = title;
        this.author = author;
        this.category = category;
        this.release_date = release_date;
        this.rating = rating;
        this.description = description;
      }
}

// add the top rated section into home page
function addTopRated(){
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            books = json.map(function(element){
                book = new Book(element.id, element.image, element.title, element.author, element.category, element.release_date, element.rating, element.description);
                return book;
            });

            books.sort()
            topRated = books.sort(
                (b1, b2) => (b1.rating < b2.rating) ? 1 : (b1.rating > b2.rating) ? -1 : 0);

            let cards = '<ul class="cards">';
            for(i=0; i<10; i++){
                cards += `
                <li class="card top-rate" onclick="clickCard(${i},'top-rate')"></li>`;
            }
            cards += '</ul>';
            document.getElementById('top-rated').innerHTML = cards;
            printCards('top-rate', topRated);

        })
        .catch(error => console.error('Error:', error));
}

// add the new arrival section into home page
function addNewArrival(){
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => {
            books = json.map(function(element){
                book = new Book(element.id, element.image, element.title, element.author, element.category, element.release_date, element.rating, element.description);
                return book;
            });

            books.sort()
            NewArrival = books.sort(
                (b1, b2) => (b1.release_date < b2.release_date) ? 1 : (b1.release_date > b2.release_date) ? -1 : 0);

                console.log(NewArrival);
            let cards = '<ul class="cards">';
            for(i=0; i<10; i++){
                cards += `
                <li class="card newBooks" onclick="clickCard(${i},'newBooks')"></li>`;
            }
            cards += '</ul>';
            document.getElementById('new-arrival').innerHTML = cards;
            printCards('newBooks', NewArrival);
        })
        .catch(error => console.error('Error:', error));
}

// function for book details when clicked in home page
function clickCard(id, section){
    // get tag by the passed id
    // let listItems = document.getElementsByTagName('li');
    let listItems = document.querySelectorAll(`li.${section}`);
    listItems[id].setAttribute('id','clicked');

    console.log(`hello ${section}`);
    // set style to change the width
    // listItems[id].setAttribute('style','hieght: fit-content; min-width: 57%;');
    listItems.forEach(element => {
        var idAttribute = element.getAttribute("id");
        if (idAttribute && idAttribute.indexOf('clicked') !== -1) {
            element.removeAttribute('id');
        }
    });
    console.log(listItems);
    listItems[id].setAttribute('id','clicked');
    // add the new content to its document
    if(section == 'top-rate'){
        printCards(section, topRated);
    }else if(section = 'newBooks'){
        printCards(section, NewArrival);
    }else if(section == 'recommend'){
        printCards(section, recommendation);
    }
}

// function to print the card based on if it clicked or not
function printCards(section, books){
    let list = document.querySelectorAll(section);
    let listItems = document.querySelectorAll(`li.${section}`);
    console.log(section);
    let i = 0;
    listItems.forEach(item => {
        var idAttribute = item.getAttribute("id");
        console.log(idAttribute);
        if (idAttribute && idAttribute.indexOf('clicked') !== -1) {
            console.log('hi' + item);
            item.setAttribute('style','hieght: fit-content; min-width: 57%;');
            item.innerHTML = `
            <div>
                <div class = "d-flex align-items-center justify-content-center" >
                    <img src="${books[i].image}" class="card-img-top mb-3" alt="Book Cover" style="max-height: 317px; max-width: 208px;">
                    <div class = "content-container p-3">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title">Title: ${books[i].title}</h3>
                            <a href="#" style="text-decoration: none; color: black;"><i class="far fa-heart"></i></a>
                        </div>
                        <div class="card-content">
                            <p>Author: ${books[i].author}</p>
                            <p>Category: ${books[i].category}</p>
                            <p>Release Date: ${books[i].release_date}</p>
                            <p>Description: ${books[i].description}</p>
                        </div>
                    </div>
                </div>
                <p>Author: ${books[i].rating} <i class="fas fa-star" style="color: gold;"></i></p>
            </div>`;
            i++;
        }else{
            item.removeAttribute('style');
            item.innerHTML = `
                <div class = "text-center">
                    <img src="${books[i].image}" class="card-img-top mb-3" alt="Book Cover" style="height: 200px">
                    <div class = "content-container px-3">
                        <div class="d-flex justify-content-between">
                            <h3 class="card-title">Title: ${books[i].title}</h3>
                            <a href="#" style="text-decoration: none; color: black;"><i class="far fa-heart"></i></a>
                        </div>
                        <div class="card-content">
                            <p>Author: ${books[i].author}</p>
                        </div>
                    </div>
                </div>`;
            i++;
        }
    })
}

let books = [];
let topRated = [];
let NewArrival =[];
let recommendation =[];
addTopRated();
addNewArrival();