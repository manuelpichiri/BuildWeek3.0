const params = new URLSearchParams(window.location.search);

const albumId = params.get("albumId");

const getAlbumData = async () => {

  try {

    const URLData = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
    const response = await fetch(URLData)

    return response.json()

  } catch (error) {
    console.log(error)
  }

}

const headerAlbumType = document.querySelector(".album-info p")
const headerAlbumImage = document.querySelector(".container-image-album img");
const headerAlbumTitle = document.querySelector(".album-info h1");
const headerAlbumArtist = document.querySelector(".album-info div p:first-of-type");
const headerAlbumArtistAvatar = document.querySelector(".artist-avatar");
const headerAlbumYear = document.querySelector(".album-info div p:nth-of-type(3)");
const headerAlbumTracksNumber = document.querySelector(".album-info div p:nth-of-type(5)");
const headerAlbumLength = document.querySelector(".album-info div p:nth-of-type(6)");

const headerMobileAlbumTitle = document.querySelector(".album-info div:nth-of-type(2) p:first-of-type");
const headerMobileAlbumYear = document.querySelector(".album-info div:nth-of-type(2) p:nth-of-type(2)");

const fillHeaderAlbumData = (album) => {

  headerAlbumType.innerText = album.type;
  headerAlbumImage.src = album.cover_big;
  headerAlbumTitle.innerText = album.title;
  headerAlbumArtist.innerText = album.artist.name;
  headerAlbumArtistAvatar.src = album.artist.picture_small;
  headerAlbumYear.innerText = album.release_date.slice(0, 4);
  headerAlbumTracksNumber.innerText = `${album.nb_tracks} brani`;
  headerAlbumLength.innerHTML = `&bull; ` + returnMinutesAndSecondsFromDurationValue(album.duration);

  headerMobileAlbumTitle.innerText = album.title;
  headerMobileAlbumYear.innerHTML = `&bull; ` + album.release_date.slice(0, 4);

}

const returnMinutesAndSecondsFromDurationValue = (seconds) => {

  const minutes = Math.floor(seconds / 60);

  let extraSeconds = seconds % 60;

  if (extraSeconds < 10) {
    extraSeconds = "0" + extraSeconds;
  }

  return minutes + " min " + extraSeconds + " sec";

}

const tracksContainer = document.querySelector(".songs-container");

const createTrackRowItem = (data, container, trackNum) => {

  const trackRow = document.createElement("div");
  trackRow.setAttribute("class", "row song-row d-flex align-items-start pe-5 mb-2");
  container.appendChild(trackRow);

  const trackNumber = document.createElement("div");
  trackNumber.setAttribute("class", "col-1 small");
  trackNumber.innerText = trackNum;
  trackRow.appendChild(trackNumber);

  const trackInfoContainer = document.createElement("div");
  trackInfoContainer.classList.add("col-5");
  trackRow.appendChild(trackInfoContainer);

  const trackTitle = document.createElement("p");
  trackTitle.classList.add("m-0");
  trackTitle.innerText = data.title;
  trackInfoContainer.appendChild(trackTitle);

  const trackArtist = document.createElement("p");
  trackArtist.setAttribute("class", "m-0 small text-secondary");
  trackArtist.innerText = data.artist.name;
  trackInfoContainer.appendChild(trackArtist);

  const trackPlaysNumberContainer = document.createElement("div");
  trackPlaysNumberContainer.setAttribute("class", "col-3 p-0 d-flex justify-content-end justify-content-md-end");
  trackRow.appendChild(trackPlaysNumberContainer);

  const trackPlaysNumber = document.createElement("p");
  trackPlaysNumber.setAttribute("class", "d-none d-md-block small");
  trackPlaysNumber.innerText = data.rank + " riproduzioni";
  trackPlaysNumberContainer.appendChild(trackPlaysNumber);

  const trackLengthContainer = document.createElement("div");
  trackLengthContainer.setAttribute("class", "col-3 p-0 d-flex justify-content-end justify-content-md-end");
  trackRow.appendChild(trackLengthContainer);

  const trackLengthThreeDotsIcon = document.createElement("i");
  trackLengthThreeDotsIcon.setAttribute("class", "bi bi-three-dots-vertical d-md-none");
  trackLengthContainer.appendChild(trackLengthThreeDotsIcon);

  const trackLength = document.createElement("p");
  trackLength.setAttribute("class", "d-none d-md-block small");
  trackLength.innerHTML = returnMinutesAndSecondsFromDurationValue(data.duration);
  trackLengthContainer.appendChild(trackLength);

}

getAlbumData()
  .then(res => {
    console.log(res)
    fillHeaderAlbumData(res)

    res.tracks.data.forEach((data, index) => {

      createTrackRowItem(data, tracksContainer, index + 1)
    
    });



  })