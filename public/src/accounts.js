function findAccountById(accounts, id) {
  return (foundAccount = accounts.find((account) => account.id === id));
}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let total = 0;
  books.forEach((book) =>
    book.borrows.forEach((borrow) => accountId === borrow.id && total++)
  );
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let possessed = [];
  let list = [];
  books.forEach((item) => {
    const borrowed = item.borrows;
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {},
    };
    borrowed.forEach((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        possessed.push(book);
        list.push(borrow);
        book.borrows = list;
        book.author = authors.filter((auth) => auth.id === book.authorId)[0];
      }
    });
  });
  return possessed;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
