const root = document.getElementById("root");
const container = document.querySelector(".container");
const pagination = document.querySelector(".pagination");

async function run() {
  // "", false, 0, [], {}
  let activeButton = "";
  const { results, page, previous, count } = await getGames();
  //   const nextPageUrl = data.next;
  //   const numOfPages = data.count / 20;
  //   console.log(numOfPages);

  // https://api.rawg.io/api/games?key=15bb57f3ba884c3dabfd98e4ab984b28&page=

  visualizeData(results);

  for (let page = 1; page < 10; page++) {
    const button = document.createElement("button");
    button.textContent = page;

    if (page == 1) {
      activeButton = button;
      button.classList.add("active");
    }

    button.addEventListener("click", async (e) => {
      e.preventDefault();

      if (activeButton) {
        activeButton.classList.remove("active");
      }

      activeButton = e.target;
      activeButton.classList.add("active");

      let data = await getGame(page);
      visualizeData(data);
    });

    pagination.appendChild(button);
  }
}

run();

function visualizeData(data) {
  container.textContent = "";

  data.forEach((game) => {
    const { name, rating, background_image, released } = game;
    const div = document.createElement("div");
    div.innerHTML = `<div>
        <h1>Name: ${name}</h1>
        <span>Rating: ${rating}</span>
        <span>Released: ${released}</span>
        <img style="width: 300px; height: 200px;" src=${background_image} />
    </div>`;

    container.appendChild(div);
  });
}
