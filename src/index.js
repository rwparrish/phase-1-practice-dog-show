let dogId

document.addEventListener('DOMContentLoaded', () => {
    
    fetchDogs()
    const dogForm = document.getElementById('dog-form')

    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const dogName = document.querySelector("#dog-form > input[type=text]:nth-child(1)").value
        const dogBreed = document.querySelector("#dog-form > input[type=text]:nth-child(2)").value
        const dogSex = document.querySelector("#dog-form > input[type=text]:nth-child(3)").value
    
        updateDog(dogName, dogBreed, dogSex)
    })
})


function fetchDogs() {

    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = ''
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogsArr => dogsArr.forEach(renderDog))
}


function renderDog(dogObj) {
    const tableBody = document.getElementById("table-body")
    const tableRow =  document.createElement('tr')

    tableRow.innerHTML = `
        <td>${dogObj.name}</td>
        <td>${dogObj.breed}</td>
        <td>${dogObj.sex}</td>
        <td><button>Edit</button></td>
    ` 

    tableBody.appendChild(tableRow)

    const editButton = tableRow.querySelector('button')
    editButton.addEventListener("click", () => {
        populateFormValues(dogObj)
    })
    
}

function populateFormValues(dogObj) {
    dogId = dogObj.id
    let formNameInput = document.querySelector("#dog-form > input[type=text]:nth-child(1)")
    let formBreedInput = document.querySelector("#dog-form > input[type=text]:nth-child(2)")
    let formSexInput = document.querySelector("#dog-form > input[type=text]:nth-child(3)")

    formNameInput.value = dogObj.name
    formBreedInput.value = dogObj.breed
    formSexInput.value = dogObj.sex
}


function updateDog(dogName, dogBreed, dogSex) {
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex:dogSex
        })
    })
    .then(fetchDogs())
}





