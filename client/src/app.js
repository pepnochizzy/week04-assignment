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
  const response = await fetch("http://localhost:8080/create-post");
  const postData = response.json();
  console.log(postData);
}

// render the data using the DOM elements (one per piece of data)
