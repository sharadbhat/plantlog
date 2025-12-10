import { AppShell, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Header from "./components/Header";
import "@mantine/core/styles.css";
import Footer from "./components/Footer";
import AddFormModal from "./components/AddFormModal";

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
          <AppShell.Main>Main content</AppShell.Main>
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
