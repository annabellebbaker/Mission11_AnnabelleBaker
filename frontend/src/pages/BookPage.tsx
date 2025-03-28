import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/ProjectList';
import WelcomeBand from '../WelcomeBand';
import CartSummary from '../components/CartSummary';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // selected categories are empty at first

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
