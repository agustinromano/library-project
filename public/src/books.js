function findAuthorById(authors, id) {
  return (found = authors.find((author) => author.id === id));
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  let available = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );
  let unavailable = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  let listBorrows = [[...unavailable], [...available]];
  return listBorrows;
}

function getBorrowersForBook(book, accounts) {
  //should return an array for a book of all borrowers with their information and return status
  let listBorrowers = book.borrows.map((borrow) => {
    let account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
  });
  return listBorrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
