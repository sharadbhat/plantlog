import { modals } from "@mantine/modals";

export const openAddFormModal = () => {
  modals.openContextModal({
    modal: "addFormModal",
    closeOnClickOutside: false,
    radius: "lg",
    fullScreen: true,
    transitionProps: {
      transition: "fade",
    },
    styles: {
      body: {
        height: `calc(100% - 60px)`,
      },
    },
    innerProps: {},
  });
};
