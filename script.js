const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarkContainer = document.getElementById('bookmark-container');
const websiteNameEL = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');

//show modal, Focus on input field
//that is going to add back our show modal Class
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEL.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
//arrow function instead of creatin a separate function
modalClose.addEventListener ('click', ()=>modalClose.classList.remove);
// we want to be able to hide the model by clicking anywhere outside of the modal
//if the target is this model, then we want to remove the show modal class  and unless we dont want do any things
window.addEventListener ('click', (e)=> (e.target === modal ? modal.classList.remove ('show-modal') : false));


//handing Data form Form we gonna use: The prevent defult() event method
function storeBookmark(e) {
    e.preventDefault();
    // we should pull out values
    const nameValue = websiteNameEL.value ;
    let  urlValue = websiteUrlEl.value ;
    // we dont want to have people have to enter HTP slash
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `http://${urlValue}`;
    }


    console.log(nameValue,urlValue); 
}



//handing our input data we can use 'submit event' on the form element 
 //event Listeners
 bookmarkForm.addEventListener('submit', storeBookmark);