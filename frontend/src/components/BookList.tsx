import { useEffect, useState } from 'react';
import { book } from '../types/book';

function BookList() {
  const [books, setBooks] = useState<book[]>([]); // pass in a default array
  const [pageSize, setPageSize] = useState<number>(10); // adjust page size when number is chosen to display
  const [pageNum, setPageNum] = useState<number>(1); // tracking page number and how many are displayed on each page
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks/?pageSize=${pageSize}&pageNum=${pageNum}&sort=${sort}`
      );
      const data = await response.json();
      setBooks(data.books); // setting it equal to the data and we NEED the projects, converting to json makes C# lowercase (HAS TO MATCH)
      setTotalItems(data.totalNumBooks); // setting equal to totalNumBooks
      setTotalPages(Math.ceil(totalItems / pageSize)); // calculating number of pages needed for the page size
    };

    fetchProjects(); // call this method and tries to pull the data, empty array is sent if errored
  }, [pageSize, pageNum, totalItems, sort]); // rerun useEffect when page changes are detected, both are run with use efficiency

  return (
    <>
      <h1>Professor Hilton's Recent Favorite Books</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification/Category: </strong>
                {b.classification}/{b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button> // this button is showing us how to dynamically make buttons for each page
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>

      <button onClick={() => setSort(!sort)}>
        Sort {sort ? 'Default Order' : 'Alphabetically'}
      </button>
    </>
  );
}

export default BookList;
