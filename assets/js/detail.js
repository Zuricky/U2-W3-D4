const params = new URLSearchParams(window.location.search);
const imageId = params.get("id");
const imageContainer = document.getElementById("imageContainer");

console.log("Resource ID", imageId);

async function fetchImageDetails() {
  const response = await fetch(`https://api.pexels.com/v1/photos/${imageId}`, {
    method: "GET",
    headers: { Authorization: "6VZvPQnkMeL9P1PLsVIWad0GYZwqkJE9ddUuURTY3OVq6DZzZWEQTMfv" },
  });
  const photo = await response.json();
  displayImageDetails(photo);
}

function displayImageDetails(photo) {
  document.body.style.background = `linear-gradient(to bottom, ${photo.avg_color}, #ffffff)`;

  imageContainer.innerHTML = `
        <img src="${photo.src.large}" class="img-fluid mb-3" alt="${photo.photographer}">
        <h2>${photo.photographer}</h2>
        <p><a href="${photo.photographer_url}" target="_blank">Visita il profilo dell'autore</a></p>
    `;
}

function goBack() {
  window.history.back();
}

fetchImageDetails();
