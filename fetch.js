let poemDisplay;
let div = document.getElementById('request')


function sendRequest() {
    fetch('http://localhost:3000').
    then(function (response) {
            response.text().then(
                function (text) {
                    poemDisplay.textContent = text;
                    console.log(text)
                    showText(text)
                }
            )
        }
    )
}

function showText(text) {
    div.innerHTML = text;
    div.innerHTML = `<p>I like burgers</p>`
}

sendRequest();