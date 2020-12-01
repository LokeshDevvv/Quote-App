const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('text')
const quoteAuthor = document.getElementById('author')
const btnTwitter = document.getElementById('twitter')
const nextQuote = document.getElementById('next')
const loader = document.getElementById('loader')


//loading fuction 
// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Getting api for quotes 
async function getQuote(){
    loading();
    
    const proxy = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const respones = await fetch(proxy+apiUrl);
        const data = await respones.json()
        if (data.quoteAuthor === ""){
            quoteAuthor.innerText = "Unknown"
        }else{
            quoteAuthor.innerText = data.quoteAuthor;
        }
         if(data.quoteText.length>120){
            quoteAuthor.classList('long-quote')
        }
        else{
            quoteAuthor.classList.remove('long-quote')
       }

        quoteText.innerText = data.quoteText;
        complete();
     
    
  
   }catch(err){
       getQuote()
      
   }
}

function tweet(){
    const text = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
    window.open(tweetUrl,'_blank')
}



nextQuote.addEventListener('click' ,getQuote)
btnTwitter.addEventListener('click',tweet)
//Calling function
getQuote()