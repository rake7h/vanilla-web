/**
  https://github.com/rake7h/vanilla-web/demo/auto-complete-input
*/

const D = document;
const suggestionsData = [
  {
    city: "New York",
    growth_from_2000_to_2013: "4.8%",
    latitude: 40.7127837,
    longitude: -74.0059413,
    population: "8405837",
    rank: "1",
    state: "New York",
  },
  {
    city: "Los Angeles",
    growth_from_2000_to_2013: "4.8%",
    latitude: 34.0522342,
    longitude: -118.2436849,
    population: "3884307",
    rank: "2",
    state: "California",
  },
  {
    city: "Chicago",
    growth_from_2000_to_2013: "-6.1%",
    latitude: 41.8781136,
    longitude: -87.6297982,
    population: "2718782",
    rank: "3",
    state: "Illinois",
  },
  {
    city: "Houston",
    growth_from_2000_to_2013: "11.0%",
    latitude: 29.7604267,
    longitude: -95.3698028,
    population: "2195914",
    rank: "4",
    state: "Texas",
  },
  {
    city: "Philadelphia",
    growth_from_2000_to_2013: "2.6%",
    latitude: 39.9525839,
    longitude: -75.1652215,
    population: "1553165",
    rank: "5",
    state: "Pennsylvania",
  },
  {
    city: "Phoenix",
    growth_from_2000_to_2013: "14.0%",
    latitude: 33.4483771,
    longitude: -112.0740373,
    population: "1513367",
    rank: "6",
    state: "Arizona",
  },
  {
    city: "San Antonio",
    growth_from_2000_to_2013: "21.0%",
    latitude: 29.4241219,
    longitude: -98.49362819999999,
    population: "1409019",
    rank: "7",
    state: "Texas",
  },
  {
    city: "San Diego",
    growth_from_2000_to_2013: "10.5%",
    latitude: 32.715738,
    longitude: -117.1610838,
    population: "1355896",
    rank: "8",
    state: "California",
  },
  {
    city: "Dallas",
    growth_from_2000_to_2013: "5.6%",
    latitude: 32.7766642,
    longitude: -96.79698789999999,
    population: "1257676",
    rank: "9",
    state: "Texas",
  },
  {
    city: "San Jose",
    growth_from_2000_to_2013: "10.5%",
    latitude: 37.3382082,
    longitude: -121.8863286,
    population: "998537",
    rank: "10",
    state: "California",
  },
  {
    city: "Austin",
    growth_from_2000_to_2013: "31.7%",
    latitude: 30.267153,
    longitude: -97.7430608,
    population: "885400",
    rank: "11",
    state: "Texas",
  },
  {
    city: "Indianapolis",
    growth_from_2000_to_2013: "7.8%",
    latitude: 39.768403,
    longitude: -86.158068,
    population: "843393",
    rank: "12",
    state: "Indiana",
  },
  {
    city: "Jacksonville",
    growth_from_2000_to_2013: "14.3%",
    latitude: 30.3321838,
    longitude: -81.65565099999999,
    population: "842583",
    rank: "13",
    state: "Florida",
  },
  {
    city: "San Francisco",
    growth_from_2000_to_2013: "7.7%",
    latitude: 37.7749295,
    longitude: -122.4194155,
    population: "837442",
    rank: "14",
    state: "California",
  },
  {
    city: "Columbus",
    growth_from_2000_to_2013: "14.8%",
    latitude: 39.9611755,
    longitude: -82.99879419999999,
    population: "822553",
    rank: "15",
    state: "Ohio",
  },
  {
    city: "Charlotte",
    growth_from_2000_to_2013: "39.1%",
    latitude: 35.2270869,
    longitude: -80.8431267,
    population: "792862",
    rank: "16",
    state: "North Carolina",
  },
];

const inputElm = D.getElementById("input-field");

const getSuggesionData = (value, apiRes) => {
  if (!value) return [];

  // filter the matched values on apiRes;
  const regx = new RegExp(value.toLowerCase());
  const filteredList = [];

  apiRes.forEach((item) => {
    if (item.city.toLowerCase().match(regx)) {
      filteredList.push(item);
    }
  });
  return filteredList;
};

const getListMarkup = (suggestionText) => {
  return `
  <li class="list-container-item">${suggestionText}</li>
  `;
};

const createSuggestionContanier = (inputElm) => {
  const suggElm = D.getElementById("auto-suggestion-container1");
  if (suggElm) return suggElm;

  const autoSuggestContainerMarkup = (top, left) => `
  <div class="auto-suggestion-container" id="auto-suggestion-container1" style='top:${top}px; left: ${left}px'>
    <ul class="list-container">
    </ul>
  </div>
  `;

  const inputPosition = inputElm.getBoundingClientRect();

  const y1 = inputPosition.top;
  const x1 = inputPosition.left;

  const y2 = inputElm.offsetHeight;
  const heightOfTheSuggContainer = y1 + y2;

  inputElm.insertAdjacentHTML(
    "afterend",
    autoSuggestContainerMarkup(heightOfTheSuggContainer, x1)
  );
  return D.getElementById("auto-suggestion-container1");
};

const hideSuggestionContainer = (elm) => {
  return elm.classList.remove("d-flex");
};

const showSuggestionContaniner = (elm) => {
  return elm.classList.add("d-flex");
};

const emptySuggestion = (elm) => {
  elm.innerHTML = "";
};

// render the suggestion box on value change
const onInputChange = (e) => {
  let inputValue = "";
  inputValue = e.target.value;

  const suggContainerElm = createSuggestionContanier(inputElm);
  const listContainer = suggContainerElm.firstElementChild;

  const hideAndRemoveSuggestion = () => {
    listContainer.hasChildNodes(emptySuggestion(listContainer));
    hideSuggestionContainer(suggContainerElm);
  };

  if (!inputValue) {
    hideAndRemoveSuggestion();
  }

  const suggestionItems = getSuggesionData(inputValue, suggestionsData);

  if (suggestionItems && suggestionItems.length >= 1) {
    // render the list items / suggestion items
    // if contanainer is not present the create a suggestion container
    // else add the list items to existing container
    //
    //
    listContainer.hasChildNodes(emptySuggestion(listContainer));

    showSuggestionContaniner(suggContainerElm);

    // append list item for each suggestion
    let suggestionHTML = "";
    suggestionItems.forEach((item) => {
      suggestionHTML += getListMarkup(item.city);
    });
    listContainer.insertAdjacentHTML("afterbegin", suggestionHTML);
  } else {
    hideAndRemoveSuggestion();
  }
};

/**
  todo
  : 1- click outside of suggestion container it should hide
    2. clicking on suggestion item, input value should get field with that suggestion & closed
    3. throtling input filed
*/

// init
(() => {
  inputElm.addEventListener("keyup", onInputChange);
})();
