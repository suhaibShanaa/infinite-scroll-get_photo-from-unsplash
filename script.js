const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

// 9
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = []; 
let isInitialLoad = true // 16

//1 Unsplash API
let count = 5;
const apiKey = 'ThASEMS68fd3T4ASS5ldPjfch4_qeLDFZooHZeiMWiU';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//17
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

//8 Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true; //14 loading in first page
        count = 30;  //15 
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    }

}


//5 Helper Function To Set Attributes on DOM Eelements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//4 Create Elements For Links & Photos , Addd to DOM
function displayPhotos(){
    //13 reset imagesLoaded = 0
    imagesLoaded = 0;
    //10 
    totalImages = photosArray.length;
    //Run Function for eache pbject in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href' , photo.links.html);
        // item.setAttribute('target' , '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photos
        const img = document.createElement('img');
        // img.setAttribute('src' , photo.urls.regular);
        // img.setAttribute('alt' , photo.alt_description);
        // img.setAttribute('title' , photo.alt_description);
        setAttributes(img, {
            src:    photo.urls.regular,
            alt:    photo.alt_description,
            title:  photo.alt_description
        });
        //7 Event Listener, Check when each if finished loading
            img.addEventListener('load', imageLoaded);
        // Put <img> inside  <a>, then put both inside imageContainer Element
            item.appendChild(img);
            imageContainer.appendChild(item);

    });
}


//2 Get photos from unsplash API
async function getPhotos() {
    try {
        let response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){ //18
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }        
    } catch (error) {
        //Catch Error Here
        
    }

}

//6  Check to see if scrolling near bottom of page, Load More Photos
//11 adedd new condetion && ready 
window.addEventListener('scroll',() => {
   if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
    && ready){
        //12
        ready = false;
        getPhotos();
   }
})

//3 On load
getPhotos();