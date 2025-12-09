import addIcon from "/add.png";
import "./index.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <img src={addIcon} alt="Add Icon" height={40} />
      </div>
    </div>
  );
}

export default Footer;
