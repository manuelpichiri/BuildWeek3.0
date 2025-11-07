const recentlyPlayedCardContainer = document.querySelector(".recently-played-cards-container");
const mainPlaylistCardsContainer = document.querySelector(".main-playlist-cards-container");

let searchInput = null

const getData = async () => {
  const URLData = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`;

  const response = await fetch(URLData);

  return response.json();
};

const createRecentlyPlayedPlaylistCard = (container, arr, playlistName) => {

  const recentlyPlayedPlaylistCard = document.createElement("div");
  recentlyPlayedPlaylistCard.setAttribute(
    "class",
    "recently-played-playlist-card d-flex align-items-center bg-dark"
  );
  container.appendChild(recentlyPlayedPlaylistCard);

  const recentlyPlayedPlaylistImgContainer = document.createElement("div");
  recentlyPlayedPlaylistImgContainer.classList.add(
    "recently-played-playlist-img-container"
  );
  recentlyPlayedPlaylistCard.appendChild(recentlyPlayedPlaylistImgContainer);

  const recentlyPlayedPlaylistFirstImg = document.createElement("img");
  recentlyPlayedPlaylistFirstImg.setAttribute("class", "w-100 object-fit-cover");
  recentlyPlayedPlaylistFirstImg.src = arr[0].album.cover_small;
  recentlyPlayedPlaylistImgContainer.appendChild(recentlyPlayedPlaylistFirstImg);

  const recentlyPlayedPlaylistSecondImg = document.createElement("img");
  recentlyPlayedPlaylistSecondImg.setAttribute("class", "w-100 object-fit-cover");
  recentlyPlayedPlaylistSecondImg.src = arr[1].album.cover_small;
  recentlyPlayedPlaylistImgContainer.appendChild(recentlyPlayedPlaylistSecondImg);

  const recentlyPlayedPlaylistThirdImg = document.createElement("img");
  recentlyPlayedPlaylistThirdImg.setAttribute("class", "w-100 object-fit-cover");
  recentlyPlayedPlaylistThirdImg.src = arr[2].album.cover_small;
  recentlyPlayedPlaylistImgContainer.appendChild(recentlyPlayedPlaylistThirdImg);

  const recentlyPlayedPlaylistFourthImg = document.createElement("img");
  recentlyPlayedPlaylistFourthImg.setAttribute("class", "w-100 object-fit-cover");
  recentlyPlayedPlaylistFourthImg.src = arr[3].album.cover_small;
  recentlyPlayedPlaylistImgContainer.appendChild(recentlyPlayedPlaylistFourthImg);

  const recentlyPlayedPlaylistCardInfoContainer = document.createElement("div");
  recentlyPlayedPlaylistCardInfoContainer.setAttribute(
    "class",
    "d-flex justify-content-center align-items-center recently-played-playlist-info-container"
  );
  recentlyPlayedPlaylistCard.appendChild(
    recentlyPlayedPlaylistCardInfoContainer
  );

  const recentlyPlayedPlaylistCardTitle = document.createElement("p");
  recentlyPlayedPlaylistCardTitle.setAttribute("class", "text-white m-0");
  recentlyPlayedPlaylistCardTitle.innerText = playlistName;
  recentlyPlayedPlaylistCardInfoContainer.appendChild(
    recentlyPlayedPlaylistCardTitle
  );
};

const createRecentlyPlayedCard = (container) => {

  const recentlyPlayedCard = document.createElement("div");
  recentlyPlayedCard.setAttribute("class", "recently-played-card d-flex align-items-center bg-dark");
  container.appendChild(recentlyPlayedCard);

  const recentlyPlayedImgContainer = document.createElement("div");
  recentlyPlayedImgContainer.setAttribute(
    "class",
    "recently-played-img-container"
  );
  recentlyPlayedCard.appendChild(recentlyPlayedImgContainer);

  const recentlyPlayedCardImg = document.createElement("img");
  recentlyPlayedCardImg.setAttribute("class", "w-100 img-fluid object-fit-cover");
  recentlyPlayedCardImg.src =
    "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840c489c9523ae48b2c3d96177";
  recentlyPlayedImgContainer.appendChild(recentlyPlayedCardImg);

  const recentlyPlayedCardInfoContainer = document.createElement("div");
  recentlyPlayedCardInfoContainer.setAttribute(
    "class",
    "d-flex justify-content-center align-items-center recently-played-info-container"
  );
  recentlyPlayedCard.appendChild(recentlyPlayedCardInfoContainer);

  const recentlyPlayedCardTitle = document.createElement("p");
  recentlyPlayedCardTitle.innerText = "Brani che ti piacciono";
  recentlyPlayedCardTitle.setAttribute("class", "text-white m-0");
  recentlyPlayedCardInfoContainer.appendChild(recentlyPlayedCardTitle);

};

const createMainPlaylistCard = (album, container) => {

  const playlistCard = document.createElement("div");
  playlistCard.setAttribute(
    "class",
    "playlist-card bg-dark d-flex flex-column justify-content-center align-items-start gap-3"
  );
  container.appendChild(playlistCard);

  const playlistCardImgContainer = document.createElement("div");
  playlistCardImgContainer.setAttribute(
    "class",
    "playlist-card-img-container w-100"
  );
  playlistCard.appendChild(playlistCardImgContainer);

  const playlistCardImg = document.createElement("img");
  playlistCardImg.setAttribute("class", "w-100 object-fit-cover");
  playlistCardImg.src = "https://picsum.photos/200";
  playlistCardImgContainer.appendChild(playlistCardImg);

  const playlistCardInfoContainer = document.createElement("div");
  playlistCardInfoContainer.setAttribute(
    "class",
    "playlist-card-info-container d-flex flex-column"
  );
  playlistCard.appendChild(playlistCardInfoContainer);

  const playlistCardInfoTitle = document.createElement("h4");
  playlistCardInfoTitle.setAttribute(
    "class",
    "playlist-title-card fs-6 text-white fw-bold"
  );
  playlistCardInfoTitle.innerText = "Hot Hits Italia";
  playlistCardInfoContainer.appendChild(playlistCardInfoTitle);

  const playlistCardInfoDescription = document.createElement("p");
  playlistCardInfoDescription.setAttribute(
    "class",
    "playlist-card-description text-secondary m-0"
  );
  playlistCardInfoDescription.innerText = "La playlist più calda del momento";
  playlistCardInfoContainer.appendChild(playlistCardInfoDescription);

};


function createRandomPlaylistCard(artist, playlistTitle) {

  searchInput = artist

  getData().then(res => {

    const albumsArray = res.data;
    const thumbnailsCoverNumber = 4;

    function fisherYatesShuffle(arr, n) {
      let result = [...arr]
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      return result.slice(0, n);

    }
    const randomCoverThumbnails = fisherYatesShuffle(albumsArray, thumbnailsCoverNumber);

    console.log(randomCoverThumbnails);

    createRecentlyPlayedPlaylistCard(recentlyPlayedCardContainer, randomCoverThumbnails, playlistTitle);

  });

}


createRecentlyPlayedCard(recentlyPlayedCardContainer);

createRandomPlaylistCard("Radiohead", "The best of Radiohead");
createRandomPlaylistCard("Winter is coming", "Winter sounds ☃️");
createRandomPlaylistCard("Madonna", "Madonna che playlist!!!");
createRandomPlaylistCard("Hot summer", "Hot summer vibes 🌊☀️");
createRandomPlaylistCard("883", "I mitici anni 90");


createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);

/*
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const n = 4;
function fisherYatesShuffle(arr, n) {
  let result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.slice(0, n);
}

const shuffledArr = fisherYatesShuffle(arr, n);
console.log(shuffledArr);
*/