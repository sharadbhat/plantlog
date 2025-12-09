import logo from "/plant_512_blank.png";
import "./index.css";

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <img src={logo} alt="PlantLog Logo" height={50} />
      </div>
    </div>
  );
}

export default Header;
