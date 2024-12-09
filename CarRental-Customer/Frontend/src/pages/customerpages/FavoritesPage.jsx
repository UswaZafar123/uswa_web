import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/favorites/all');
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch favorites.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div style={styles.loading}>Loading favorites...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Your Favorites</h1>
      <div style={styles.listContainer}>
        {favorites.length === 0 ? (
          <p style={styles.noFavorites}>No favorites found.</p>
        ) : (
          favorites.map((fav) => (
            <div key={fav._id} style={styles.card}>
              <h3 style={styles.cardTitle}>
                {fav.itemId?.make} {fav.itemId?.model}
              </h3>
              <p style={styles.cardDetail}>Price per day: ${fav.itemId?.pricePerDay}</p>
              <p style={styles.cardDetail}>Mileage: {fav.itemId?.mileage} miles</p>
              <p style={styles.cardDetail}>Condition: {fav.itemId?.condition}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundImage: 'url("https://wallpapers.com/images/hd/4k-bmw-car-in-dark-c0ot64ri2fecu1pr.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    color: '#f5f5f5',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#00aaff',
    marginBottom: '30px',
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    color: '#333',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#00d4ff',
    marginBottom: '10px',
  },
  cardDetail: {
    fontSize: '1rem',
    color: '#666',
    margin: '5px 0',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#f5f5f5',
    textAlign: 'center',
    marginTop: '20px',
  },
  error: {
    fontSize: '1.5rem',
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
  noFavorites: {
    fontSize: '1.2rem',
    color: '#ccc',
    textAlign: 'center',
  },
};

export default FavoritesPage;
