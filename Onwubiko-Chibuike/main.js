let apikeys = '7293043e37d649e28cd3848e276a7d3e';
let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=ng&'+
            'apiKey='+apikeys;
let req = new Request(url);

let input = document.querySelectorAll('.news');
let image = document.querySelectorAll('img');


function validateAndReturnResponse(res) {
    if(!res.ok) {
        throw error(res.statusText);
    }
    return res.json();
}

function displayOutput(output) {
    for (let i = 0; i < input.length; i++) {
        input[i].textContent = output.articles[i].title;
        input[i].href = output.articles[i].url;
        image[i].src = output.articles[i].urlToImage;
        console.log(output.articles[i]);
    }
}

function displaySearchOutput(output) {
    //document.querySelector('main').style.display = 'grid';
    for (let i = 0; i < output.articles.length; i++) {
        if(i != 10 || i <= output.articles.length) {
            let searchResult = document.createElement('div');
            let a = document.createElement('a');
            let p = document.createElement('p');
            let searchResultLink = searchResult.appendChild(a);
            let searchResultContent = searchResult.appendChild(p);
            searchResultLink.textContent = output.articles[i].title;
            searchResultLink.href = output.articles[i].url;
            searchResultContent.textContent = output.articles[i].content;
            console.log(output.articles[i],  searchResultLink.href, searchResultContent.textContent );
            document.querySelector('main').appendChild(searchResult);
        }
    }
    return;
}

function catchError(error) {
    console.log('looks like there was a problem: \n' + error );
}

function makeRequest(req) {
    fetch(req)
    .then(validateAndReturnResponse)
    .then(displayOutput)
    .catch(catchError)
}

makeRequest(req);

//Search scipt

window.addEventListener('DOMContentLoaded', getSearch);

function getSearch() {
    //let getSearchResult = document.querySelectorAll('search');
    let getSearchResult = document.getElementById('form');
    getSearchResult.addEventListener('click', makeSearchRequest);
}


function makeSearchRequest(e) {
    e.preventDefault();
    //document.querySelector('main').style.display = 'none';
    let search = document.getElementById("search").value;
    
        let formData = new FormData(document.getElementById('form')); 
 
        var data = new URLSearchParams();
        for (let pair of formData) {
            data.append(pair[0],pair[1]);
        }
    
        data.append('apikey', apikeys);
        data.toString();

        let searchUrl = 'https://newsapi.org/v2/top-headlines?' +
                          data;

        let request = new Request(searchUrl, {
            method: 'GET',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        });
        fetch(request)
        .then(validateAndReturnResponse)
        .then(displaySearchOutput)
        .catch(catchError)
        //return makeRequest(request);
        return;
        //document.getElementById('form').value = '';
        //document.getElementById('search').value = '';
    //}
}


 


