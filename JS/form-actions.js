const loadForm = document.getElementById("load-form");
const saveForm = document.getElementById("save-form");

loadForm.addEventListener("click", setLocalValues);
saveForm.addEventListener("click", saveLocalValues);