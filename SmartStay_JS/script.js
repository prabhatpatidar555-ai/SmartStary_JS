
 // Sample hotel data

const hotels = [
    {
        id: 1,
        name: "Hotel Comfort Inn",
        city: "Indore",
        price: 1200,
        rating: 3.9,
        facilities: ["Free Wi-Fi", "Parking"],
        image: "photo-1564501049412-61c2a3083791"
    },
    {
        id: 2,
        name: "Hotel Royal Palace",
        city: "Indore",
        price: 1500,
        rating: 4.2,
        facilities: ["Free Wi-Fi", "Restaurant"],
        image: "photo-1571896349842-33c89424de2d"
    },
    {
        id: 3,
        name: "Hotel Paradise",
        city: "Bhopal",
        price: 2000,
        rating: 4.5,
        facilities: ["Swimming Pool", "Restaurant"],
        image: "photo-1582719478250-c89cae4dc85b"
    },
    {
        id: 4,
        name: "Hotel Grand Residency",
        city: "Bhopal",
        price: 1800,
        rating: 4.4,
        facilities: ["Free Wi-Fi", "Parking"],
        image: "photo-1566073771259-6a8506099945"
    },
    {
        id: 5,
        name: "Hotel Green View",
        city: "Jaipur",
        price: 1300,
        rating: 4.1,
        facilities: ["Restaurant", "Parking"],
        image: "photo-1542314831-068cd1dbfeeb"
    },
    {
        id: 6,
        name: "Hotel Blue Ocean",
        city: "Goa",
        price: 2500,
        rating: 4.7,
        facilities: ["Swimming Pool", "Free Wi-Fi"],
        image: "photo-1571003123894-1f0594d2b5d9"
    }
];

// Get HTML elements

const hotelList = document.getElementById("hotelList");
const searchForm = document.getElementById("searchForm");
const sortPrice = document.getElementById("sortPrice");
const resultMessage = document.getElementById("resultMessage");

let filteredHotels = [...hotels];

// Display hotels

function displayHotels(hotelData) {
    hotelList.innerHTML = "";

    if (hotelData.length === 0) {
        hotelList.innerHTML = `
            <div class="no-results">
                <h3>No hotels found!</h3>
                <p>Try searching another city.</p>
            </div>
        `;

        resultMessage.textContent = "No matching hotels found.";
        return;
    }

    resultMessage.textContent =
        `Showing ${hotelData.length} hotel(s). Prices are per night.`;

    hotelData.forEach(function (hotel) {
        const card = document.createElement("article");
        card.className = "hotel-card";

        card.innerHTML = `
            <img
                src="https://images.unsplash.com/${hotel.image}?auto=format&fit=crop&w=700&q=80"
                alt="${hotel.name}"
                loading="lazy"
            >

            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p class="location">📍 ${hotel.city}</p>
                <p class="rating">⭐ ${hotel.rating} / 5</p>

                <div class="facilities">
                    ${hotel.facilities.map(function (facility) {
                        return `<span>${facility}</span>`;
                    }).join("")}
                </div>

                <div class="price-row">
                    <div class="price">
                        ₹${hotel.price.toLocaleString("en-IN")}
                        <small>per night</small>
                    </div>

                    <button
                        class="book-btn"
                        onclick="bookHotel(${hotel.id})"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        `;

        hotelList.appendChild(card);
    });
}

// Search hotels by city and dates

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document
        .getElementById("city")
        .value.trim()
        .toLowerCase();

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates.");
        return;
    }

    if (checkout <= checkin) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    filteredHotels = hotels.filter(function (hotel) {
        return hotel.city.toLowerCase().includes(city);
    });

    sortHotels();

    const nights = getNights(checkin, checkout);

    if (filteredHotels.length > 0) {
        resultMessage.textContent =
            `${filteredHotels.length} hotel(s) found for ${nights} night(s).`;
    }

    document.getElementById("hotels").scrollIntoView({
        behavior: "smooth"
    });
});

// Calculate number of nights

function getNights(checkin, checkout) {
    const start = new Date(checkin + "T00:00:00");
    const end = new Date(checkout + "T00:00:00");

    return Math.round(
        (end - start) / (1000 * 60 * 60 * 24)
    );
}

// Sort hotels by price

function sortHotels() {
    const sortValue = sortPrice.value;

    if (sortValue === "low") {
        filteredHotels.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
        filteredHotels.sort((a, b) => b.price - a.price);
    }

    displayHotels(filteredHotels);
}

sortPrice.addEventListener("change", sortHotels);

// Demo booking and confirmation page

function bookHotel(hotelId) {
    const hotel = hotels.find(function (item) {
        return item.id === hotelId;
    });

    if (!hotel) {
        alert("Hotel not found.");
        return;
    }

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates first.");
        return;
    }

    if (checkout <= checkin) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    const nights = getNights(checkin, checkout);
    const total = hotel.price * nights;

    const confirmed = confirm(
        "Confirm your demo booking?\n\n" +
        "Hotel: " + hotel.name + "\n" +
        "City: " + hotel.city + "\n" +
        "Check-in: " + checkin + "\n" +
        "Check-out: " + checkout + "\n" +
        "Nights: " + nights + "\n" +
        "Total amount: ₹" + total.toLocaleString("en-IN")
    );

    if (!confirmed) {
        return;
    }

    const booking = {
        hotel: hotel.name,
        city: hotel.city,
        checkin: checkin,
        checkout: checkout,
        nights: nights,
        guests: 1,
        price: hotel.price,
        total: total
    };

    sessionStorage.setItem(
        "smartstayBooking",
        JSON.stringify(booking)
    );

    window.location.href = "booking-confirmation.html";
}

// Demo login button

function showLogin() {
    alert("Login feature will be added in the next step.");
}

// Show all hotels when the page opens

displayHotels(filteredHotels);
