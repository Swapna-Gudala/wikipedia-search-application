let searchElement = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    //creatubg Result Item
    let result_item = document.createElement("div");
    result_item.classList.add("result_item");
    searchResult.appendChild(result_item);
    //creating Title Element
    let {
        link,
        title,
        description
    } = result; //accessing link title from the result
    let titleEl = document.createElement("a");
    titleEl.classList.add("result_title");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    result_item.appendChild(titleEl);
    //creating Break Element
    let breakEl = document.createElement("br");
    result_item.appendChild(breakEl);
    //creating url Element
    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    urlEl.target = "_blank";
    result_item.appendChild(urlEl);
    //creating Break Element
    let breakEl1 = document.createElement("br");
    result_item.appendChild(breakEl1);
    //creating description Element
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    result_item.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    //let result=searchResults[0];
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResults.textContent = "";
        let searchInput = searchElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData; // accessing array of data
                displayResults(search_results);
                // console.log(jsonData);
            });
    }
}
searchElement.addEventListener("keydown", searchwikipedia);