export async function loadHeaderFooter() {
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");
    
    const headerFilePath = "./templates/header.html";
    const footerFilePath = "./templates/footer.html";

    loadTemplate(headerElement, headerFilePath);
    loadTemplate(footerElement, footerFilePath);
}

export async function loadTemplate(parentElement, templatePath) {
    const res = await fetch(templatePath);
    const headerTemplate = await res.text();
    parentElement.innerHTML = headerTemplate;
}


export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function displayPantry(parentElement, isEditing) {
    
    if (isEditing) {
        if (localStorage.getItem("pantry") && localStorage.getItem("pantry").length > 0) {
            let listedPantryContentsHTMLString = "";
            const pantry = getLocalStorage("pantry");
            pantry.forEach(product => {
                const productHTML = `<li>Item: ${product.itemName}, Quantity: ${product.quantity} <button id="add${product.itemName}" data-id="${product.itemName}" data-add-or-remove="add">Add</button> <button id="remove${product.itemName}" data-id="${product.itemName}" data-add-or-remove="remove">Remove</button></li>`;
                listedPantryContentsHTMLString += productHTML;
            });
            parentElement.innerHTML = listedPantryContentsHTMLString;
        }
        else {
            parentElement.innerHTML = `<p>There is Nothing in your Pantry`;
        }
    }
    else {
        if (localStorage.getItem("pantry")) {
            let listedPantryContentsHTMLString = "";
            const pantry = getLocalStorage("pantry");
            pantry.forEach(product => {
                const productHTML = `<li>Item: ${product.itemName}, Quantity: ${product.quantity}</li>`;
                listedPantryContentsHTMLString += productHTML;
            });
            parentElement.innerHTML = listedPantryContentsHTMLString;
        }
        else {
            parentElement.innerHTML = `<p>There is Nothing in your Pantry`;
        }
    }    
}

export function displaySavedFoods(parentElement) {
    if (localStorage.getItem("savedFoods")) {
        let foodListHTMLString = "";
        const savedFoods = getLocalStorage("savedFoods");
        savedFoods.forEach(product => {
            const productHTML = `<li>Item: ${product.itemName}  <button id="food${product.itemName}" data-id="food${product.itemName}">Delete</button></li>`;
            foodListHTMLString += productHTML;
        });
        parentElement.innerHTML = foodListHTMLString;
    }
    else {
        parentElement.innerHTML = `<p>There is Nothing in your food list`;
    }
}


