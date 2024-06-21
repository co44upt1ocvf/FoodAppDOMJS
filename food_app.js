let foodItems = [];

function FoodItem(name, type, calories) {
    this.name = name;
    this.type = type;
    this.calories = calories;
}

function addFoodItem(name, type, calories) {
    let foodItem = new FoodItem(name, type, calories);
    foodItems.push(foodItem);
}

function removeFoodItem(name) {
    foodItems = foodItems.filter(item => item.name !== name);
}

function updateFoodItem(name, newName, newType, newCalories) {
    foodItems = foodItems.map(item => {
        if (item.name === name) {
            item.name = newName;
            item.type = newType;
            item.calories = newCalories;
        }
        return item;
    });
}

function validateInput(name, type, calories) {
    console.log('Name:', name, 'Type:', type, 'Calories:', calories);
    if (!name || !type || !calories) {
        console.log('Empty field');
        return false;
    }
    calories = Number(calories);
    if (typeof name !== 'string' || typeof type !== 'string' || typeof calories !== 'number') {
        console.log('Wrong type');
        return false;
    }
    console.log('Valid input');
    return true;
}

function displayFoodItems() {
    let foodList = document.getElementById('food-list');
    foodList.innerHTML = '';
    foodItems.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} (${item.type}): ${item.calories} calories`;
        foodList.appendChild(listItem);
    });
}

document.getElementById('add-button').addEventListener('click', function() {
    let name = document.getElementById('name-input').value;
    let type = document.getElementById('type-input').value;
    let calories = document.getElementById('calories-input').value;
    if (validateInput(name, type, calories)) {
        addFoodItem(name, type, calories);
        displayFoodItems();
    } else {
        alert('Invalid input');
    }
});

document.getElementById('remove-button').addEventListener('click', function() {
    let name = document.getElementById('remove-name-input').value;
    removeFoodItem(name);
    displayFoodItems();
});

document.getElementById('update-button').addEventListener('click', function() {
    let name = document.getElementById('update-name-input').value;
    let newName = document.getElementById('new-name-input').value;
    let newType = document.getElementById('new-type-input').value;
    let newCalories = document.getElementById('new-calories-input').value;
    if (validateInput(newName, newType, newCalories)) {
        updateFoodItem(name, newName, newType, newCalories);
        displayFoodItems();
    } else {
        alert('Invalid input');
    }
});