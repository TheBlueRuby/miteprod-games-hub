import { grabJson } from './grabData.mjs';

window.updateGames = async function updateGames() {
    let container = document.querySelector('.games-container');
    container.innerHTML = `<h2>Loading Data!</h2>`;
    let games = await updateGameData();
    let gameSection = '';

    games.forEach((game) => {
        let gameEntry = `<div class="game-entry entry">
                            <img src="${game.img}" class="game-img img"></img>
                            <h2 class="game-name name">${game.displayName}</h2>
                            <p class="game-author author">by ${game.author}</p>
                            <p class="game-description description">${game.desc}</p>
                            <a href="${game.download}" class="download-btn">Download</a>
                         </div>`;
        gameSection += gameEntry;
    });

    container.innerHTML = gameSection;
}

async function updateGameData() {
    let apiUrl = "https://miteprod-api.vercel.app/";

    let gamesListObj = await grabJson(apiUrl + "games/");
    console.log(gamesListObj);
    let gamesList = gamesListObj.games;
    console.log(gamesList);

    let games = [];

    for (let i = 0; i < gamesList.length; i++) {
        games[i] = await grabJson(apiUrl + "games/" + gamesList[i] + "/");
    }

    console.log(games);

    return games;
}
