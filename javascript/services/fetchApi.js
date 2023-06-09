const RAWG_KEY = "15bb57f3ba884c3dabfd98e4ab984b28";
const URL = "https://api.rawg.io/api/";

async function fetchData(key) {
  try {
    const url = `${URL}${key}?key=${RAWG_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error: ", err);
  }
}
