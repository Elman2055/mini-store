import "../styles/Card.scss";

let currentIndex = 0;
let products = [];

const renderCards = (productsToRender) => {
  const container = document.createElement("div");
  container.classList.add("container");

  productsToRender.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <p class="card__category">${product.category}</p>
      <img src="${product.image}" alt="${product.title}" class="card__image" />
      <h2 class="card__text_clamp">${product.title}</h2>
      <p class="card__text_clamp card__description">${product.description}</p>
      <p class="card__price">${Math.floor(product.price)} $</p>
      <button class="card__delete_button">Удалить</button>
    `;

    const deleteButton = card.querySelector(".card__delete_button");
    deleteButton.addEventListener("click", () => {
      card.remove();
    });

    container.appendChild(card);
  });

  document.getElementById("app").appendChild(container);

  moveShowMoreButton();
};

const moveShowMoreButton = () => {
  const appContainer = document.getElementById("app");
  const existingButton = appContainer.querySelector(".show-more-button");

  if (existingButton) {
    appContainer.appendChild(existingButton);
  }
};

const createShowMoreButton = () => {
  const button = document.createElement("button");
  button.textContent = "Показать ещё";
  button.classList.add("show-more-button");

  button.addEventListener("click", () => {
    currentIndex += 4;

    if (currentIndex >= products.length) {
      button.style.display = "none";
    } else {
      renderCards(products.slice(currentIndex, currentIndex + 4));
    }
    moveShowMoreButton();
  });

  document.getElementById("app").appendChild(button);
};

export const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();

    renderCards(products.slice(currentIndex, currentIndex + 4));
    createShowMoreButton();
  } catch (e) {
    console.error(e);
  }
};
