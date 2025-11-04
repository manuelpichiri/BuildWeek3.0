const searchInput = "queen";
const main = document.querySelector(".main-content");
const getData = async () => {
  const URLData = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`;

  const response = await fetch(URLData);

  return response.json();
};

getData().then((res) => console.log(res));
let x = window.matchMedia("(min-width:576px)");

function prova() {
  if (x.matches) {
    main.classList.remove("container-fluid");
    main.classList.add("container");
  }
}

x.addEventListener("change", () => {
  prova();
});
