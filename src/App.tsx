import {
  AppShell,
  MantineProvider,
  createTheme,
  type MantineColorsTuple,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import CardList from "./components/CardList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddFormModal from "./modals/AddFormModal";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const myColor: MantineColorsTuple = [
  "#fff7eb", // card / input background
  "#ffefd7", // app background
  "#f2e8df",
  "#e6cfb8",
  "#dab48d",
  "#d19d69",
  "#cb8f52", // primary color
  "#b17437",
  "#9e672f", // icon color
  "#6c451c",
];

const theme = createTheme({
  primaryColor: "myColor",
  colors: {
    myColor,
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider
        modals={{
          addFormModal: AddFormModal,
        }}
      >
        <AppShell padding="md" header={{ height: 60 }} footer={{ height: 80 }}>
          <AppShell.Header
            withBorder={false}
            style={{
              backgroundColor: "#ffefd7",
            }}
          >
            <Header />
          </AppShell.Header>
          <AppShell.Main>
            <CardList />
          </AppShell.Main>
          <AppShell.Footer
            withBorder={false}
            style={{
              backgroundColor: "#ffefd7",
            }}
          >
            <Footer />
          </AppShell.Footer>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
