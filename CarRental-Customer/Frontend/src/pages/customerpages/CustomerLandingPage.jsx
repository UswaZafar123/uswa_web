import React from "react";
import Navbar from "../../CustomerComponents/Customercomponent/Navbar"; // Path to Navbar
//import Footer from "../../components/Customercomponents/footer"; // Path to Footer
import "./LandingPage.css"; // Include the CSS file for styling


const CustomerLandingpage = () => {
  const customerStories = [
    {
      id: 1,
      name: "Uswa Zafar",
      
      story: "Excellent service! Renting a car was so easy, and I found the perfect vehicle for my weekend trip. Highly recommend!",
    },
    {
      id: 2,
      name: "Rehab Imtiaz",
      story: "I bought my dream car through this platform. The process was smooth, and the staff were very helpful in finding exactly what I wanted. Love my new car!",
    },
    {
      id: 3,
      name: "Ali Haider",
      story: "Great experience renting a car for a road trip. The car was clean, well-maintained, and affordable. Will definitely use this service again!",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${backgroundImage})` , backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100vw', height: '100vh'
        }}
      >
        <div className="hero-container">
          <h1 style={{padding: "50px"}}>
          Welcome to AUR CORPS – Your Ultimate Car Rental and Sales Destination!
          
          </h1>
          <p
          style={{color: "white" , fontSize: "1.5rem" , textAlign: "right" , padding: "1px",  borderRadius: "10px" , width: "50%" , margin: "auto",position:"left"
            
          }}>
            Whether you're looking to rent a car for your next adventure or purchase your dream vehicle, we’ve got you covered. Explore our wide range of options and start your journey with us today!
          </p>
          {/*apply the action to shift to View property page */}
          <button className="btn-primary" style={{marginTop: "80px"}} onClick={() => window.location.href = "/ViewProperties"}
          >Explore Cars Now</button>
        </div>
      </section>

      {/* Customer Stories Section */}
      <section className="customer-stories">
        <div className="container">
          <h2>Customer Reviews </h2>
          <div className="grid">
            {customerStories.map((customer) => (
              <div key={customer.id} className="card">
                
                <h3>{customer.name}</h3>
                <p>{customer.story}</p>
              </div>
            ))}
          </div>
          <div className="cta">
            <button className="btn-secondary">Get Customer Stories</button>
          </div>
        </div>
      </section>

     
    </>
  );
};

export default CustomerLandingpage;
