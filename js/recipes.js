import { loadHeaderFooter, getLocalStorage, setLocalStorage, displayRecipes } from "./utils.mjs";
import { Recipe } from "./recipe-class.js";
loadHeaderFooter();



const recipeIngredientsQuantitySelectOptions = document.getElementById("number-of-ingredients");
const recipeIngredientsSelectOptions = document.getElementsByClassName("ingredients");
const newRecipeForm = document.getElementById("new-recipe-form");
const newRecipeButton = document.getElementById("new-recipe-button");
const recipeSubmitButton = document.getElementById("add-recipe-submission-button");
const recipeContainer = document.getElementById("recipe-container");
const randomRecipeContainer = document.getElementById("random-recipe-container");
newRecipeButton.addEventListener("click", () => {
    newRecipeForm.classList.toggle("hidden");
})

displayIngredientOptionsQuantity(recipeIngredientsQuantitySelectOptions);
recipeIngredientsQuantitySelectOptions.addEventListener("change", () => {
    const ingredientQuantity = recipeIngredientsQuantitySelectOptions.value;
    injectHTMLSelectBoxes(ingredientQuantity);
    displayIngredientsOptions(recipeIngredientsSelectOptions);
});

recipeSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addRecipeToList(newRecipeForm);
})

displayRecipes(recipeContainer);

randomMealDisplay(randomRecipeContainer);


function displayIngredientsOptions(options) {
    
    
    if (localStorage.getItem("savedFoods")) {
        const foodItems = getLocalStorage("savedFoods");
        for (let i = 0; i < options.length; i++) {
            let foodItemsHTMLString = '<option value="" selected disabled>Choose an Ingredient</option>';
            foodItems.forEach(food => {
                foodItemsHTMLString += `<option value="${food.itemName}">${food.itemName}</option>`
            });
            options[i].innerHTML = foodItemsHTMLString; 
        }
    }
    else {
        options.innerHTML = '<option value="" selected disabled>Choose an Ingredient</option>';
    }
    
    
}
function displayIngredientOptionsQuantity(options) {
    
    let quantityOptionsHTMLString = '<option value="" selected disabled>Select</option>';
    for (let i = 1; i < 21; i++) {
        quantityOptionsHTMLString += `<option value="${i}">${i}</option>`;
    }
    options.innerHTML = quantityOptionsHTMLString;
}
function injectHTMLSelectBoxes(quantity) {
    
    const ingredientInputContainer = document.getElementById("ingredients-inputs");
    let ingredientInputSelectorBoxesHTMLString = "";
    for (let i = 0; i < quantity; i++) {
        ingredientInputSelectorBoxesHTMLString += `<label class="form-label" for="ingredients${i+1}"></label>
            <select class="ingredients form-control" id="ingredients${i + 1}" name="ingredients${i + 1}"></select>`
    }
    ingredientInputContainer.innerHTML = ingredientInputSelectorBoxesHTMLString;
}
function addRecipeToList(form) {
    if (localStorage.getItem("recipeList") === null) {
        setLocalStorage("recipeList", []);
    }
    const formData = new FormData(form);
    const recipeTitle = formData.get("recipe-title");
    const quantity = parseInt(formData.get("number-of-ingredients"));
    
    const ingredients = [];
    for (let i = 0; i < quantity; i++) {
        
        const recipeIngredient = formData.get(`ingredients${i + 1}`);
        
        ingredients.push(recipeIngredient);
    }
    const newRecipe = new Recipe(recipeTitle, ingredients);
    const recipeList = getLocalStorage("recipeList");
    recipeList.push(newRecipe);
    setLocalStorage("recipeList", recipeList);
    
    form.reset();
    displayRecipes(recipeContainer);
}
async function randomMealDisplay(parentElement) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const randomMeal = await response.json();
    const meal = randomMeal.meals[0];
    const ingredients = [];
    let ingredientsString = "";
    for (let i = 1; i < 20; i++) {
        ingredients.push(meal[`strIngredient${i}`]);
    }
    const filteredIngredients = ingredients.filter(ingredient => ingredient !== "");
    for (let i = 0; i < filteredIngredients.length; i++) {
        ingredientsString += filteredIngredients[i] + ", ";
    }
    parentElement.innerHTML = `<p>${meal.strMeal}</p><img src="${meal.strMealThumb}" alt="${meal.strMeal}"><p>Type: ${meal.strArea}</p><p>Category: ${meal.strCategory}</p><p>Ingredients: ${ingredientsString}</p><p>Instructions: ${meal.strInstructions}</p>`;
    
}