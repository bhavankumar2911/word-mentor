import "../styles/globals.css";
import ContextProvider from "../context";
import FlashMessage from '../components/FlashMessage'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      {/* <FlashMessage /> */}
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
