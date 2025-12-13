import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { CONSTANTS } from "../../constants";
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
        <IconSquareRoundedPlus size={50} color={CONSTANTS.ICON_COLOR} />
      </div>
    </div>
  );
};

export default Footer;
