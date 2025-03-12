import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [categoriesAssociatedProducts, setcategoriesAssociatedProducts] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(true); // To toggle the sidebar
  const [isCompact, setCompact] = useState(false); // To handle responsiveness

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchCategories();

    // Handle screen size changes
    const handleResize = () => {
      setCompact(window.innerWidth < 768); // Adjust breakpoint as needed
    };
    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  async function onClickCategory(id) {
    try {
      const response = await fetch(`http://localhost:3001/products?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setcategoriesAssociatedProducts(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger Menu for Compact Mode */}
      {isCompact && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-gray-200 p-2 rounded-md shadow-md dark:bg-gray-700"
        >
          {isSidebarVisible ? 'X' : '---'}
        </button>
      )}

      {/* Sidebar */}
      {(!isCompact || isSidebarVisible) && (
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
          } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                 <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z" clip-rule="evenodd"/>
</svg>

                  <span className="ms-3">Electronics Showroom</span>
                </Link>
              </li>
              {categories.map((res, key) => (
                <Category key={key} id={res.id} title={res.title} />
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}
