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

function displayData(data) {
    const title = document.getElementById('title');
    const body = document.getElementById('body');

    title.innerHTML = data.title;
    body.innerHTML = data.body;
}