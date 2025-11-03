var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  hashNavigation: {
    watchState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const searchInput = "queen"

const getData = async () => {

  const URLData = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`

  const response = await fetch(URLData)

  return response.json()

}

getData()
  .then(res => console.log(res))