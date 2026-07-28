const carListImage = [

    {id:1, title:"Tesla Model Y", carcategory:"Electric", img:"image/car/teslaY.png", specs:"100% Elec", 
      transmissiontype:"Auto", seater:"5 Seats", price:"3000", perday:"/Day", status:"available",
    },

    {id:2, title:"BYD", carcategory:"Electric", img:"image/car/electric.png", specs:"100% Elec", 
      transmissiontype:"Auto", seater:"4 Seats", price:"900", perday:"/Day", status:"available",
    },

    {id:3, title:"Jetour Ice Cream EV", carcategory:"Electric", img:"image/car/electric1.png", specs:"100% Elec", 
      transmissiontype:"Auto", seater:"4 Seats", price:"800", perday:"/Day", status:"available",
    },

    {id:4, title:"Ford Bronco", carcategory:"SUV", img:"image/car/suv1.png", specs:"12L/100km Deisel", 
      transmissiontype:"Manual", seater:"6 Seats", price:"2800", perday:"/Day", status:"available",
    },

    {id:5, title:"Toyota Fortuner", carcategory:"SUV", img:"image/car/suv2.png", specs:"12L/100km Deisel", 
      transmissiontype:"Auto", seater:"7 Seats", price:"2200", perday:"/Day", status:"available",
    },

    {id:6, title:"Suzuki Ertiga", carcategory:"SUV", img:"image/car/suv3.png", specs:"12L/100km Gas", 
      transmissiontype:"Auto", seater:"7 Seats", price:"1200", perday:"/Day", status:"available",
    },

    {id:7, title:"BMW M4", carcategory:"Luxury", img:"image/car/luxury1.png", specs:"7.5L/100km Gas", 
      transmissiontype:"Auto", seater:"4 Seats", price:"2000", perday:"/Day", status:"available",
    },

    {id:8, title:"Ferrari", carcategory:"Luxury", img:"image/car/luxurycar.png", specs:"7.5L/100km Gas", 
      transmissiontype:"Manual", seater:"4 Seats", price:"3000", perday:"/Day", status:"available",
    },

    {id:9, title:"Mercedez Benz", carcategory:"Van", img:"image/car/vans.png", specs:"9.5L/100km Diesel", 
      transmissiontype:"Manual", seater:"12 Seats", price:"1300", perday:"/Day", status:"available",
    },

    {id:10, title:"Toyota Hi-Ace", carcategory:"Van", img:"image/car/vans1.png", specs:"9.5L/100km Diesel", 
      transmissiontype:"Auto", seater:"12 Seats", price:"1300", perday:"/Day", status:"available", 
    },

    {id:11, title:"Mazda", carcategory:"Economy", img:"image/car/economy.png", specs:"6.5L/100km Gas", 
      transmissiontype:"Manual", seater:"5 Seats", price:"700", perday:"/Day", status:"available", 
    },

    {id:12, title:"Nissan", carcategory:"Economy", img:"image/car/economy1.png", specs:"6.5L/100km Gas", 
      transmissiontype:"Manual", seater:"5 Seats", price:"600", perday:"/Day", status:"available", 
    },
];


// Get the Array from carListImage and save to cars
if (!localStorage.getItem("cars")) {
    localStorage.setItem("cars", JSON.stringify(carListImage)); //put carListImage to cars
}

let cars = JSON.parse(localStorage.getItem("cars"));
// ================================================================

let selectedCategory = "all";
let selectedTransmission = "";

// Slider Button
const priceSlider = document.querySelector(".price-slider");
const currentPrice = document.querySelector(".current-price");

let selectedPrice = Number(priceSlider.value);

priceSlider.addEventListener("input", () => {

    selectedPrice = Number(priceSlider.value);
    currentPrice.textContent = `₱${selectedPrice}`;

    displayCars(selectedCategory);

});


// Sort By
const sortSelect = document.querySelector(".sort-select");
let selectedSort = "recommended";

sortSelect.addEventListener("change", () => {

    selectedSort = sortSelect.value;

    displayCars(selectedCategory);

});



