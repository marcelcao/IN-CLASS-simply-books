import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey)
    .then((bookObj) => {
      getSingleAuthor(bookObj.author_id)
        .then((authorObj) => {
          resolve({ authorObj, ...bookObj });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
    .then(([authorObj, authorBooksArray]) => {
      resolve({ ...authorObj, books: authorBooksArray });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
