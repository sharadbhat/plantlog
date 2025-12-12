import classes from "./index.module.css";
import logo from "/plant_512_blank.png";

const Header = () => {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <img src={logo} alt="PlantLog Logo" height={50} />
      </div>
    </div>
  );
};

export default Header;
