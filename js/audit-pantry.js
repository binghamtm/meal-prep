import { loadHeaderFooter } from "./utils.mjs";
import { displayPantry} from "./utils.mjs";
loadHeaderFooter();

//listens for "add new item" button to be pressed
const addNewItemButton = document.getElementById("add-new-item-button");
addNewItemButton.addEventListener("click", () => {
    const addNewItemForm = document.getElementById("add-new-item-form");
    addNewItemForm.classList.toggle("hidden");
});

//displays pantry items to be added or removed

//adds items to pantry
function addItemToPantry(itemName, quantity, expirationDate) {
    //const pantryContents = 
}