import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]); // call api and get json

  useEffect(() => {
    const fetchCategories = async () => {
      // try catch block
      try {
        const response = await fetch(
          'https://bookstore-annabelle-backend-f3g3fpd7f7d8cybe.eastus-01.azurewebsites.net/Book/GetCategories',
          { credentials: 'include' }
        ); // got requested response
        // check the link if data isn't showing up to make sure the data is pulling up on the json
        const data = await response.json();
        console.log('Fetched categories:', data); // prints something on the screen to help us in our programming
        setCategories(data); // await change in data
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  // inside component
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // what is the target and type, which boxes were checked?
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    // select category to see if it's already in there, if true = ?
    setSelectedCategories(updatedCategories); // const setSelectedCategories = updatedCategories essentially in shorthand
  }

  return (
    <>
      <div className="category-filter">
        <h5>Book types</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c} className="category-text">
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
