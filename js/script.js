
const CarImage = [
    { id:1, img: "image/car/luxurycar.png", title: "Luxury Cars", description:"40+ Cars Ready", },
    { id:2, img: "image/car/suvs.png", title: "SUVs", description:"50+ Cars Ready", },
    { id:3, img: "image/car/economy.png", title: "Economy", description:"60+ Cars Ready", },
    { id:4, img: "image/car/vans.png", title: "Vans & MPVs", description:"45+ Cars Ready", },
];

const carCategoryImage = document.querySelector(".car-category");

    carCategoryImage.innerHTML = CarImage.map(item=>`
            <div class="carImage-container">
                <a href="carlist.html?=id">
                    <h1>${item.title}</h1>
                    <p>${item.description}</p>
                    <img src="${item.img}" alt="${item.title}">
                </a>
            </div>
        
        `).join("");



// Counter for 
const counters = document.querySelectorAll(".cars-number");
counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    let current = 0;

    const increment = target / 300; // Speed of counting

    function updateCounter() {
        current += increment;

        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }

    updateCounter();
});



const popupContainer = document.querySelector(".popup-message-container");
const availabilityBtn = document.querySelector(".availabilityBtn");
const popupHeadTitle = document.querySelector(".popup-headtitle");
const popupMessage = document.querySelector(".popup-message");

const xmarkIcon =document.querySelector(".xmark-icon");
        xmarkIcon.addEventListener("click",()=>{
        popupContainer.classList.remove("show");
    });



availabilityBtn.addEventListener("click", () => {
    console.log("availabilityBtn");

    const selectedType = document.querySelector(".select").value;
    const pickupDate = document.querySelector('input[name="pickup-date"]').value;
    const returnDate = document.querySelector('input[name="return-date"]').value;


    // Check empty fields
    if (selectedType === "" || pickupDate === "" || returnDate === "") {
        popupContainer.classList.add("show");
        popupHeadTitle.textContent = "Please complete all fields.";
        return;
        
    }else{
        popupContainer.classList.add("show");
        popupHeadTitle.classList.add("show");
    }
        

    

    // Get cars from localStorage
    const cars = JSON.parse(localStorage.getItem("cars")) || [];


    // Filter available cars
    const availableCars = cars.filter(car => 
        car.carcategory === selectedType &&
        car.status === "available"
    );


    if (availableCars.length > 0) {

        popupContainer.classList.add("show");
       

        popupMessage.innerHTML = `
            <strong class="popup-title">Available ${selectedType} Cars:</strong>
            <br><br>

            ${availableCars.map(car => `
                
                
                    <div class="car-card">
                            <div class="card-body">
                                <div class="card-header">
                                    <div>
                                        <h3 class="car-title">${car.title}</h3>
                                        <p class="car-category">${car.carcategory}</p>
                                    </div>

                                    <div class="favorite-container">
                                        <button class="heart-btn text-muted" data-id="${car.id}">
                                            <i class="${car.liked ? "fa-solid" : "fa-regular"} fa-heart"></i>
                                        </button>
                                        <span class="favorite-badge ${car.liked ? "show" : ""}">
                                            ${car.liked ? 1 : 0}
                                        </span>
                                        <i class="fa-solid fa-heart floating-heart"></i>
                                     </div>
                                   
                                </div>
                                
                                <div class="image-container">
                                    <img src="${car.img}" alt="${car.img}">
                                </div>

                                <div class="specs-grid">
                                    <div class="spec-item">
                                        <i class="fa-solid fa-gas-pump"></i>
                                        <span>${car.specs}</span>
                                    </div>
                                    <div class="spec-item">
                                        <i class="fa-solid fa-gear"></i>
                                        <span>${car.transmissiontype}</span>
                                    </div>
                                    <div class="spec-item">
                                        <i class="fa-solid fa-users"></i>
                                        <span>${car.seater}</span>
                                    </div>
                                </div>

                            </div>

                            <div class="card-footer">
                                <div class="price-container">
                                    <span class="price"><span class="currency">₱</span>${Number(car.price).toLocaleString("en-PH")}</span>
                                    <span class="price-unit">${car.perday}</span>
                                </div>

                                ${
                                    car.status === "available"
                                    ? `<button class="cta-btn rentBtn" data-id="${car.id}" onclick="rentbtn()">Rent Now</button>`
                                    : `<button class="cta-btn rented-btn" disabled>Rented</button>`
                                }
                            </div>
                        </div>
                

            `).join("")}
        `;


    } else {
        popupContainer.classList.add("show");
        popupHeadTitle.textContent = `No available ${selectedType} cars at the moment.`;

    }

});


function rentbtn(){
    window.location.href="carlist.html"
}

function aboutUs(){
    window.location.href="about.html"
}

// Contact Form Validation Section
const [nameInsert, emailInsert ] = [
    document.querySelector(".name"),
    document.querySelector(".email"),
];

const formBtn = document.querySelector(".formBtn");
// Name & Email Validation Regex
const namePattern = /^[a-zA-Z\s]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Form Validation Section
formBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInsert.value.trim();
    const email = emailInsert.value.trim();
   

    if (name==="" || email===""){
        alert("Please fill in all required fields.");
        return;
    }

    if(!namePattern.test(name)){
        alert("Name should contain letters and spaces only.");
        nameInsert.focus(); return;
    }

    if(!emailPattern.test(email)){
        alert("Please enter valid email address!");
        emailInsert.focus(); return;
    }

    alert(`Successfully Submitted your inquiry! Thank You!`)

    location.reload();
});








        