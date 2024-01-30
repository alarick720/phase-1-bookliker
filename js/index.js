document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        const list = document.getElementById('list');
        books.forEach(book => {
          const li = document.createElement('li');
          li.textContent = book.title;
          li.addEventListener('click', () => showBookDetails(book));
          list.appendChild(li);
        });
      });
  });
  function showBookDetails(book) {
    const showPanel = document.getElementById('show-panel');
    showPanel.innerHTML = `
      <img src="${book.thumbnail}" alt="Book thumbnail">
      <p>${book.description}</p>
      <ul>${book.users.map(user => `<li>${user.username}</li>`).join('')}</ul>
      <button id="like-btn">LIKE</button>
    `;
    const likeButton = document.getElementById('like-btn');
    likeButton.addEventListener('click', () => likeBook(book));
  }
  function likeBook(book) {
    const currentUser = { id: 1, username: "pouros" };
    const usersLiked = book.users.concat(currentUser);
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ users: usersLiked }),
    })
    .then(response => response.json())
    .then(updatedBook => {
      book.users = updatedBook.users; // Update the local book's users list
      showBookDetails(book); // Refresh the book details
    });
  }
  function likeBook(book) {
    const currentUser = { id: 1, username: "pouros" };
    let usersLiked;
    if (book.users.some(user => user.id === currentUser.id)) {
      usersLiked = book.users.filter(user => user.id !== currentUser.id);
    } else {
      usersLiked = book.users.concat(currentUser);
    }
    // ... (rest of the PATCH request code)
  }