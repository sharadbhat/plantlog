import { modals } from "@mantine/modals";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { CONSTANTS } from "../../constants";
import classes from "./index.module.css";

const Footer = () => {
  const openModal = () => {
    modals.openContextModal({
      modal: "addFormModal",
      closeOnClickOutside: false,
      radius: "lg",
      fullScreen: true,
      transitionProps: {
        transition: "fade",
      },
      innerProps: {},
    });
  };

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerContent} role="button" onClick={openModal}>
        <IconSquareRoundedPlus size={50} color={CONSTANTS.ICON_COLOR} />
      </div>
    </div>
  );
};

export default Footer;
