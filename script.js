const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let photosArray = []; 

//1 Unsplash API
const count = 10;
const apiKey = 'ThASEMS68fd3T4ASS5ldPjfch4_qeLDFZooHZeiMWiU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



//5 Helper Function To Set Attributes on DOM Eelements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//4 Create Elements For Links & Photos , Addd to DOM
function displayPhotos(){
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
        // Put <img> inside  <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


//2 Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
        
    } catch (error) {
        //Catch Error Here
        
    }

}


//3 On load
getPhotos();