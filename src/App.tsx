import { AppShell, MantineProvider } from "@mantine/core";
import Header from "./components/Header";
import "@mantine/core/styles.css";
import Footer from "./components/Footer";

function App() {
  return (
    <MantineProvider>
      <AppShell padding="md" header={{ height: 60 }} footer={{ height: 60 }}>
        <AppShell.Header
          withBorder={false}
          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        >
          <Header />
        </AppShell.Header>
        <AppShell.Main>Main content</AppShell.Main>
        <AppShell.Footer
          withBorder={false}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
