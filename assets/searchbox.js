let timer;
function debounce(fn,delay){
  clearTimeout(timer);
  timer=setTimeout(fn,delay);
}

function fetchData(query){
    return fetch('https://dummyjson.com/products/search?q=' + query)
    .then(response=>response.json())
    .catch(error=>console.error("Error fetching data:",error));
}

function displayResults(results)
{
  const searchElement=document.getElementById("searchResults");
  searchResults.innerElement='';
  const req=results.products;
  console.log(req);
  req.forEach(result => {
    const li = document.createElement('li');
    li.textContent = result.title;
    li.addEventListener('click', () => selectSuggestion(result.title));
    searchElement.appendChild(li);
  });

}

function selectSuggestion(selectedSuggestion){
  document.getElementById('search').value
}

function debouncedSearch(event){
  const query=event.target.value;
  debounce(()=>{
    if(query.trim()!='')
    {
      fetchData(query)
    .then(displayResults);
    } else{
      document.getElementById("searchResults").innerHTML='';
    }
  },1500);
}