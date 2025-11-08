// =========================================================================================
// VARIABILI GLOBALI E CONFIGURAZIONE API
// =========================================================================================
const ARTIST_ID = 246791;
const API_URL = "https://striveschool-api.herokuapp.com/api/deezer";
const MAX_TRACKS_PREVIEW = 5;
let artistNameCache = "";
let artistImageCache = "";
let currentTrackDuration = 0;
let progressInterval = null;
let isPlaying = false;
let allTracksCache = [];
let artistAlbumsCache = [];

// =========================================================================================
// FUNZIONI DI UTILITÀ
// =========================================================================================

const formatNumber = (num) => num.toLocaleString("it-IT");

const formatDuration = (seconds) => {
  if (typeof seconds !== "number" || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
};

const extractYear = (dateString) => {
  if (!dateString) return "";
  return dateString.split("-")[0];
};

// =========================================================================================
// FUNZIONI API
// =========================================================================================

async function fetchData(endpoint, errorMessage) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}. ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

const fetchArtistDetails = (id) =>
  fetchData(`artist/${id}`, "Errore nel recupero dettagli artista.");
const fetchTopTracks = (id, limit = 10) =>
  fetchData(
    `artist/${id}/top?limit=${limit}`,
    "Errore nel recupero brani popolari."
  );
const fetchArtistAlbums = (id) =>
  fetchData(`artist/${id}/albums`, "Errore nel recupero album dell'artista.");

// =========================================================================================
// FUNZIONI PLAYER
// =========================================================================================

function updateProgress(elapsedSeconds) {
  const currentTimeElement = document.getElementById("currentTime");
  const progressBarFill = document.getElementById("progressFill");

  if (currentTimeElement) {
    currentTimeElement.innerText = formatDuration(elapsedSeconds);
  }
  if (progressBarFill && currentTrackDuration > 0) {
    const percentage = (elapsedSeconds / currentTrackDuration) * 100;
    progressBarFill.style.width = `${percentage}%`;
  }
}

function togglePlayPause() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/></svg>';
  const pauseIcon =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M3 2h3v12H3zM10 2h3v12h-3z"/></svg>';

  if (!playPauseBtn) return;

  if (isPlaying) {
    clearInterval(progressInterval);
    playPauseBtn.innerHTML = playIcon;
  } else {
    playPauseBtn.innerHTML = pauseIcon;
    let elapsed = getCurrentElapsedSeconds();

    progressInterval = setInterval(() => {
      elapsed++;
      updateProgress(elapsed);

      if (elapsed >= currentTrackDuration) {
        clearInterval(progressInterval);
        playPauseBtn.innerHTML = playIcon;
        isPlaying = false;
        updateProgress(0);
      }
    }, 1000);
  }
  isPlaying = !isPlaying;
}

function getCurrentElapsedSeconds() {
  const progressBarFill = document.getElementById("progressFill");
  if (!progressBarFill || currentTrackDuration === 0) return 0;

  const currentWidthPercent = parseFloat(progressBarFill.style.width || "0");
  return Math.floor((currentTrackDuration * currentWidthPercent) / 100);
}

function updatePlayerBar(track) {
  if (!track) return;

  currentTrackDuration = track.duration;

  const playerCover = document.getElementById("nowPlayingCover");
  const playerTitle = document.querySelector(".now-playing-title");
  const playerArtist = document.querySelector(".now-playing-artist");
  const totalTime = document.getElementById("totalTime");

  if (playerCover && track.album && track.album.cover_medium) {
    playerCover.style.backgroundImage = `url('${track.album.cover_medium}')`;
  }
  if (playerTitle) {
    playerTitle.innerText = track.title;
  }
  if (playerArtist && track.artist) {
    playerArtist.innerText = track.artist.name || artistNameCache;
  }
  if (totalTime) {
    totalTime.innerText = formatDuration(currentTrackDuration);
  }

  if (progressInterval) {
    clearInterval(progressInterval);
  }
  isPlaying = false;
  updateProgress(0);
  togglePlayPause();
}

