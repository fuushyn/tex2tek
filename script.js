// const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");
const resultDiv = document.getElementById("results")

searchInput.addEventListener("input", () => {
	const searchTerm = searchInput.value.trim();
  if(!searchTerm.endsWith(".")){
    return;
  }
  console.log(`converting ${searchTerm}`);

  resultsContainer.innerHTML = `			<h2>Results</h2>
  <div id="results"></div>`

	// Call your backend API with the search term and display the results below
	// Here's a mock API call that returns a simple message
  let data = {
    "text": searchTerm + ". Generate only Latex, don't return any other text. "
  }
	let url = "https://pa-rephrase.onrender.com/api"
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => response.text())
    .then(data => {
      // Display the result in the result div
      // document.querySelector('.loader').style.display = 'none';
      // document.querySelector('#result').style.display = 'block';

      data = JSON.parse(data)
      console.log(data)
      // resultDiv.innerText = data.message;

      // var text = "$$\\int (a + b) dx = \\int a dx + \\int b dx$$"

      var generator = new latexjs.HtmlGenerator({ hyphenate: false })

      generator = latexjs.parse(data.message, { generator: generator })
      
      document.head.appendChild(generator.stylesAndScripts("https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/"))
      // document.head.appendChild(generator.stylesAndScripts(""))
      let el = document.getElementById('results-container')
      el.appendChild(generator.domFragment())
      


    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while calling the API!');
    });

});

