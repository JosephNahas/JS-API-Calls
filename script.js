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
            displayData(data);
        })
        .catch(error => errorMessage.innerHTML = 'error fetching data');
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