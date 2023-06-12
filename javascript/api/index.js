// https://api.rawg.io/api/games?key=YOUR_API_KEY
const API_KEY = "15bb57f3ba884c3dabfd98e4ab984b28";
const URL = "https://api.rawg.io/api/";
const TAGS = {
  CREATOR_ROLES: "creator-roles?key=",
  CREATORS: "creators?key=",
  DEVELOPERS: "developers?key=",
  GAMES: "games?key=",
  GENRES: "genres?key=",
  PLATFORMS: "platforms?key=",
  PUBLISHERS: "publishers?key",
  STORES: "stores?key",
  TAGS: "tags?key",
};

function getCreators() {}
function getDevelopers() {}
function getGenres() {}
function getPlatforms() {}
function getPublishers() {}
function getStores() {}
function getTags() {}

async function getGames(page = false) {
  const url = URL + TAGS["GAMES"] + API_KEY;

  const res = await fetch(url);
  const data = await res.json();

  return {
    results: data.results,
    next: data.next,
    previous: data.previous,
    count: data.count,
  };

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.results));
}

async function getGame(page) {
  // https://api.rawg.io/api/games?key=15bb57f3ba884c3dabfd98e4ab984b28&page=
  const url = URL + TAGS["GAMES"] + API_KEY + "&page=" + page;
  const res = await fetch(url);
  const data = await res.json();

  return data.results;
}
