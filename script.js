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
let formID = document.getElementById('post-id');
let responseP = document.getElementById('response');
let responseTitle = document.getElementById('response-title');
let responseBody = document.getElementById('response-body');
let submitButton = document.getElementById('submit-btn');
let updateButton = document.getElementById('update-btn');




submitButton.addEventListener('click', function(event){
    event.preventDefault();

    var title = formTitle.value;
    var body = formBody.value;
    
    if ((title == '' || title.trim().length == 0 || body == '' || body.trim().length == 0 )){
        alert('Do not leave post title or body empty');
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
            errorMessage.innerHTML = '';
            responseP.innerHTML = 'The following data was posted';
            responseP.removeAttribute('hidden');
            responseTitle.innerHTML = data.title;
            responseBody.innerHTML = data.body;
        }).catch(function(){errorMessage.innerHTML = 'error posting data'});
    }   
});


var url = " https://jsonplaceholder.typicode.com/posts/";

updateButton.addEventListener('click', function(event){  
    event.preventDefault();
    var title = formTitle.value;
    var body = formBody.value;
    var id = formID.value;
    if (title == '' || title.trim().length == 0 || body == '' || body.trim().length == 0 || id == '' || id.trim().length == 0){
        alert('Do not leave any section of the form empty')
    } else{
        var updateData = {};
        updateData.title = title;
        updateData.body  = body;
        var json = JSON.stringify(updateData);

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url+id, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                errorMessage.innerHTML = '';
                responseP.removeAttribute('hidden');
                responseP.innerHTML = 'The post was updated to show the following';
                responseTitle.innerHTML = res.title;
                responseBody.innerHTML = res.body;
            } else {
                errorMessage.innerHTML = 'error updating data';;
            }
        }
        xhr.send(json);
    }
    
})
