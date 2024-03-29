import React from 'react';

function NavBar() {
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Add more logout logic as needed, e.g., redirecting the user
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 p-3 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg">League Management</div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          ) : (
            <div>
              <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                Login
              </a>
              <a href="/request-access" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Request Access
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
