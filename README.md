# CineBook

An interactive front-end movie ticket booking website created with HTML, CSS, and JavaScript.

## Run it

1. Open `index.html` in a modern browser, or open the folder in VS Code and use the **Live Server** extension.
2. Start at the Movies page.
3. Pick a film, select a show, choose seats, complete the demo checkout, and view the ticket.

No installation, server, account, database, or payment setup is needed.

## What to demonstrate

- Search and filter movies by genre.
- Change movie date, theatre, and showtime.
- Select seats; booked seats cannot be selected.
- See ticket counts and price totals update immediately.
- Refresh the page after booking: seats remain booked using browser `localStorage`.
- Open **My bookings** to see saved ticket history.
- Use the theme icon in the top-right corner to switch themes.

## Main files

- `index.html` — home page and movie list
- `movie.html` — movie details and showtimes
- `seats.html` — interactive seating plan
- `checkout.html` — details form and payment simulation
- `confirmation.html` — ticket and booking history
- `css/style.css` — all responsive styling
- `js/data.js` — sample movie and theatre data

## Customise it

Edit the `movies` list in `js/data.js` to change titles, genres, prices, descriptions, and colour themes. The project uses illustrated gradient posters so no image downloads are required.
