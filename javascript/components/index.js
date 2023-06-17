const root = document.getElementById("root");
const container = document.querySelector(".container");
const pagination = document.querySelector(".pagination");
let activeButton = "";

async function run() {
  // "", false, 0, [], {}
  const { results, page, previous, count, next } = await getGames();
  //   const nextPageUrl = data.next;
  //   const numOfPages = data.count / 20;
  //   console.log(numOfPages);

  // https://api.rawg.io/api/games?key=15bb57f3ba884c3dabfd98e4ab984b28&page=

  visualizeData(results);
  createNavigation(10);
}

run();

function visualizeData(data) {
  // page reset
  container.textContent = "";

  data.forEach((game) => {
    const card = cardComponent(game);
    container.appendChild(card);
  });
}

function cardComponent(cardInfo) {
  // article, img, div > h3, p, a
  // console.log("cardInfo: ", cardInfo);
  // Destructing
  const { name, rating, background_image, released } = cardInfo;
  const cardWrapper = createElement("article", "", ["cardWrapper"]);
  const cardImg = createElement("img", background_image, ["cardImg"]);
  const cardContent = createElement("div", "");
  const cardTitle = createElement("h3", name);
  const cardRating = createElement("span", rating);
  const cardReleased = createElement("span", released);

  cardWrapper.appendChild(cardImg);
  cardWrapper.appendChild(cardContent);

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardRating);
  cardContent.appendChild(cardReleased);

  return cardWrapper;
}

function createElement(tag, text = "", classes = []) {
  const element = document.createElement(tag);

  classes.forEach((cls) => {
    element.classList.add(cls);
  });

  if (tag === "img") {
    element.setAttribute("src", text);
  } else if (tag === "a") {
    element.setAttribute("href", text);
  } else {
    element.textContent = text;
  }

  return element;
}

function createNavigation(numOfPages) {
  for (let page = 1; page < numOfPages; page++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = page;

    if (page === 1) {
      activeButton = pageBtn;
      pageBtn.classList.add("active");
    }

    pageBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      if (activeButton) {
        activeButton.classList.remove("active");
        activeButton = e.target;
        activeButton.classList.add("active");

        const newPageData = await getGame(page);
        visualizeData(newPageData);
      }
    });

    pagination.appendChild(pageBtn);
  }
}
