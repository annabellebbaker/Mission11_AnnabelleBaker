import { book } from '../types/book';

interface FetchBooksResponse {
  books: book[];
  totalNumBooks: number;
}

// const API_URL = 'https://localhost:5000/Book';

const API_URL =
  'https://bookstore-annabelle-backend-f3g3fpd7f7d8cybe.eastus-01.azurewebsites.net/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortBy: string,
  sortOrder: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  // tell it what to do for this function
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`)
      .join('&'); // mapping it out

    const response = await fetch(
      `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}${
        categoryParams ? `&${categoryParams}` : ''
      }`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    // checking length of selectedCategories
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// asyncronous - means it doesn't have to happen at the same time (function will do its thing while you're doing your stuff)
export const addBook = async (newBook: book): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: book
): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating book', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book', error);
    throw error;
  }
};