const carGrid=document.querySelector(".car-grid");
        
        // Filter Category of Cars
        function displayCars(carcategory){

            carGrid.innerHTML = "";

            const filteredCars = cars.filter(car => {

                const matchCategory =
                    carcategory === "all" || car.carcategory === carcategory;

                const matchTransmission =
                    selectedTransmission === "" ||
                    car.transmissiontype === selectedTransmission;

                const matchPrice =
                    Number(car.price) <= selectedPrice;

                return matchCategory && matchTransmission && matchPrice;

            });

            // If no Manual or Automatic transmissiontype available this will Alert
            if (filteredCars.length === 0) {

                alert(`No ${selectedTransmission} transmission available for ${carcategory}.`);

                selectedCategory = "all";
                selectedTransmission = "";

                displayCars("all");

                return;
            }


// Sort By Section
        if(selectedSort === "low-high"){

                filteredCars.sort((a,b)=> Number(a.price) - Number(b.price));
            }

            else if(selectedSort === "high-low"){
                filteredCars.sort((a,b)=> Number(b.price) - Number(a.price));
            }

            else if(selectedSort === "recommended"){
                filteredCars.sort((a,b)=> a.id - b.id);
            }
            else if(selectedSort === "top-rated"){
                filteredCars.sort((a,b)=> b.rating - a.rating);
        }


            filteredCars.forEach(car=>{

                carGrid.innerHTML +=`
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
                                    <span class="price"><span>₱</span>${Number(car.price).toLocaleString("en-PH")}</span>
                                    <span class="price-unit">${car.perday}</span>
                                </div>

                                ${
                                    car.status === "available"
                                    ? `<button class="cta-btn rentBtn" data-id="${car.id}">Rent Now</button>`
                                    : `<button class="cta-btn rented-btn" disabled>Rented</button>`
                                }
                            </div>
                        </div>
                    
                    `;
                });
                
        }
        
        displayCars("all");


// Rental Modal Fill Up Form Section 
const confirmBtn = document.querySelector(".confirm-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const closeModal = document.querySelector(".close-modal");
const displayModal = document.querySelector(".rental-modal");
const rentalForm = document.querySelector(".rental-Form");


let selectedCar = null;

[closeModal, cancelBtn].forEach(btn => {
  btn.addEventListener("click", () => {
    displayModal.classList.remove("show");
  });
});



const [nameInput, emailInput, phoneInput, pickupDate, returnDate] = [
        document.querySelector(".name"),
        document.querySelector(".email"),
        document.querySelector(".phone"),
        document.querySelector(".pickup-date"),
        document.querySelector(".return-date"),
];

// Name & Email Validation Regex
const namePattern = /^[a-zA-Z\s]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form Validation Section
confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const pickup = pickupDate.value.trim();
    const returnDay = returnDate.value.trim();

    if (name==="" || email==="" || phone==="" || pickup==="" || returnDay===""){
        alert("Please fill in all required fields.");
        return;
    }

    if(!namePattern.test(name)){
        alert("Name should contain letters and spaces only.");
        nameInput.focus(); return;
    }

    if(!emailPattern.test(email)){
        alert("Please enter valid email address!");
        emailInput.focus(); return;
    }

    if (!selectedCar) return;



    // Update selected car information
    selectedCar.status = "rented";
    selectedCar.pickupDate = pickup;
    selectedCar.returnDate = returnDay;


    localStorage.setItem("cars", JSON.stringify(cars));

    console.log(localStorage.getItem("cars"));

    displayCars(selectedCategory);

    displayModal.classList.remove("show");

        alert(`✅ You have successfully rented the ${selectedCar.title}!`);

    // rentalForm.reset();

    selectedCar = null;

    
});




document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("rentBtn")) return;

    const id = Number(e.target.dataset.id);
    const car = cars.find(car => car.id === id);

    if (!car) return;

    if (car.status === "available") {
        selectedCar = car;
        displayModal.classList.add("show");
    } else {
        alert("This car is already rented.");
    }

});


// Select Transmission Manual or Automatic
const transmissionOption = document.querySelectorAll(".toggle-btn");

transmissionOption.forEach(opt=>{

    opt.addEventListener("click",()=>{

        transmissionOption.forEach(b=>{
            b.classList.remove("active");
        });

        opt.classList.add("active");

        // Save selected transmission
        selectedTransmission = opt.dataset.transmissiontype;

        // Refresh cars
        displayCars(selectedCategory);

    });

});


// Select Option For Vehicle Type
const checkboxes = document.querySelectorAll(".check-item");
const loading = document.querySelector(".loading");

checkboxes.forEach(box => {
    box.addEventListener("change", () => {

        if (box.checked) {

            checkboxes.forEach(item => {
                if (item !== box) {
                    item.checked = false;
                }
            });

            box.checked = true;
            selectedCategory = box.value;

            loading.style.display = "flex";
            carGrid.style.display = "none";

            setTimeout(() => {

                displayCars(selectedCategory);

                loading.style.display = "none";
                carGrid.style.display = "grid";

            }, 1500); // half-second loading effect

        }

    });
});

// Reset All
const resetBtn = document.querySelector(".reset-btn");
    resetBtn.addEventListener("click",()=>{

        localStorage.removeItem("cars");
        location.reload();
    });

  
  

    

    