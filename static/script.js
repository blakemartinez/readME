const readCount = document.querySelectorAll('.done .book-entry').length;

const readCountElement = document.getElementById('read-count');
readCountElement.textContent = readCount;

const lastUpdatedElement = document.getElementById('last-updated');

const lastUpdatedTimestamp = new Date('2023-09-10T11:32:32').getTime(); 

const formattedDate = new Date(lastUpdatedTimestamp).toLocaleString('en-US', {
    timeZone: 'America/Chicago', // Set the timezone to Central Time
});
lastUpdatedElement.textContent = `${formattedDate}`;




const readBooks = document.querySelectorAll('.read .book-entry');
const doneBooks = document.querySelectorAll('.done .book-entry');

const allReadAndDoneBooks = [...readBooks, ...doneBooks];

const genreCounts = {};

allReadAndDoneBooks.forEach((book) => {
    const genres = book.dataset.genres.split(','); 
    genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
});




for (const genre in genreCounts) {
    const tallyElement = document.querySelector(`.${genre} .genre-count`);
    if (tallyElement) {
        tallyElement.textContent = `${genreCounts[genre]}`;
    }
}

// Get all book entry elements
const bookEntries = document.querySelectorAll('.book-entry');

// Add a click event listener to each book entry
bookEntries.forEach((bookEntry) => {
    // Find the review container within the book entry
    const reviewContainer = bookEntry.querySelector('.review-container');
    
    // Add a click event listener to the book entry
    bookEntry.addEventListener('click', () => {
        // Toggle the visibility of the review container
        reviewContainer.classList.toggle('show-review');
    
        const clickNote = document.querySelector('.click-note');
        if (clickNote) {
            clickNote.style.display = 'none';
        }
    });
});
