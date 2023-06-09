function renderGames(data) {
  // nextPage: 다음 페이지, previousPage: 이전 페이지
  const nextPage = data.next;
  const previousPage = data.previous;
  const games = data.results;

  console.log(games);
}

async function run() {
  const games = await fetchData("games");
  renderGames(games);
}

run();
