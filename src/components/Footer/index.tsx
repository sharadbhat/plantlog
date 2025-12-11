import { modals } from "@mantine/modals";
import addIcon from "/add.png";
import "./index.css";

const Footer = () => {
  const openModal = () => {
    modals.openContextModal({
      modal: "addFormModal",
      title: "Add a new plant",
      closeOnClickOutside: false,
      radius: "lg",
      innerProps: {},
    });
  };

  return (
    <div className="footer-container">
      <div className="footer-content" role="button" onClick={openModal}>
        <img src={addIcon} alt="Add Icon" height={40} />
      </div>
    </div>
  );
};

export default Footer;
