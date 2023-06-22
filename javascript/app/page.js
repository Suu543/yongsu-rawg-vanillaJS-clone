const root = document.getElementById("root");
const container = document.querySelector(".container");
const pageWrapper = document.querySelector(".pagination");
const loading = document.querySelector(".loading");
let activeButton = "";

async function run() {
  // https://api.rawg.io/api/games?key=15bb57f3ba884c3dabfd98e4ab984b28&page=
  // "", false, 0, [], {}
  setLoading(true);
  const { results, count } = await getGames();
  const numOfPages = Math.ceil(count / 20);

  visualizeData(results);
  createNavigation(1, numOfPages);

  setLoading(false);
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
  const cardContent = createElement("div", "", ["cardContent"]);
  const cardTitle = createElement("h3", name, ["cardTitle"]);
  const cardRating = createElement("span", `rating: ${rating}`, ["cardRating"]);
  const cardReleased = createElement("span", `released: ${released}`, [
    "cardReleased",
  ]);

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

function createNavigation(page, numOfPages) {
  pageWrapper.textContent = "";

  const pages = pagination(page, numOfPages);

  for (let i = 0; i < pages.length; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = pages[i];

    if (pages[i] == page) {
      activeButton = pageBtn;
      pageBtn.classList.add("active");
    }

    if (typeof pages[i] === "number") {
      pageBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        setLoading(true);

        if (activeButton) {
          activeButton.classList.remove("active");
          activeButton = e.target;
          activeButton.classList.add("active");
        }

        const page = parseInt(e.target.textContent);
        const newPageData = await getGame(page);

        createNavigation(page, numOfPages);
        visualizeData(newPageData);

        setLoading(false);
        scrollToTop();
      });
    }

    pageWrapper.appendChild(pageBtn);
  }
}

function setLoading(status) {
  if (status) {
    container.style.display = "none";
    pageWrapper.style.display = "none";
    loading.style.display = "block";
  } else {
    container.style.display = "grid";
    pageWrapper.style.display = "flex";
    loading.style.display = "none";
  }
}
