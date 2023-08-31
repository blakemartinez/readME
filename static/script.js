// Get the number of books you have read
const readCount = document.querySelectorAll('.done .book-entry').length;

// Update the book count in the HTML
const readCountElement = document.getElementById('read-count');
readCountElement.textContent = readCount;

const lastUpdatedElement = document.getElementById('last-updated');

// Set the last updated timestamp to the current time in Central Time (statically)
const lastUpdatedTimestamp = new Date('2023-08-31T00:47:32').getTime(); // Replace with the desired timestamp

// Display the last updated timestamp
const formattedDate = new Date(lastUpdatedTimestamp).toLocaleString('en-US', {
    timeZone: 'America/Chicago', // Set the timezone to Central Time
});
lastUpdatedElement.textContent = `${formattedDate}`;

const readBooks = document.querySelectorAll('.read .book-entry');
const doneBooks = document.querySelectorAll('.done .book-entry');

// Combine the book lists from "read" and "done" sections
const allReadAndDoneBooks = [...readBooks, ...doneBooks];

// Create an object to store genre counts
const genreCounts = {};

// Loop through the combined book list and count genres
allReadAndDoneBooks.forEach((book) => {
    const genres = book.dataset.genres.split(','); // Get genres from dataset
    genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
});

// Update the genre tally elements with the counts
for (const genre in genreCounts) {
    const tallyElement = document.querySelector(`.${genre} .genre-count`);
    if (tallyElement) {
        tallyElement.textContent = `${genreCounts[genre]}`;
    }
}