// let poemDisplay;
'use strict'

// let div = document.getElementById('request')
// let url = 'http://localhost:3000/about'
//
//  function sendRequest() {
//     let response =  fetch(url)
//
//     if (response.ok) {
//         let text = response.text();
//         console.log(text);
//     } else {
//         alert('Oops. Error occurred:' + response.status);
//     }
// }
//
// sendRequest();

// function sendGithubReq() {
//     fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//         .then(response => response.json())
//         .then(commits => console.log(commits[0].author.login));
// }

// sendGithubReq();

const jsonUrl = 'https://jsonplaceholder.typicode.com/posts/';

function sendJsonReq(method) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(jsonUrl, {
        method: method,
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then(err => {
            const e = new Error('Oops. Smth wrong')
            e.data = err;
            throw e;
        })
    }
    )
}
sendJsonReq('GET', jsonUrl).then(data => {
    console.log(data);
    parseRowName(data);
    createTable();
    addJsonData(data)
}).
    then(err=> console.log(err))


const body = {
    name: 'Daria',
    age: 24
}

function sendPostReq(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }

        return response.json().then(error => {
            const e = new Error('Что-то пошло не так')
            e.data = error
            throw e
        })
    })
}

sendPostReq('POST', jsonUrl, body).then(data => {
    console.log(data);
}).then(err => console.log(err));


let col = [];
function parseRowName(data) {
    for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
}

let table = document.createElement('table');
let tr = table.insertRow(-1);
function createTable() {
    // creating table headers
    for (let i = 0; i < col.length; i++) {
        let th = document.createElement('th');
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
}

let divContainer = document.getElementById('request')
function addJsonData(data) {
    for (let i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]]
        }
    }
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

}


