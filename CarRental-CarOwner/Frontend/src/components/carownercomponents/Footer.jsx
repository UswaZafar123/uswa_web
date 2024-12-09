import "../../styles/components2/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-company">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>1st Floor, Ufone Tower, F-6</p>
          <p>F-6, Islamabad</p>
          <p>Email: aurcorps@123.pk</p>
          <p>Phone: +92 320 654 76 76</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© AUR_Corps.pk 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
