async function updatePage() {
    let container = document.querySelector('.games-container');
    container.innerHTML = `<h2>Loading Data!</h2>`;
    let games = await updateGameData();
    let gameSection = '';

    games.forEach((game) => {
        let gameEntry = `<div class="game-entry">
                            <img src="${game.img}" class="game-img"></img>
                            <h2 class="game-name">${game.displayName}</h2>
                            <p class="game-author">by ${game.author}</p>
                            <p class="game-description">${game.desc}</p>
                            <a href="${game.download}" class="download-btn">Download</a>
                         </div>`;
        gameSection += gameEntry;
    });

    container.innerHTML = gameSection;
}

async function updateGameData() {
    let apiUrl = "https://miteprod-api.vercel.app/";

    let gamesListObj = await grabData(apiUrl + "games/");
    console.log(gamesListObj);
    let gamesList = gamesListObj.games;
    console.log(gamesList);

    let games = [];

    for (let i = 0; i < gamesList.length; i++) {
        games[i] = await grabData(apiUrl + "games/" + gamesList[i] + "/");
    }

    console.log(games);

    return games;
}

async function grabData(apiUrl) {
    try {
        let res = await fetch(apiUrl);
        return await res.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}
