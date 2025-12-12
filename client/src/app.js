console.log(`Hello bug catcher!`);
//form validation
const datePickerId = document.getElementById("datePickerId");
datePickerId.max = new Date().toISOString().split("T")[0];
//this line gets the date and time of today,sets it to a string that would look something like this: 2025-01-26T14:32:10.123z (always uses UTC), it then splits it at the T to remove the time and then selects the data [0], giving the variable this value. Source for this line of code is in the README

function descriptionRequired() {
  //if the species is left blank, I would like the user to add a description.
  const species = document.getElementById("species");
  const description = document.getElementById("description");
  //   console.log(species.value);
  if (species.value === "") {
    description.required = true;
  } else {
    description.required = false;
  }
}
const form = document.getElementById("createPost-form");
form.addEventListener("change", descriptionRequired);
// descriptionRequired(); Originally I was calling the function on load, this meant that the species value always === "" so description was always required. By using an eventListener onchange, it would then check everytime the form was altered and decide if description is required.

//TODO: collect users' data and send to server
// submit event to collect data
function handleSubmit(event) {
  event.preventDefault();
  const formDataTemp = new FormData(form);
  const formValues = Object.fromEntries(formDataTemp);
  console.log(formValues);
  //fetch the POST server route

  fetch("http://localhost:8080/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

form.addEventListener("submit", handleSubmit);

//! Once you finish your project, replace your localhost url with the deployed server url from render!!!!!
//============================================

//TODO: render the users' data on the interface
//fetch the GET route from the server
async function getPostData() {
  const response = await fetch("http://localhost:8080/get-post");
  const postData = await response.json();
  console.log(postData); //TODO: Remove once completed project
  renderPost(postData);
}
getPostData();

//I am making lots of p tags and it felt repetitive:
function createPtag(text, i) {
  const p = document.createElement("p");
  p.textContent = text;
  p.className = i;
  return p;
}

// render the data using the DOM elements (one per piece of data)
async function renderPost(postData) {
  for (let i = 0; i < postData.length; i++) {
    const nameP = createPtag(postData[i].name, "name");
    const locationP = createPtag(postData[i].location, "location");
    const date = postData[i].date.split("T")[0]; //before this, it was showing the time as well so I split it at the T- remembered from the max date on line 4.
    const dateP = createPtag(date, "date");
    const typeP = createPtag(postData[i].type, "type");
    const speciesP = createPtag(postData[i].species, "species");
    const infoP = createPtag(postData[i].info, "info");
    const feed = document.getElementById("feed");
    const postContainer = document.createElement("div");
    feed.appendChild(postContainer);
    postContainer.append(nameP, locationP, date, typeP, speciesP, infoP);
  }
}