function handleProgressBarClick(event) {
  const progressBarContainer = document.getElementById("progressBar");
  if (!progressBarContainer || currentTrackDuration === 0) return;

  const rect = progressBarContainer.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const containerWidth = rect.width;
  const clickPercent = Math.min(
    100,
    Math.max(0, (clickX / containerWidth) * 100)
  );
  const newElapsedSeconds = Math.floor(
    (currentTrackDuration * clickPercent) / 100
  );

  if (progressInterval) {
    clearInterval(progressInterval);
  }

  updateProgress(newElapsedSeconds);

  if (isPlaying) {
    isPlaying = false;
    let elapsed = newElapsedSeconds;

    progressInterval = setInterval(() => {
      elapsed++;
      updateProgress(elapsed);

      if (elapsed >= currentTrackDuration) {
        clearInterval(progressInterval);
        const playPauseBtn = document.getElementById("playPauseBtn");
        if (playPauseBtn) {
          playPauseBtn.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/></svg>';
        }
        isPlaying = false;
        updateProgress(0);
      }
    }, 1000);
    isPlaying = true;
  }
}

function handleVolumeBarClick(event) {
  const volumeBarContainer = document.getElementById("volumeBar");
  const volumeFill = document.getElementById("volumeFill");
  if (!volumeBarContainer || !volumeFill) return;

  const rect = volumeBarContainer.getBoundingClientRect();
  const clickY = event.clientY - rect.top;
  const containerHeight = rect.height;
  const clickPercent = Math.min(
    100,
    Math.max(0, 100 - (clickY / containerHeight) * 100)
  );

  volumeFill.style.height = `${clickPercent}%`;
}

// =========================================================================================
// FUNZIONI DI RENDERING E LOGICA PAGINA
// =========================================================================================

function renderTopTracks(tracks, artistName) {
  allTracksCache = tracks;
  const listContainer = document.getElementById("topTracksListContainer");
  if (!listContainer || !tracks || tracks.length === 0) return;

  listContainer.innerHTML = tracks
    .map((track, index) => createTrackItemElement(track, index, artistName))
    .join("");

  document.querySelectorAll(".track-item-spotify").forEach((item) => {
    item.addEventListener("click", () => {
      const trackId = parseInt(item.getAttribute("data-track-id"));
      const track = allTracksCache.find((t) => t.id === trackId);
      handleTrackClick(track, item);
    });
  });

  const showMoreBtn = document.getElementById("showMoreBtn");
  if (tracks.length > MAX_TRACKS_PREVIEW && showMoreBtn) {
    showMoreBtn.classList.remove("d-none");
    showMoreBtn.addEventListener("click", toggleShowMore);
  }
}

function toggleShowMore() {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenTracks = document.querySelectorAll(
    `#topTracksListContainer .track-item-spotify.d-none`
  );

  if (showMoreBtn.innerText.includes("MOSTRA TUTTI")) {
    hiddenTracks.forEach((item) => item.classList.remove("d-none"));
    showMoreBtn.innerText = "MOSTRA MENO";
  } else {
    document
      .querySelectorAll(`#topTracksListContainer .track-item-spotify`)
      .forEach((item, index) => {
        if (index >= MAX_TRACKS_PREVIEW) {
          item.classList.add("d-none");
        }
      });
    showMoreBtn.innerText = "MOSTRA TUTTI";
  }
}

function handleTrackClick(track, trackElement) {
  updatePlayerBar(track);

  document.querySelectorAll(".track-item-spotify").forEach((item) => {
    item.classList.remove("active");
  });

  if (trackElement) {
    trackElement.classList.add("active");
  }

  const likedArtistNameElement = document.getElementById("likedArtistName");
  const likedArtistName = track.artist.name || artistNameCache;
  if (likedArtistNameElement) {
    likedArtistNameElement.innerText = `Di ${likedArtistName}`;
  }
}

function populateLeftSidebar(albums, artistName) {
  const listContainer = document.getElementById("albumsListContainer");
  if (!listContainer || !albums || albums.length === 0) return;

  const albumHtml = albums
    .map(
      (album) => `
        <div class="album-item-sidebar" data-album-id="${album.id}">
            <img src="${album.cover_small}" alt="${
        album.title
      } cover" class="album-cover-sidebar">
            <div class="album-info-sidebar">
                <div class="album-title-sidebar">${album.title}</div>
                <div class="album-year-sidebar">${extractYear(
                  album.release_date
                )} • Album</div>
            </div>
        </div>
    `
    )
    .join("");

  listContainer.innerHTML = albumHtml;

  document.querySelectorAll(".album-item-sidebar").forEach((item) => {
    item.addEventListener("click", (event) => {
      const albumId = item.getAttribute("data-album-id");
      if (albumId) {
        window.location.assign(`/album.html?id=${albumId}`);
      }
    });
  });
}

