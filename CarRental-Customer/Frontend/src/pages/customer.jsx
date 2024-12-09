import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/admin/editcar.css"; // Reusing the same dark theme CSS
// import Navbar from "../../CustomerComponents/Navbar.jsx";
const token = localStorage.getItem("token");
const geminiApiKey = "AIzaSyB0EUOrod2Uo6iBBWdLpE0skjyxnEZuV1E";
import { useNavigate } from "react-router-dom";

const CustomerPanel = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price
  const [wishlist, setWishlist] = useState([]); // To store cars added to the wishlist
  const [cart, setCart] = useState([]); // To store cars added to the cart
  const [messages, setMessages] = useState([]); // Store chatbot conversation
  const [chatInput, setChatInput] = useState(""); // Store user input
  const navigate = useNavigate();

  // Fetch all cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/cars/get-all-cars",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCars(response.data);
        setFilteredCars(response.data); // Initialize filteredCars with all cars
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleAddToWishlist = async (car) => {
    try {
      console.log("Adding to wishlist:", car._id);
      const response = await axios.post(
        "http://localhost:3001/api/favorites",
        { itemId: car._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setWishlist([...wishlist, car]);
        alert(`${car.make} ${car.model} has been added to your favorites!`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.response || error);
      alert("Failed to add the car to your favorites. Please try again.");
    }
  };
  

  // Query Gemini API for chatbot responses
  async function queryGeminiApi(userInput) {
    const API_KEY = geminiApiKey;
    const MODEL_NAME = "gemini-1.5-flash-latest";

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: userInput,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to fetch response"
        );
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        const contentText = data.candidates[0].content.parts[0].text;
        return contentText;
      } else {
        throw new Error("Unexpected response structure: No candidates found");
      }
    } catch (error) {
      console.error("Error querying Gemini API:", error);
      return "Sorry, something went wrong while generating a response. Please try again.";
    }
  }
  const handleBuy = (car) => {
    navigate(`/buy/${car._id}`);
  };
  
  const handleRent = (car) => {
    navigate(`/rent/${car._id}`);
  };
  

  // Handle chat input submission
  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    // Add user's message to the chat
    const userMessage = { role: "user", content: chatInput };
    setMessages((prev) => [...prev, userMessage]);

    // Simple filter to check if the input is related to cars
    const carKeywords = [
      "car",
      "vehicle",
      "automobile",
      "engine",
      "tire",
      "brake",
    ];
    const isCarRelated = carKeywords.some((keyword) =>
      chatInput.toLowerCase().includes(keyword)
    );

    if (!isCarRelated) {
      // Add a bot response stating it only answers car-related queries
      const botMessage = {
        role: "bot",
        content:
          "I'm sorry, I can only answer car-related queries. Please ask about cars.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setChatInput(""); // Clear the input field
      return;
    }

    // Query Gemini API if the query is car-related
    const response = await queryGeminiApi(chatInput);

    // Add bot's response to the chat
    const botMessage = { role: "bot", content: response };
    setMessages((prev) => [...prev, botMessage]);

    // Clear the input field
    setChatInput("");
  };


  // Handle adding a car to the cart
  const handleAddToCart = (car) => {
    setCart([...cart, car]);
  };

  // Handle booking a car
  const handleBookRent = (car) => {
    alert(`Car ${car.make} ${car.model} booked for rent!`);
  };

  // Filter cars based on the price range
  const handlePriceFilter = () => {
    const filtered = cars.filter(
      (car) => car.pricePerDay >= minPrice && car.pricePerDay <= maxPrice
    );
    setFilteredCars(filtered);
  };
  const handleAddReview = (car) => {
    navigate(`/review/${car._id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="header">
          <h1>Welcome to the Car Rental Service</h1>
          <p>Explore and book cars easily!</p>
        </div>

        <div className="price-filter">
          
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={handlePriceFilter}>Apply Filter</button>
        </div>

        <div className="car-list">
          {filteredCars.length === 0 ? (
            <p>No cars match the filter criteria.</p>
          ) : (
            filteredCars.map((car) => (
              <div key={car._id} className="car-item">
                <img
                  src={`https://your-server.com/uploads/${car.picture}`}
                  alt="Car"
                  width="100"
                />
                <div>
                  <strong>
                    {car.make} {car.model} ({car.year})
                  </strong>
                  <p>Price per day: ${car.pricePerDay}</p>
                  <p>Mileage: {car.mileage} miles</p>
                  <p>Condition: {car.condition}</p>
                  <p>{car.availability ? "Available" : "Unavailable"}</p>

                  <button onClick={() => handleAddToWishlist(car)}>
                  🤍
                  </button>
                  <button onClick={() => handleAddReview(car)}>
                    Add a Review
                  </button>
                  <button onClick={() => handleBuy(car)}>Buy Now</button>
                  <button onClick={() => handleRent(car)}>Rent Now</button>
                </div>
              </div>
            ))
          )}
        </div>

        

        
      
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.role === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button onClick={handleChatSubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel; 