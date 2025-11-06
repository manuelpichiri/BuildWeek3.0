/*
const searchInput = "queen";
const main = document.querySelector(".main-content");
const getData = async () => {
  const URLData = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`;

  const response = await fetch(URLData);

  return response.json();
};

getData().then((res) => console.log(res));
let x = window.matchMedia("(min-width:576px)");

function prova() {
  if (x.matches) {
    main.classList.remove("container-fluid");
    main.classList.add("container");
  }
}

x.addEventListener("change", () => {
  prova();
});

getData().then((res) => console.log(res));

const createRecentlyPlayedPlaylistCard = (recentlyPlayedContainer) => {
  const recentlyPlayedPlaylistCardWrapper = document.createElement("div");
  recentlyPlayedPlaylistCardWrapper.setAttribute("class", "col");
  recentlyPlayedContainer.appendChild(recentlyPlayedPlaylistCardWrapper);

  const recentlyPlayedPlaylistCard = document.createElement("div");
  recentlyPlayedPlaylistCard.setAttribute(
    "class",
    "recently-played-playlist-card d-flex"
  );
  recentlyPlayedPlaylistCardWrapper.appendChild(recentlyPlayedPlaylistCard);

  const recentlyPlayedPlaylistImgContainer = document.createElement("div");
  recentlyPlayedPlaylistImgContainer.classList.add(
    "recently-played-playlist-img-container"
  );
  recentlyPlayedPlaylistCard.appendChild(recentlyPlayedPlaylistImgContainer);

  const recentlyPlayedPlaylistFirstImg = document.createElement("img");
  recentlyPlayedPlaylistFirstImg.src = "https://picsum.photos/200";
  recentlyPlayedPlaylistFirstImg.appendChild(recentlyPlayedPlaylistFirstImg);

  const recentlyPlayedPlaylistSecondImg = document.createElement("img");
  recentlyPlayedPlaylistSecondImg.src = "https://picsum.photos/200";
  recentlyPlayedPlaylistSecondImg.appendChild(recentlyPlayedPlaylistSecondImg);

  const recentlyPlayedPlaylistThirdImg = document.createElement("img");
  recentlyPlayedPlaylistThirdImg.src = "https://picsum.photos/200";
  recentlyPlayedPlaylistThirdImg.appendChild(recentlyPlayedPlaylistThirdImg);

  const recentlyPlayedPlaylistFourthImg = document.createElement("img");
  recentlyPlayedPlaylistFourthImg.src = "https://picsum.photos/200";
  recentlyPlayedPlaylistFourthImg.appendChild(recentlyPlayedPlaylistFourthImg);

  const recentlyPlayedPlaylistCardInfoContainer = document.createElement("div");
  recentlyPlayedPlaylistCardInfoContainer.setAttribute(
    "class",
    "bg-dark d-flex justify-content-center align-items-center p-5"
  );
  recentlyPlayedPlaylistCard.appendChild(
    recentlyPlayedPlaylistCardInfoContainer
  );

  const recentlyPlayedPlaylistCardTitle = document.createElement("h5");
  recentlyPlayedPlaylistCardTitle.setAttribute("class", "text-white m-0");
  recentlyPlayedPlaylistCardTitle.innerText = "Brani che ti piacciono";
  recentlyPlayedPlaylistCardInfoContainer.appendChild(
    recentlyPlayedPlaylistCardTitle
  );
};

const createRecentlyPlayedCard = (recentlyPlayedContainer) => {
  const recentlyPlayedCardWrapper = document.createElement("div");
  recentlyPlayedCardWrapper.setAttribute("class", "col");
  recentlyPlayedContainer.appendChild(recentlyPlayedCardWrapper);

  const recentlyPlayedCard = document.createElement("div");
  recentlyPlayedCard.setAttribute("class", "recently-played-card d-flex");
  recentlyPlayedCardWrapper.appendChild(recentlyPlayedCard);

  const recentlyPlayedImgContainer = document.createElement("div");
  recentlyPlayedImgContainer.setAttribute(
    "class",
    "recently-played-img-container"
  );
  recentlyPlayedCard.appendChild(recentlyPlayedImgContainer);

  const recentlyPlayedCardImg = document.createElement("img");
  recentlyPlayedCardImg.src =
    "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840c489c9523ae48b2c3d96177";
  recentlyPlayedImgContainer.appendChild(recentlyPlayedCardImg);

  const recentlyPlayedCardInfoContainer = document.createElement("div");
  recentlyPlayedCardInfoContainer.setAttribute(
    "class",
    "bg-dark d-flex justify-content-center align-items-center p-5"
  );
  recentlyPlayedCard.appendChild(recentlyPlayedCardInfoContainer);

  const recentlyPlayedCardTitle = document.createElement("h5");
  recentlyPlayedCardTitle.innerText = "Brani che ti piacciono";
  recentlyPlayedCardTitle.setAttribute("class", "text-white m-0");
  recentlyPlayedCardInfoContainer.appendChild(recentlyPlayedCardTitle);
};

const createMainPlaylistCard = (container) => {
  const playlistCardWrapper = document.createElement("div");
  playlistCardWrapper.setAttribute("class", "col");
  container.appendChild(playlistCardWrapper);

  const playlistCard = document.createElement("div");
  playlistCard.setAttribute(
    "class",
    "playlist-card bg-dark d-flex flex-column justify-content-center align-items-start gap-3"
  );
  playlistCardWrapper.appendChild(playlistCard);

  const playlistCardImgContainer = document.createElement("div");
  playlistCardImgContainer.setAttribute(
    "class",
    "playlist-card-img-container w-100"
  );
  playlistCardWrapper.appendChild(playlistCardImgContainer);

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
  playlistCardInfoDescription.innerText = "La playlist più calrda del momento";
  playlistCardInfoContainer.appendChild(playlistCardInfoDescription);
};

*/
