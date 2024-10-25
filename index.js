// grab the main element
const main = document.querySelector(`main`);


// fetch data from the API 
const renderAllPlayers = async () => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players`)
    const playerData = await response.json(); 

    // access player list
    const players = playerData.data.players;

    // grab list element from HTML 
    const playerNameList = document.createElement(`ol`);

    // loop through the player data 
    players.forEach(player => {
      // create new list items for each player
      const nameItem = document.createElement(`li`);

      // set the text content of each list item
      nameItem.textContent = player.name;

      // append the list with puppy names
      playerNameList.appendChild(nameItem);

      // create an event listener for clicks on player names
      nameItem.addEventListener('click', () => {
        renderPlayer(player.id);
      });
    });
  
  main.replaceChildren (playerNameList)

  } catch (error) {
    console.error(`Error fetching data:`, error);
  }
};

// display the details of each player when clicked
const renderPlayer = async (playerId) => {
  try {
    // make a call to the API using player ID
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-FTB-ET-WEB-FT/players/${playerId}`);
    const playerDetails = await response.json();

    // rewrite the HTML in main with the player's details
    // create a back button allowing the user to go back to the main page
    main.innerHTML = `
      <h2>${playerDetails.data.player.name}</h2>
      <h3>Breed: ${playerDetails.data.player.breed}</h3>
      <h3>Team Name: ${playerDetails.data.player.team.name}</h3>
      <h3>Player Status: ${playerDetails.data.player.status}</h3>
      <img src="${playerDetails.data.player.imageUrl}" alt="${playerDetails.data.player.name}'s picture"/>

  
      <button>Back to Players</button>
      `;

      // grab the button
      // add event listener to button

      const button = document.querySelector(`button`);
      button.addEventListener(`click`, renderAllPlayers);

  } catch (error) {
    console.error(`Error fetching player details:`, error);
  }
}

renderAllPlayers();
