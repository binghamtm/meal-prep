import { getLocalStorage, loadHeaderFooter, setLocalStorage, displayPantry, displaySavedFoods } from "./utils.mjs";
import { Product } from "./product-class.js";
loadHeaderFooter();




//listens for "add new item" button to be pressed and reveals "add new item" form
const addNewItemButton = document.getElementById("add-new-pantry-item-button");
addNewItemButton.addEventListener("click", () => {
    addToPantryForm.classList.toggle("hidden");
    addNewFoodItemForm.className = "hidden";
});

const addToPantryForm = document.getElementById("add-new-pantry-item-form");
const addNewFoodItemForm = document.getElementById("add-new-food-item-form");
const addNewFoodItemButton = document.getElementById("add-new-food-item-button");
addNewFoodItemButton.addEventListener("click", () => {
    addNewFoodItemForm.classList.toggle("hidden");
    addToPantryForm.className = "hidden";

});

//listens for an item to be added to pantry
const addToPantrySubmissionButton = document.getElementById("add-to-pantry-submission")
addToPantrySubmissionButton.addEventListener("click", (event) => {
    event.preventDefault();
    addItemToPantry(addToPantryForm);
    
});


const addToFoodListForm = document.getElementById("add-new-food-item-form");
const addToFoodListSubmissionButton = document.getElementById("add-to-food-list-submission")
addToFoodListSubmissionButton.addEventListener("click", (event) => {
    event.preventDefault();
    addItemToFoodList(addToFoodListForm);
});


const pantryContentsContainer = document.getElementById("pantry-contents");
pantryContentsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.addOrRemove === "add") {
        addQuantityToPantry(button.dataset.id);
    }
    else if (button.dataset.addOrRemove === "remove") {
        removeQuantityFromPantry(button.dataset.id);
    }
});

const savedFoodsContentsContainer = document.getElementById("saved-foods-list");
savedFoodsContentsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    removeFoodFromSavedFoods(button.dataset.id);
});

await displaySavedFoods(document.getElementById("saved-foods-list"));

//displays options in "add to pantry" form
displayPantryAdditionOptions();

//displays pantry items to be added or removed
displayPantry(document.getElementById("pantry-contents"), true);

async function addItemToFoodList(form) {
    const formData = new FormData(form);
    const itemName = formData.get("food-item");
    console.log(itemName)
    if (itemName === '') {
        alert("Please Input a Value");
        return;
    }
    const newItem = new Product(itemName);
    const savedFoods = getLocalStorage("savedFoods") ?? [];
    if (savedFoods.some(food => food.itemName === itemName)) {
        alert(`${itemName} is already in Food List`);
        return;
    }
    savedFoods.push(newItem);
    setLocalStorage('savedFoods', savedFoods);
    await displaySavedFoods(document.getElementById("saved-foods-list"));
    displayPantryAdditionOptions();
    form.reset();
}
//adds items to food list
function addItemToPantry(form) {
    if (localStorage.getItem("pantry") === null) {
        setLocalStorage("pantry", []);
    }
    const formData = new FormData(form);
    const itemName = formData.get("item");
    console.log(itemName)
    const quantity = parseInt(formData.get("quantity"));

    if (itemName === null) {
        alert("Please Input a Value");
        return;
    }

    const newItem = new Product(itemName, quantity);
    const pantry = getLocalStorage("pantry");
    if (pantry.some(food => food.itemName === itemName)) {
        alert(`${itemName} is already in pantry`);
        return;
    }
    pantry.push(newItem);
    setLocalStorage('pantry', pantry);
    displayPantry(document.getElementById("pantry-contents"), true);
    form.reset();
}
function addQuantityToPantry(productName) {
    const pantry = getLocalStorage("pantry");
    const product = pantry.find(item => item.itemName === productName);
    product.quantity = product.quantity + 1;
    setLocalStorage("pantry", pantry);
    displayPantry(document.getElementById("pantry-contents"), true);
}

function removeQuantityFromPantry(productName) {
    
    const pantry = getLocalStorage("pantry");
    const product = pantry.find(item => item.itemName === productName);
    product.quantity = product.quantity - 1;
    setLocalStorage("pantry", pantry);
    
    if (product.quantity <= 0) {
        removeItemFromPantry(productName);
    }
    displayPantry(document.getElementById("pantry-contents"), true);
}
function removeItemFromPantry(productName) {
    const pantry = getLocalStorage("pantry");
    const newPantry = pantry.filter(item => item.itemName !== productName);
    setLocalStorage("pantry", newPantry);
}
function displayPantryAdditionOptions() {
    const addtoPantrySelectOptions = document.getElementById("item");
    const addtoPantryQuantitySelectOptions = document.getElementById("quantity");
    if (localStorage.getItem("savedFoods")) {
        const foodItems = getLocalStorage("savedFoods");
        let foodItemsHTMLString = '<option value="" selected disabled>Choose a food</option>';
        foodItems.forEach(food => {
            foodItemsHTMLString += `<option value="${food.itemName}">${food.itemName}</option>`
        });
        addtoPantrySelectOptions.innerHTML = foodItemsHTMLString;
    }
    else {
        addtoPantrySelectOptions.innerHTML = '<option value="" selected disabled>Choose a food</option>';
    }
    let quantityOptionsHTMLString = "";
    for (let i = 1; i < 11; i++) {
        quantityOptionsHTMLString += `<option value="${i}">${i}</option>`;
    }
    addtoPantryQuantitySelectOptions.innerHTML = quantityOptionsHTMLString;
}
function removeFoodFromSavedFoods(productName) {
    const savedFoods = getLocalStorage("savedFoods") ?? [];
    const actualProductName = productName.slice(4);
    const newSavedFoods = savedFoods.filter(item => item.itemName !== actualProductName);
    setLocalStorage("savedFoods", newSavedFoods);
    displaySavedFoods(document.getElementById("saved-foods-list"));
    displayPantryAdditionOptions();
}

