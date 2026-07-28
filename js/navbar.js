// Navbar Menu 
// Navbar Menu 
fetch("navbar.html")
    .then(response => response.text())
    .then(data => {

        document.querySelector(".navbar").innerHTML = data;


        const navMenu = document.querySelectorAll(".nav-menu");

        navMenu.forEach(el => {

            el.addEventListener("click", () => {

                navMenu.forEach(btn => {
                    btn.classList.remove("active");
                });

                el.classList.add("active");

            });

        });



        // Burger Menu Section
        const navbarLinks = document.querySelector(".navbar-links");
        const burgerContainer = document.querySelector(".burgerBtn-container");


        burgerContainer.addEventListener("click", () => {

            burgerContainer.classList.toggle("active");
            navbarLinks.classList.toggle("show");

        });



        // ===== Dark Mode Section=====

        const themeBtn = document.querySelector(".theme-btn");
        const icon = themeBtn.querySelector("i");

        const savedTheme = localStorage.getItem("theme");

        if(savedTheme === "light"){
            document.body.classList.add("light-mode");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }

        themeBtn.addEventListener("click",()=>{
            document.body.classList.toggle("light-mode");
            if(document.body.classList.contains("light-mode")){

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

                localStorage.setItem("theme","light");

            }else{
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

                localStorage.setItem("theme","dark");
            }
        });

});



// Footer Section, fetching the footer from footer.html
fetch("footer.html")
    .then(response=>response.text())
    .then(data=>{
        document.querySelector(".footer").innerHTML = data;
});






