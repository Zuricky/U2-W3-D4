const imageContainer = document.querySelector(".album .container .row");
const searchForm = document.getElementById("searchForm");

async function fetchImages(query) {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: { Authorization: "6VZvPQnkMeL9P1PLsVIWad0GYZwqkJE9ddUuURTY3OVq6DZzZWEQTMfv" },
  });
  const data = await response.json();
  displayImages(data.photos);
}

function displayImages(images) {
  imageContainer.innerHTML = "";
  images.forEach((photo) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" alt="${photo.photographer}" onclick="goToDetail(${photo.id})">
                <div class="card-body">
                    <h5 class="card-title">${photo.photographer}</h5>
                    <p class="card-text">ID: ${photo.id}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary view-btn" data-src="${photo.src.large}">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    imageContainer.appendChild(col);
  });
  attachHideEvent();
  attachModalEvent();
}

function attachHideEvent() {
  document.querySelectorAll(".hide-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest(".col-md-4").remove();
    });
  });
}

function attachModalEvent() {
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const imgSrc = this.getAttribute("data-src");
      const modalImg = document.createElement("div");
      modalImg.className = "modal fade";
      modalImg.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Immagine</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img class="img-fluid" src="${imgSrc}" alt="Immagine">
                        </div>
                    </div>
                </div>
            `;
      document.body.appendChild(modalImg);
      new bootstrap.Modal(modalImg).show();
    });
  });
}

function goToDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

document.querySelector(".btn-primary").addEventListener("click", () => fetchImages("hamsters"));
document.querySelector(".btn-secondary").addEventListener("click", () => fetchImages("tigers"));
