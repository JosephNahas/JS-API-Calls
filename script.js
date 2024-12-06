let errorMessage = document.getElementById('error-msg');


document.getElementById('fetch').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                errorMessage.innerHTML = 'no network response';
            }
            return response.json();
        })
        .then(data => {
            errorMessage.innerHTML = '';
            displayData(data);
        })
        .catch(function(){errorMessage.innerHTML = 'error fetching data'});
});

document.getElementById('xhr').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { 
            if (xhr.status === 200) { 
                const data = JSON.parse(xhr.responseText);
                displayData(data);
            } else {
                errorMessage.innerHTML = 'error fetching data';
            }
        }
    };

    xhr.send();
});

function displayData(data) {
    const title = document.getElementById('title');
    const body = document.getElementById('body');

    title.innerHTML = data.title;
    body.innerHTML = data.body;
}

let postForm = document.getElementById('form');
let formTitle = document.getElementById('post-title');
let formBody = document.getElementById('post-body');
let responseP = document.getElementById('response');
let responseTitle = document.getElementById('response-title');
let responseBody = document.getElementById('response-body');

postForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    var title = formTitle.value;
    var body = formBody.value;

    if ((title == '' || title.trim().length == 0 || body == '' || body.trim().length == 0 )){
        alert('Do not leave any section of the post empty');
    } else{
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title:title,
                body:body,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(function(response){
        return response.json()})
        .then(function(data){
            console.log(data);
            errorMessage.innerHTML = '';
            responseP.removeAttribute('hidden');
            responseTitle.innerHTML = data.title;
            responseBody.innerHTML = data.body;
        }).catch(function(){errorMessage.innerHTML = 'error posting data'});
    }   
});