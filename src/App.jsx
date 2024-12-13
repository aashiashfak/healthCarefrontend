import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserRoutes from "./routers/userRouter";
import AuthRoutes from "./routers/AuthRoutes";
import {persistor, store} from "../src/redux/Store/Store";
import {PersistGate} from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import {Toaster} from "sonner";
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading"} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="bottom-right" />
          <Router>
            <Routes>
              <Route path="/*" element={<UserRoutes />} />
              <Route path="auth/*" element={<AuthRoutes />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
