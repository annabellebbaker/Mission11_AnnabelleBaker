import { book } from '../types/book';

interface FetchBooksResponse {
  books: book[];
  totalNumBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sortBy: string,
  sortOrder: string
): Promise<FetchBooksResponse> => {
  // tell it what to do for this function
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`)
      .join('&'); // mapping it out

    const response = await fetch(
      `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}${
        categoryParams ? `&${categoryParams}` : ''
      }`,
      { credentials: 'include' }
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

// const API_URL =
//   'https://bookstore-annabelle-backend-f3g3fpd7f7d8cybe.eastus-01.azurewebsites.net/Book';
