function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) => borrow.returned === false && total++);
  });
  return total;
}

function getMostCommonGenres(books) {
  let common = {};
  books.forEach((num) => {
    if (common[num.genre]) {
      common[num.genre]++;
    } else {
      common[num.genre] = 1;
    }
  });
  return Object.entries(common)
    .map(([name, count]) => {
      return {
        name,
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
    let theAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    books.forEach((book) => {
      if (book.authorId === author.id) {
        theAuthor.count += book.borrows.length;
      }
    });
    result.push(theAuthor);
  });
  return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
