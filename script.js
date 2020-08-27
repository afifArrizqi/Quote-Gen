const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuoteFromAPI(errorCounter = 0) {
  showLoadingSpinner();
  const proxyUrl = "https://murmuring-tor-32446.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if Author is blank, set it as Unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    //set The Qoute Text
    quoteText.innerText = data.quoteText;
    hideLoadingSpinner();
  } catch (err) {
    errorCounter++;
    if (errorCounter >= 5) {
      console.log("Sorry There is A Problem");
    } else {
      getQuoteFromAPI(errorCounter);
    }
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", getQuoteFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuoteFromAPI();
