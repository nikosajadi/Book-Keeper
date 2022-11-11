const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

//Local storage :stored data saved across browser sessions
let bookmarks = [];



//show modal, Focus on input field
//that is going to add back our show modal Class
function showModal() {
    modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
//arrow function instead of creatin a separate function
modalClose.addEventListener ('click', ()=>modalClose.classList.remove('show-modal'));
// we want to be able to hide the model by clicking anywhere outside of the modal
//if the target is this model, then we want to remove the show modal class  and unless we dont want do any things
window.addEventListener ('click', (e)=> (e.target === modal ? modal.classList.remove ('show-modal') : false));


//validate Form
function validate(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
      alert('Please submit values for both fields.');
      return false;
    }
    // if (urlValue.match(regex)){
    //     alert('match');  
    // }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address.');
        return false;
      }
    //Valid
    return true;
}

// Build Bookmarks
    function buildBookmarks() {
      // Remove all bookmark elements,  we need to reset at bookmark container
      bookmarksContainer.textContent = '';
      // Build items
      bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');

         // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
         // this allow us to run a function similar to our event listeners in our Javascript
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
     // Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
     // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
    // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
     //Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item); 
  });
}

//Fetch Bookmarks  
 // The JSON.parse() method parses a JSON string, it takses a Jason string and constructs it back into a javaScript object.
function fetchBookmarks (){
    // the first part we should get bookmark from localStorage if available
    if (localStorage.getItem('bookmarks')) {
      bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
      // Create bookmarks array in localStorage
      bookmarks = [
        {
          name: 'Jacinto Design',
          url: 'http://jacinto.design',
        },
      ];
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
  }

// Delete Bookmark
function deleteBookmark(url) {
    // Loop through the bookmarks array
    bookmarks.forEach((bookmark, i) => {
      if (bookmark.url === url) {
        // Splice to shift over all the items in the array
        bookmarks.splice(i, 1);
      }
    });
    // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
  }


//handing Data form Form we gonna use: The prevent defult() event method
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    // we dont want to have people have to enter HTP slash so we add 'https://' if not there
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`;
      }
    // if True we want to skip over this part
    if (!validate(nameValue, urlValue)) {
        return false;
      }
    const bookmark = {
        name: nameValue,
        url: urlValue,
      };

      
    // we gonna pas that object to our arrey
    bookmarks.push(bookmark);
    //we can see that every things here became the string
    // console.log(JSON.stringify(bookmarks));
    // The Json.stringify() method converts a javaScript object or VaLUE to JSON string on web server
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
  }



//handing our input data we can use 'submit event' on the form element 
 //event Listeners
 bookmarkForm.addEventListener('submit', storeBookmark);

 // onload, Fetch bookmarks becuse when you come back to the page, you want to be able to take whatever was in local storage and populate in bookmarks array whit that. 
 fetchBookmarks();

 