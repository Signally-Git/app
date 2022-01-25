import { BrowserRouter } from 'react-router-dom'
import { BrowserView } from 'react-device-detect'
import ScrollToTop from 'Utils/ScrollTop/resetTop'
import DesktopRoutes from 'Desktop/index.jsx';

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

    </BrowserRouter>
  )

}

export default App;
