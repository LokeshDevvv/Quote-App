const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('text')
const quoteAuthor = document.getElementById('author')
const btnTwitter = document.getElementById('twitter')
const nextQuote = document.getElementById('next')




//Getting api for quotes 
async function getQuote(){

    const proxy = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try{
    const respones = await fetch(proxy+apiUrl);
    const data = await respones.json()
    console.log(data)    

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
 

   }catch(err){
       getQuote()
       console.log("opps",err)
   }
}

function tweet(){
    quoteAuthor.innerText = author;
    quoteText.innerText = text;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
    window.open(tweetUrl,'_blank')
}



nextQuote.addEventListener('click' ,getQuote)
btnTwitter.addEventListener('click',tweet)
//Calling function
getQuote()