// Get the number of books you have read
const readCount = document.querySelectorAll('.done .book-entry').length;

// Update the book count in the HTML
const readCountElement = document.getElementById('read-count');
readCountElement.textContent = readCount;

const lastUpdatedElement = document.getElementById('last-updated');

const lastUpdatedTimestamp = new Date('2023-09-01T22:02:45').getTime(); // Replace with time

const formattedDate = new Date(lastUpdatedTimestamp).toLocaleString('en-US', {
    timeZone: 'America/Chicago', 
});

const toggleIcons = document.querySelectorAll('.toggle-icon');

toggleIcons.forEach((toggleIcon) => {
    toggleIcon.addEventListener('click', () => {
        console.log("yo");
        const section = toggleIcon.closest('.book-section');
        const sectionContent = section.querySelector('.section-content');
        sectionContent.classList.toggle('expanded');
        sectionContent.classList.toggle('collapsed');
    });
});