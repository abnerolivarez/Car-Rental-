

document.addEventListener("click", (e) => {

    const heartBtn = e.target.closest(".heart-btn");

    if (!heartBtn) return;

    const id = Number(heartBtn.dataset.id);

    let cars = JSON.parse(localStorage.getItem("cars")) || [];

    const car = cars.find(car => car.id === id);

    if (!car) return;

    car.liked = !car.liked;

    localStorage.setItem("cars", JSON.stringify(cars));

    const icon = heartBtn.querySelector("i");
    const badge = heartBtn.parentElement.querySelector(".favorite-badge");
    const floatingHeart = heartBtn.parentElement.querySelector(".floating-heart");

    icon.classList.toggle("fa-regular", !car.liked);
    icon.classList.toggle("fa-solid", car.liked);

    // Animate heart icon
    icon.classList.remove("animate");
    void icon.offsetWidth;
    icon.classList.add("animate");

    // Animate floating heart
    floatingHeart.classList.remove("animate");
    void floatingHeart.offsetWidth;
    floatingHeart.classList.add("animate");

    // Show / hide badge
    if (car.liked) {
        badge.classList.add("show");
        badge.textContent = "1";
    } else {
        badge.classList.remove("show");
        badge.textContent = "0";
    }

});




