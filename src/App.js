import { AppRouter } from "./routes";
import { LangProvider } from "./contexts/LangContext";

function App() {
    return (
        <LangProvider>
            <AppRouter />
        </LangProvider>
    );
}

export default App;
