// Fetch data from the JSON file
fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Log the retrieved data to the console
    console.log(data);

    // Now you can use the data to display recommendations on your website
    // For example, you can loop through the countries, temples, and beaches arrays
    // and display their details on your webpage
  })
  .catch((error) => {
    console.error("There was a problem fetching the data:", error);
  });

// Get references to the search input and search button
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

// Function to handle search
function handleSearch() {
  // Get the user input and convert it to lowercase
  const userInput = searchInput.value.toLowerCase();

  // Fetch data from the JSON file
  fetch("travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Initialize array to store recommendations
      let recommendations = [];

      // Check if the user input matches keywords for beaches, temples, or countries
      if (userInput.includes("beach")) {
        recommendations = data.beaches.slice(0, 2); // Get the first two beach recommendations
      } else if (userInput.includes("temple")) {
        recommendations = data.temples.slice(0, 2); // Get the first two temple recommendations
      } else if (userInput.includes("country")) {
        recommendations = data.countries.slice(0, 2); // Get the first two country recommendations
      } else {
        // If the input doesn't match any keyword, display a message or take appropriate action
        console.log("No matching keyword found.");
        return;
      }

      // Display recommendations
      const resultsContainer = document.querySelector(".search-results");
      resultsContainer.innerHTML = ""; // Clear previous results

      recommendations.forEach((place) => {
        // Create HTML elements for each recommendation
        const placeElement = document.createElement("div");
        placeElement.classList.add("place");

        const imageElement = document.createElement("img");
        imageElement.src = place.imageUrl;
        imageElement.alt = place.name;

        const nameElement = document.createElement("h2");
        nameElement.textContent = place.name;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = place.description;

        // Append elements to the results container
        placeElement.appendChild(imageElement);
        placeElement.appendChild(nameElement);
        placeElement.appendChild(descriptionElement);
        resultsContainer.appendChild(placeElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
}

// Event listener for the search button click
btnSearch.addEventListener("click", handleSearch);

// Get reference to the reset button
const resetButton = document.querySelector(".reset-button");

// Function to handle reset
function handleReset() {
  // Clear the content of the search results container
  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.innerHTML = "";
}

// Event listener for the reset button click
resetButton.addEventListener("click", handleReset);

// Assuming you have a function to fetch the country data and you store it in the 'data' variable

// Function to calculate local time in the recommended country
function calculateLocalTime(countryData) {
  // Get current UTC time
  const utcDate = new Date();

  // Get time zone offset of the recommended country
  const timeZoneOffset = countryData.timeZoneOffset; // Assuming 'timeZoneOffset' is a property in the country data

  // Calculate local time by adding the time zone offset to the UTC time
  const localTime = new Date(utcDate.getTime() + timeZoneOffset * 60000); // Convert minutes to milliseconds

  return localTime;
}

// Function to display the local time
function displayLocalTime(localTime) {
  // Format the time as desired (e.g., HH:MM:SS)
  const formattedTime = localTime.toLocaleTimeString();

  // Display the formatted time on the webpage
  const timeContainer = document.getElementById("localTime"); // Assuming you have an element with id 'localTime' to display the time
  timeContainer.textContent = "Local Time: " + formattedTime;
}

// Example usage:
// Assuming you have the country data stored in the 'countryData' variable
const localTime = calculateLocalTime(countryData);
displayLocalTime(localTime);
