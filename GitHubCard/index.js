import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/joeywire')
  .then(info => { //What we want to happen - this could be a loading bubble while its working (async)
    console.log(info); 
  })
  .catch(problem => { //Catches the error - code within to handle the error (message, default, etc.)
    console.log(problem); 
    debugger
  })
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function
    
  Inspected in zsh w/ `http get https://api.github.com/users/joeywire`

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/joeywire')
  .then(info => {
    cards.append(gitCard(info));
  })
  .catch(problem => {
    console.log(problem); 
    debugger
  })
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(item => {
  axios.get(`https://api.github.com/users/${item}`)
  .then(info => {
    cards.append(gitCard(info));
  })
  .catch(problem => {
    console.log(problem); 
    debugger
  })
})
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function gitCard(obj) {
  //Instantiate Elements 
  const card = document.createElement('div'); 
  const cardInfo = document.createElement('div');
  const userIMG = document.createElement('img');
  const name = document.createElement('h3'); 
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p'); 
  const profileLink = document.createElement('a');
  const follower = document.createElement('p'); 
  const following = document.createElement('p');
  const bio = document.createElement('p');
  //Add Classes 
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');
  //Nest Element 
  card.appendChild(userIMG);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(follower);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  
  
  //Populate element content 
  userIMG.src = obj.data.avatar_url;
  name.textContent = obj.data.name;
  userName.textContent = obj.data.login;
  location.textContent =`Location: ${obj.data.location}`;
  profile.textContent = 'Profile: ';
  profileLink.href = obj.data.html_url;
  profileLink.textContent = obj.data.html_url;
  profileLink.target = "_blank";
  follower.textContent = `Followers: ${obj.data.followers}`;
  following.textContent = `Following: ${obj.data.following}`;
  bio.textContent = `Bio: ${obj.data.bio}`;
  //Not sure why inserAdjacentElment had to be put down here for it to populate on the page but it worked
  profile.insertAdjacentElement("beforeend", profileLink);
  //Add Any Event Listners
  //Return Something
  console.log(card);
  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
