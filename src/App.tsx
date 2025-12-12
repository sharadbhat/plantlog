import { AppShell, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import CardList from "./components/CardList";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddFormModal from "./modals/AddFormModal";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function App() {
  return (
    <MantineProvider>
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
