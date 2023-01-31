import { BrowserRouter, Route } from "react-router-dom";
import { BrowserView } from "react-device-detect";
import ScrollToTop from "Utils/ScrollTop/resetTop";
import DesktopRoutes from "Desktop/index.jsx";
import CopySignature from "Desktop/views/CopySignature/CopySignature";

// Defines primary routing by distinguishing between mobile & desktop app to avoid nesting rendering
// Also provides an auto scroll to top so we don't keep the window scroll from one container to another

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            {/* Desktop view */}
            <Route exact path="/users/:token">
                <CopySignature />
            </Route>
            <BrowserView>
                <DesktopRoutes />
            </BrowserView>
        </BrowserRouter>
    );
}

export default App;
