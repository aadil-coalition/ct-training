// for searching songs by artists -> https://api.lyrics.ovh/suggest/${artist_name}
// for searching a specific song -> https://api.lyrics.ovh/v1/${artist_name}/${song_name}
// get all the appropriate element done.
// make a search with async call done.
// after successfully getting the json response insert the element one by one done. 
  // into the ul with forloop done.

  // getting appropriate elements.
const loader = document.querySelector('.loader'); 
const searchForm = document.querySelector('form');
const songList = document.querySelector('.song-list');
const searchResultNotice = document.querySelector('.search-results-notice');
const lyricsContainer = document.querySelector('.lyrics-container');


const lyricsURL = 'https://api.lyrics.ovh/';

async function getLyrics(searchQuery) {
  const queryResults = await fetch(`${lyricsURL}/suggest/${searchQuery}`);
  const queryJSON = await queryResults.json();

  displayArtistSongs(queryJSON);
}

function displayArtistSongs(results) {
// gonna display the songs here
searchResultNotice.style.display = "none";
loader.style.display = "none";
results.data.forEach((result) => {
  songList.innerHTML += `
  <li class="song-list-item">
  <span class="artist-name">${result.artist.name} - <span class="song-name">${result.title}</span></span>  
   <button class="get-lyrics-button">get lyrics</button>
  </li>
  `;
});

const allReturnedSongs = document.querySelectorAll('.song-list-item');
allReturnedSongs.forEach((song) => {
  song.addEventListener('click', () => {
    loader.style.display = "block";
    songList.style.display = "none";
    getLyricsForSong(song.firstElementChild.textContent.split('-'));
  });
});
}


async function getLyricsForSong(songArtistArr) {
  let queryResults = await fetch(`${lyricsURL}/v1/${songArtistArr[0]}/${songArtistArr[1]}`);
  queryResults = await queryResults.json();
  displayLyrics(queryResults, songArtistArr);
}


function displayLyrics(result, songArtistArr) {
  console.log(result);
  lyricsContainer.style.display = "block";
  songList.style.display = "none";
  loader.style.display = "none";
  // display lyrics for individual song;
  const lyrics = result.lyrics.replace(/\n/g,'<br>');
  lyricsContainer.innerHTML = `
  <h2 class="lyrics-title">${songArtistArr[0]} - ${songArtistArr[1]}</h2>
  <p class="individual-lyrics">
    ${lyrics}
  </p>
  <button class="lyrics-back">back</button>
  `;

  // display back-btn to go back.
  const lyricsBackButton = document.querySelector('.lyrics-back');
  lyricsBackButton.addEventListener('click', () => {
    lyricsContainer.style.display = "none";
    songList.style.display = "block";
  });
}


searchForm.addEventListener('submit', (e) => {
e.preventDefault();
const typedQuery = document.querySelector('.search-input-box');
loader.style.display = "block";
getLyrics(typedQuery.value);
});