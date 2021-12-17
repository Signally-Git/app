import { BrowserRouter } from 'react-router-dom'
import { BrowserView, MobileView } from 'react-device-detect'
import ScrollToTop from 'Utils/ScrollTop/resetTop'
import DesktopRoutes from 'Desktop';
import MobileRoutes from 'Mobile';

// Defines primary routing by distinguishing between mobile & desktop app to avoid nesting rendering
// Also provides an auto scroll to top so we don't keep the window scroll from one container to another

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Desktop view */}
      <BrowserView>
        <DesktopRoutes />
      </BrowserView>

      {/* Mobile view */}
      <MobileView>
        <MobileRoutes />
      </MobileView>

    </BrowserRouter>
  )

}

export default App;