function updateArtistHeader(artist) {
  if (!artist) return;
  artistNameCache = artist.name;
  artistImageCache =
    artist.picture_xl || artist.picture_big || artist.picture_medium || "";

  const heroImageContainer = document.getElementById("heroImageContainer");
  const artistNameElement = document.getElementById("artistName");
  const artistFansElement = document.getElementById("artistFans");
  const likedArtistImage = document.getElementById("likedArtistImage");

  if (heroImageContainer && artistImageCache) {
    heroImageContainer.style.backgroundImage = `url('${artistImageCache}')`;
  }
  if (artistNameElement) {
    artistNameElement.innerText = artist.name;
  }
  if (artistFansElement && artist.nb_fan) {
    artistFansElement.innerText = `${formatNumber(
      artist.nb_fan
    )} ascoltatori mensili`;
  }
  if (likedArtistImage && artistImageCache) {
    likedArtistImage.src = artistImageCache;
    likedArtistImage.alt = artist.name;
  }
}

const createTrackItemElement = (track, index, artistName) => {
  const rank = index + 1;
  const formattedRank = formatNumber(track.rank || 0);
  const formattedDuration = formatDuration(track.duration);
  const hideClass = rank > MAX_TRACKS_PREVIEW ? "d-none" : "";

  return `
    <li class="track-item-spotify ${hideClass}" data-track-id="${track.id}" data-track-index="${index}">
      <div class="track-number">${rank}</div>
      <div class="track-info-spotify">
        <img src="${track.album.cover_small}" alt="${track.title} cover" class="track-cover-mobile-spotify d-block d-md-none">
        <div class="track-details-spotify d-block d-md-flex flex-column">
            <div class="track-name">${track.title}</div>
            <div class="track-artist-mobile d-block d-md-none">${artistName}</div>
        </div>
      </div>
      <div class="track-plays d-none d-md-block">${formattedRank}</div>
      <div class="track-duration">${formattedDuration}</div>
    </li>
  `;
};

// =========================================================================================
// ASSEGNAZIONE EVENT LISTENERS
// =========================================================================================

function handleSidebarNavigation(event) {
  const link = event.target.closest(".nav-link-spotify");
  if (!link) return;

  event.preventDefault();
  const destination = link.getAttribute("href");

  if (destination && destination !== "#") {
    window.location.assign(destination);
  }
}

function initEventListeners() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", togglePlayPause);
  }

  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.addEventListener("click", handleProgressBarClick);
  }

  const volumeBar = document.getElementById("volumeBar");
  if (volumeBar) {
    volumeBar.addEventListener("click", handleVolumeBarClick);
  }

  const mainPlayBtn = document.getElementById("mainPlayBtn");
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener("click", () => {
      if (allTracksCache.length > 0) {
        const firstTrackElement = document.querySelector(
          '#topTracksListContainer .track-item-spotify[data-track-index="0"]'
        );
        handleTrackClick(allTracksCache[0], firstTrackElement);
      }
    });
  }

  const sidebarNav = document.querySelector(".sidebar-spotify nav");
  if (sidebarNav) {
    sidebarNav.addEventListener("click", handleSidebarNavigation);
  }
}

// =========================================================================================
// FUNZIONE PRINCIPALE
// =========================================================================================
async function loadArtistPage() {
  try {
    const [artistDetails, topTracksData, artistAlbumsData] = await Promise.all([
      fetchArtistDetails(ARTIST_ID),
      fetchTopTracks(ARTIST_ID, 10),
      fetchArtistAlbums(ARTIST_ID),
    ]);

    if (artistDetails) {
      updateArtistHeader(artistDetails);

      if (artistAlbumsData && artistAlbumsData.data) {
        populateLeftSidebar(artistAlbumsData.data, artistDetails.name);
      }

      if (topTracksData && topTracksData.data) {
        renderTopTracks(topTracksData.data, artistDetails.name);
      }
    } else {
      console.error("❌ Impossibile caricare i dati dell'artista.");
    }
  } catch (error) {
    console.error("❌ Errore durante il caricamento:", error);
  }

  initEventListeners();
}

document.addEventListener("DOMContentLoaded", loadArtistPage);
