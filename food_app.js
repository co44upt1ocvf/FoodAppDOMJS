let foodItems = [];

function FoodItem(id, name, type, calories) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.calories = calories;
}

function addFoodItem(name, type, calories) {
    let foodItem = new FoodItem(generateId(), name, type, calories);
    foodItems.push(foodItem);
}

function removeFoodItem(id) {
    foodItems = foodItems.filter(item => item.id !== id);
}

function updateFoodItem(id, newName, newType, newCalories) {
    let item = foodItems.find(item => item.id === id);
    if (item) {
        item.name = newName;
        item.type = newType;
        item.calories = newCalories;
    }
}

function validateInput(name, type, calories) {
    if (!name || !type || !calories) {
        console.log('Empty field');
        return false;
    }
    if (typeof name !== 'string' || typeof type !== 'string' || typeof calories !== 'number') {
        console.log('Wrong type');
        return false;
    }
    if (!/^[a-zA-Zа-яА-Я\s]+$/.test(name) || !/^[a-zA-Zа-яА-Я\s]+$/.test(type)) {
        console.log('Name and type must contain only letters');
        return false;
    }
    console.log('Valid input');
    return true;
}

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

function displayFoodItems() {
    let foodList = document.getElementById('food-list');
    foodList.innerHTML = '';
    foodItems.forEach(item => {
        let foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        let foodInfo = document.createElement('div');
        foodInfo.classList.add('food-info');
        foodInfo.textContent = `${item.name} (${item.type}): ${item.calories} calories`;
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            removeFoodItem(item.id);
            displayFoodItems();
        });
        removeButton.setAttribute('data-id', item.id);
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', function() {
            let modal = document.getElementById('update-modal');
            modal.style.display = "block";
            let nameInput = document.getElementById('update-name-input');
            let typeInput = document.getElementById('update-type-input');
            let caloriesInput = document.getElementById('update-calories-input');
            nameInput.value = item.name;
            typeInput.value = item.type;
            caloriesInput.value = item.calories;
            let currentId = item.id;
            document.getElementById('save-button').addEventListener('click', function() {
                let newName = nameInput.value;
                let newType = typeInput.value;
                let newCalories = parseFloat(caloriesInput.value);
                if (validateInput(newName, newType, newCalories)) {
                    updateFoodItem(currentId, newName, newType, newCalories);
                    displayFoodItems();
                    modal.style.display = "none";
                } else {
                    alert('Invalid input');
                }
            });
        });
        foodItem.appendChild(foodInfo);
        foodItem.appendChild(removeButton);
        foodItem.appendChild(updateButton);
        foodList.appendChild(foodItem);
    });
}

document.getElementById('add-button').addEventListener('click', function() {
    let name = document.getElementById('name-input').value;
    let type = document.getElementById('type-input').value;
    let calories = parseFloat(document.getElementById('calories-input').value);
    if (validateInput(name, type, calories)) {
        addFoodItem(name, type, calories);
        displayFoodItems();
    } else {
        alert('Invalid input');
    }
});

let modal = document.getElementById('update-modal');
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}