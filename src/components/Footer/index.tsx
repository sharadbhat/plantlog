import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { openAddFormModal } from "../../utils/modalOpener";
import classes from "./index.module.css";

const Footer = () => {
  return (
    <div className={classes.footerContainer}>
      <div
        className={classes.footerContent}
        role="button"
        onClick={openAddFormModal}
      >
        <IconSquareRoundedPlus
          size={60}
          color={`var(--mantine-color-myColor-8)`}
        />
      </div>
    </div>
  );
};

export default Footer;
