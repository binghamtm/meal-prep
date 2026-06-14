import { getLocalStorage, loadHeaderFooter, setLocalStorage, displayPantry } from "./utils.mjs";
import { Product } from "./product-class.js";
loadHeaderFooter();

const addNewItemForm = document.getElementById("add-new-item-form");
//listens for "add new item" button to be pressed and reveals "add new item" form
const addNewItemButton = document.getElementById("add-new-item-button");
addNewItemButton.addEventListener("click", () => {
    addNewItemForm.classList.toggle("hidden");
});

//displays pantry items to be added or removed
displayPantry(document.getElementById("pantry-contents"), true);
//listens for an item to be added to pantry
const addToPantrySubmissionButton = document.getElementById("add-to-pantry-submission")
addToPantrySubmissionButton.addEventListener("click", (event) => {
    console.log(event);
    event.preventDefault();
    addItemToPantry(addNewItemForm);
});

const pantryContentsContainer = document.getElementById("pantry-contents");

pantryContentsContainer.addEventListener("click", () => { 
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.addOrRemove === "add") {
        addQuantityToPantry(button.dataset.id);
    }
    else if (button.dataset.addOrRemove === "remove") {
        removeQuantityFromPantry(button.dataset.id);
    }
})
    

//adds items to pantry
function addItemToPantry(form) {
    if (localStorage.getItem("pantry") === null) {
        setLocalStorage("pantry", []);
    }
    const formData = new FormData(form);
    const itemName = formData.get("item");
    const quantity = parseInt(formData.get("quantity"));
    const expirationDate = formData.get("expiration-date");

    const newItem = new Product(itemName, quantity, expirationDate);
    const pantry = getLocalStorage("pantry");
    pantry.push(newItem);
    setLocalStorage('pantry', pantry);
    displayPantry(document.getElementById("pantry-contents"), true);
    form.reset();
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
function addQuantityToPantry(productName) {
    const pantry = getLocalStorage("pantry");
    const product = pantry.find(item => item.itemName === productName);
    product.quantity = product.quantity + 1;
    setLocalStorage("pantry", pantry);
    displayPantry(document.getElementById("pantry-contents"), true);
}