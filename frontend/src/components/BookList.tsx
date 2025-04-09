import { useEffect, useState } from 'react';
import { book } from '../types/book';
import { useCart } from '../context/CartContext';
import { cartItem } from '../types/cartItem';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination'; // assuming you have this component

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy] = useState<string>('title');
  const [sortOrder] = useState<string>('asc');
  const [subtotal, setSubtotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, getCartSubtotal } = useCart();

  const handleAddToCart = (book: book) => {
    console.log('Adding book:', book);
    const newItem: cartItem = {
      bookID: Number(book.bookID),
      title: book.title || 'No title found',
      price: Number(book.price),
      quantity: 1,
    };
    addToCart(newItem);
    setSubtotal(getCartSubtotal());
  };

  useEffect(() => {
    setSubtotal(getCartSubtotal());
    console.log(subtotal);
  }, [getCartSubtotal]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortBy,
          sortOrder,
          selectedCategories
        );
        setBooks(data.books);
        setTotalNumBooks(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortBy, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Books</h1>
      <p className="text-center mb-4">Total Books Found: {totalNumBooks}</p>
      <div className="row justify-content-center d-flex">
        {books.map((book) => (
          <div className="col-auto mb-4" key={book.bookID}>
            <div className="card h-100 shadow-sm text-center p-3 w-100">
              <div className="card-body">
                <h5 className="card-title text-wrap">{book.title}</h5>
                <ul className="list-unstyled text-start">
                  <li>
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {book.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {book.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {book.classification}
                  </li>
                  <li>
                    <strong>Category:</strong> {book.category}
                  </li>
                  <li>
                    <strong>Page Count:</strong> {book.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${book.price.toFixed(2)}
                  </li>
                </ul>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAddToCart(book);
                    setSubtotal(getCartSubtotal());
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* after the mapping function for overall pagination */}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
        totalNumBooks={0}
      />
    </div>
  );
}

export default BookList;
