import { modals } from "@mantine/modals";

export const openAddFormModal = () => {
  modals.openContextModal({
    modal: "addFormModal",
    closeOnClickOutside: false,
    fullScreen: true,
    transitionProps: {
      transition: "fade",
    },
    radius: 0,
    styles: {
      header: {
        backgroundColor: "var(--mantine-color-myColor-1)",
      },
      body: {
        height: `calc(100% - 60px)`,
        backgroundColor: "var(--mantine-color-myColor-1)",
        paddingBottom: 50,
      },
    },
    innerProps: {},
  });
};
