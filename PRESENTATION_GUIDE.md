# CineBook: Simple Presentation Guide

## 1. What is CineBook?

CineBook is an interactive movie-ticket booking website. A user can search for a movie, choose a showtime, select theatre seats, enter their details, and receive a booking ticket.

It was built using:

- **HTML** — creates the pages and their content.
- **CSS** — makes the pages attractive and responsive for phones and laptops.
- **JavaScript** — makes buttons, search, filters, seat selection, totals, and bookings work.
- **localStorage** — saves bookings in the browser without needing a database.

## 2. How to run the project

1. Open the `CineBook` folder.
2. Double-click `index.html`.
3. The website opens in your browser.
4. Begin by selecting any movie card.

If you use VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**. This is optional; double-clicking works for this project too.

## 3. Website flow

```
Home page → Movie details → Select seats → Checkout → Booking confirmation
```

### Home page: `index.html`

This displays all movies as cards. The user can search by movie name or filter by genre.

### Details page: `movie.html`

This displays information about the chosen movie. The user selects a date, theatre, and showtime.

### Seat page: `seats.html`

This is the key interactive page. Green/normal seats are available, red seats are selected, and faded seats are already booked. The ticket total changes automatically.

### Checkout page: `checkout.html`

The user enters name, email, phone number, and payment method. This is a payment *simulation*; no real money is charged.

### Confirmation page: `confirmation.html`

This shows a ticket with booking ID, movie, seats, showtime, and amount. Users can also print the ticket or view their booking history.

## 4. Important code files

| File | What it does |
|---|---|
| `css/style.css` | All colours, layouts, cards, responsive mobile design, and seat appearance. |
| `js/data.js` | Stores the sample movies, prices, theatres, and shared helper functions. |
| `js/home.js` | Displays movie cards; implements search and genre filtering. |
| `js/movie.js` | Shows one selected movie and lets the user choose date, theatre, and showtime. |
| `js/seats.js` | Creates the seat map, selects seats, checks booked seats, and calculates the price. |
| `js/checkout.js` | Validates customer details and saves the final booking. |
| `js/confirmation.js` | Displays the booking ticket and booking history. |

## 5. The most important JavaScript ideas

### Movie data

The project keeps demo movie data inside `js/data.js`:

```js
{ id: 1, title: 'Neon Horizon', genre: 'Sci-Fi', price: 250 }
```

This makes it easy to add or change movies in one place.

### Search and filtering

On the home page, JavaScript reads what the user types and only displays matching movies. It also checks the selected genre.

### Seat selection

Each seat is a button. When clicked, JavaScript adds or removes the `selected` CSS class. The code then updates the chosen-seat list and price.

### Saving bookings

`localStorage` is built into the browser. The project uses it to save the selected show, booked seats, theme choice, and booking history. Therefore, booked seats still appear unavailable after refreshing the page.

## 6. Suggested teacher demonstration

1. Open the Home page.
2. Search for **Neon** and show that the movie list changes.
3. Clear search, filter by a genre, and choose a movie.
4. Change the date and showtime.
5. Select two seats and point out the total price update.
6. Complete the checkout with sample details.
7. Show the generated ticket and use **My bookings**.
8. Refresh the seat page or create a new booking for the same show to demonstrate that the earlier seats are unavailable.

## 7. Short script for your presentation

> Good morning. My project is CineBook, an interactive online movie-ticket booking website. It is developed using HTML, CSS, and JavaScript. Users can search and filter movies, select a theatre, date, and showtime, and choose their seats from an interactive seat map. The total cost is calculated automatically. The project uses browser localStorage to save bookings, so already booked seats remain unavailable even after the page is refreshed. The payment stage is simulated for demonstration purposes, while the confirmation page generates a ticket with the complete booking details.

## 8. Common questions and answers

**Why did you use localStorage instead of a database?**  
This is a front-end capstone project. localStorage lets me demonstrate persistent booking data without needing a backend server or database. In a real production system, I would use a secure backend database and user authentication.

**Is the payment real?**  
No. It is a simulated payment flow because real payment gateways require secure server-side programming and merchant credentials.

**How do booked seats stay unavailable?**  
When a user confirms a booking, the selected seat names are saved in localStorage. When the same movie, theatre, date, and showtime is opened later, the website reads that saved list and disables those seats.

**How is the price calculated?**  
JavaScript multiplies the movie's ticket price by the number of selected seats.
