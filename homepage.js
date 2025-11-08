const recentlyPlayedCardContainer = document.querySelector(".recently-played-cards-container");
const mainPlaylistCardsContainer = document.querySelector(".main-playlist-cards-container");

let searchInput = null

const getArtistData = async () => {
  const URLData = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`;

  const response = await fetch(URLData);

  return response.json();
};

const createRecentlyPlayedPlaylistCard = (container, arr, playlistName) => {

  const recentlyPlayedPlaylistCard = document.createElement("div");
  recentlyPlayedPlaylistCard.setAttribute(
    "class",
    "recently-played-playlist-card d-flex align-items-center"
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
  recentlyPlayedCard.setAttribute("class", "recently-played-card d-flex align-items-center");
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

  const playlistCardWrapper = document.createElement("div");
  playlistCardWrapper.setAttribute("class", "col-12 col-sm-6 col-md-4 col-lg-3");
  container.appendChild(playlistCardWrapper);

  playlistCardWrapper.addEventListener("click", () => {
    window.location.href = `./albumpage.html?albumId=${album.id}`
  })

  const playlistCard = document.createElement("div");
  playlistCard.setAttribute(
    "class",
    "playlist-card h-100"
  );
  playlistCardWrapper.appendChild(playlistCard);

  const playlistCardColumnContainer = document.createElement("div");
  playlistCardColumnContainer.setAttribute("class", "d-flex flex-column gap-3");
  playlistCard.appendChild(playlistCardColumnContainer);

  const playlistCardInnerContainer = document.createElement("div");
  playlistCardInnerContainer.setAttribute("class", "d-flex flex-md-column justify-content-center align-items-start gap-3");
  playlistCardColumnContainer.appendChild(playlistCardInnerContainer);

  const playlistCardImgContainer = document.createElement("div");
  playlistCardImgContainer.setAttribute(
    "class",
    "playlist-card-img-container w-100"
  );
  playlistCardInnerContainer.appendChild(playlistCardImgContainer);

  const playlistCardImg = document.createElement("img");
  playlistCardImg.setAttribute("class", "w-100 img-fluid object-fit-cover");
  playlistCardImg.src = album.cover_big;
  playlistCardImgContainer.appendChild(playlistCardImg);

  const playlistCardInfoContainer = document.createElement("div");
  playlistCardInfoContainer.setAttribute(
    "class",
    "playlist-card-info-container d-flex flex-column"
  );
  playlistCardInnerContainer.appendChild(playlistCardInfoContainer);

  const playlistCardInfoTitle = document.createElement("a");
  playlistCardInfoTitle.setAttribute(
    "class",
    "playlist-title-card text-decoration-none fs-6 text-white fw-bold"
  );
  playlistCardInfoTitle.innerText = album.title;
  playlistCardInfoContainer.appendChild(playlistCardInfoTitle);

  const playlistCardInfoDescription = document.createElement("a");
  playlistCardInfoDescription.setAttribute(
    "class",
    "playlist-card-description text-decoration-none text-secondary m-0"
  );
  playlistCardInfoDescription.innerText = album.artist.name;
  playlistCardInfoContainer.appendChild(playlistCardInfoDescription);

  const playlistCardBottomContainer = document.createElement("div");
  playlistCardBottomContainer.setAttribute("class", "d-md-none d-flex justify-content-between align-items-center text-secondary");
  playlistCardColumnContainer.appendChild(playlistCardBottomContainer);

  const playlistCardLeftBottomContainer = document.createElement("div");
  playlistCardLeftBottomContainer.setAttribute("class", "d-flex gap-3");
  playlistCardBottomContainer.appendChild(playlistCardLeftBottomContainer);

  const playlistCardHeartIcon = document.createElement("i");
  playlistCardHeartIcon.setAttribute("class", "bi bi-heart-fill text-success");

  const playlistCardDotsIcon = document.createElement("i");
  playlistCardDotsIcon.setAttribute("class", "bi bi-three-dots-vertical");

  playlistCardLeftBottomContainer.append(playlistCardHeartIcon, playlistCardDotsIcon);

  const playlistCardRightBottomContainer = document.createElement("div");
  playlistCardRightBottomContainer.setAttribute("class", "d-flex gap-3 align-items-center");
  playlistCardBottomContainer.appendChild(playlistCardRightBottomContainer);

  const playlistCardRightBottomTrackNumber = document.createElement("p");
  playlistCardRightBottomTrackNumber.setAttribute("class", "small m-0");
  playlistCardRightBottomTrackNumber.innerText = `${album.nb_tracks} brani`;
  playlistCardRightBottomContainer.appendChild(playlistCardRightBottomTrackNumber);

  const playlistCardRightBottomSvg = document.createElement("div");
  playlistCardRightBottomSvg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="35" height="35"> <circle cx="32" cy="32" r="32" fill="#121212" /> <polygon points="26,20 26,44 46,32" fill="#FFFFFF" /> </svg>`
  playlistCardRightBottomContainer.appendChild(playlistCardRightBottomSvg);

};


function createRandomPlaylistCard(artist, playlistTitle) {

  searchInput = artist

  getArtistData().then(res => {

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

    createRecentlyPlayedPlaylistCard(recentlyPlayedCardContainer, randomCoverThumbnails, playlistTitle);

  });

}


createRecentlyPlayedCard(recentlyPlayedCardContainer);

createRandomPlaylistCard("Radiohead", "The best of Radiohead");
createRandomPlaylistCard("Winter is coming", "Winter sounds ☃️");
createRandomPlaylistCard("Madonna", "Madonna che playlist!!!");
createRandomPlaylistCard("Hot summer", "Hot summer vibes 🌊☀️");
createRandomPlaylistCard("883", "I mitici anni 90");


const imageDragonsLoomAlbumId = 604614962
const OttottotreGliAnniAlbumId = 90302
const metallicaMasterOfPuppetsAlbumId = 51001312
const ledZeppelinPhysicalGraffitiAlbumId = 9674822
const pinkFloydWishYouWereHereAlbumId = 12114242

const getAlbumData = async (albumId) => {

  const URLData = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`

  const response = await fetch(URLData)

  return response.json()

}

const createAlbumCardWithAlbumId = (albumId) => {

  getAlbumData(albumId)
    .then(album => {

      createMainPlaylistCard(album, mainPlaylistCardsContainer);

    })

}

createAlbumCardWithAlbumId(imageDragonsLoomAlbumId)
createAlbumCardWithAlbumId(OttottotreGliAnniAlbumId)
createAlbumCardWithAlbumId(metallicaMasterOfPuppetsAlbumId)
createAlbumCardWithAlbumId(ledZeppelinPhysicalGraffitiAlbumId)
createAlbumCardWithAlbumId(pinkFloydWishYouWereHereAlbumId)



/*
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
createMainPlaylistCard(album, mainPlaylistCardsContainer);
*/
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


