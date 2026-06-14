import { displayPantry, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const pantryContentsContainer = document.getElementById("pantry-contents");
displayPantry(pantryContentsContainer);