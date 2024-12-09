(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  
// index page 
let taxSwitch= document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info");
    for(info of taxInfo){
    if(info.style.display != "inline"){
        info.style.display= "inline";
    }
    else{
        info.style.display = "none";
    }
    }
})
function handleSelectChange(select) {
const dropdown = document.getElementById('categoryDropdown');
dropdown.classList.add('fade-out');


setTimeout(() => {
    const selectedValue = select.value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
}, 200); 
}

window.onload = function () {
const dropdown = document.getElementById('categoryDropdown');
const currentURL = window.location.href;

let isOptionFound = false;


for (let option of dropdown.options) {
    if (currentURL.includes(option.value)) {
        dropdown.value = option.value;  
        isOptionFound = true;
        break;
    }
}


if (!isOptionFound) {
    dropdown.value = "/listings/filter?category=all";
}


setTimeout(() => {
    dropdown.classList.add('fade-in'); 
}, 100);
};

