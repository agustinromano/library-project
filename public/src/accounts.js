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
  //should return all of the books taken out by an account with the author embedded
  //Declare a variable that will store the value of the final result in an empty array.
  let possessed = [];
  //Declare a variable that will store the value of the matching borrow object.
  let list = [];
  //Loop through the books array using the forEach method and loop through the borrows array using forEach
  books.forEach((item) => {
    //Declare a variable for just the borrows object const borrowed = item.borrows.
    const borrowed = item.borrows;
    //Destructure the book object.
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {},
    };
    //As we loop through the borrowed array check if borrow.id is equal to accountId and borrow.returned == false.
    borrowed.forEach((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        //If conditional is true push the book object into the result array and the borrows object to borrowsMatch array.
        possessed.push(book);
        list.push(borrow);
        book.borrows = list;
        //Filter through the authors array to return one author object whose id matches.
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
