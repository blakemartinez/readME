// Get the number of books you have read
const readCount = document.querySelectorAll('.done .book-entry').length;

// Update the book count in the HTML
const readCountElement = document.getElementById('read-count');
readCountElement.textContent = readCount;
