console.log(`Hello bug catcher!`);
const createdDiv = document.getElementById("postCreated");

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

window.onload = (event) => {
  getPostData();
};

//TODO: collect users' data and send to server
// submit event to collect data
async function handleSubmit(event) {
  event.preventDefault();
  const formDataTemp = new FormData(form);
  const formValues = Object.fromEntries(formDataTemp);
  console.log(formValues);
  //fetch the POST server route

  await fetch("https://guestbook-server-3all.onrender.com/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  form.hidden = true;
  createdDiv.hidden = false;
  getPostData();
  // window.location.reload(); //so we can see the new post- is there a better way?
}

form.addEventListener("submit", handleSubmit);

//! Once you finish your project, replace your localhost url with the deployed server url from render!!!!!
//============================================

//TODO: render the users' data on the interface
//fetch the GET route from the server
async function getPostData() {
  const response = await fetch(
    "https://guestbook-server-3all.onrender.com/get-post"
  );
  const postData = await response.json();
  console.log(postData); //TODO: Remove once completed project
  renderPost(postData);
}

//I am making lots of p tags and it felt repetitive:
function createPtag(text, i) {
  const p = document.createElement("p");
  p.textContent = text;
  p.className = i;
  return p;
}

// render the data using the DOM elements (one per piece of data)
async function renderPost(postData) {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  for (let i = 0; i < postData.length; i++) {
    const nameP = createPtag(postData[i].name, "name");
    const locationP = createPtag(postData[i].location, "location");
    const date = postData[i].date.split("T")[0]; //before this, it was showing the time as well so I split it at the T- remembered from the max date on line 4.
    const dateP = createPtag(date, "date");
    const typeP = createPtag(postData[i].type, "type");
    const speciesP = createPtag(postData[i].species, "species");
    const infoP = createPtag(postData[i].info, "info");
    const heart = document.createElement("i");
    heart.className = "fa-regular fa-heart";
    const likeButton = document.createElement("a");
    likeButton.appendChild(heart);
    likeButton.id = "heart";
    const postContainer = document.createElement("div");
    const locationDateContainer = document.createElement("div");
    locationDateContainer.className = "locationDiv";
    postContainer.className = "posts";
    locationDateContainer.append(locationP, dateP);
    feed.appendChild(postContainer);
    postContainer.append(
      nameP,
      locationDateContainer,
      typeP,
      speciesP,
      infoP,
      likeButton
    );
    likeButton.addEventListener("click", () => {
      heart.classList.toggle("fa-regular");
      heart.classList.toggle("fa-solid");
    });
  }
}

//show on submit and remove form

function submitDivDisplay() {
  form.hidden = false;
  createdDiv.hidden = true;
  form.reset();
}

const button = document.getElementById("createAnother");
button.addEventListener("click", submitDivDisplay);

//reload page on scroll to feed??
const feedScroll = document.getElementById("feedScroll");
feedScroll.addEventListener("click", () => {
  form.hidden = false;
  createdDiv.hidden = true;
  form.reset();
  getPostData();
});
