import React, { useState, useEffect } from 'react';
import '../styles/home.css'; // Import the CSS file
import Footer from './sectionComponents/footer'; // Import Footer component

const Home = () => {
  const [memberCount, setMemberCount] = useState(0); // Default to 0 if no members
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Fetch member count from the API when the component mounts
  useEffect(() => {
    fetch('https://oppirifchess-backend.onrender.com/api/member/count')
      .then((response) => response.json())
      .then((data) => {
        const count = data.member_count || 0; // Use 0 if member_count is empty or undefined
        setMemberCount(count); // Set the member count
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((err) => {
        setError("Failed to load member count"); // Set error state if the API call fails
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Empty array means this useEffect runs once when the component mounts

  return (
    <div>
      <main>
        <div className="card">
          <div className="content">
            <h2>Welcome to Oppirif Chess Club</h2>
            <p>
              Ready to sharpen your mind and engage in some friendly competition?<br/>
              At Oppirif Chess Club, we bring together chess enthusiasts of all skill levels to enjoy the timeless game of strategy.<br/>
              Whether you're a beginner or a seasoned player, you'll find a supportive community here.<br/>
              Join us for exciting matches, learning opportunities, and plenty of fun as we grow together as a chess family.
            </p>

            {/* Display member count */}
            <div className="member-count">
              {loading ? (
                <p>Loading member count...</p> // Show loading text while the data is being fetched
              ) : error ? (
                <p>{error}</p> // Show error message if the API call fails
              ) : (
                <p><br/><b>Total Members: {memberCount}</b></p> // Display the member count or 0
              )}
            </div>
          </div>
          
        </div>
        
      </main>
    </div>
  );
};

export default Home;
