let apiQoutes = [];

// show new qoute
function newQoute(){
    // randoum qoute
    const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    console.log(qoute);
}

// get from api
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQoutes = await response.json();
        // console.log(apiQoutes[12]);
        console.log(apiQoutes[12]); //replace it with func
        newQoute();

    } catch (error) {
        alert(error);
    }
}



//on load
getQuotes();