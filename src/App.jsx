import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import Header from "./components/Header";
import PageTitle from "./components/PageTitle";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();

  return (
    <>
      <Header />

      {navigation.state === "loading" ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Outlet />
      )}
      
      <Footer />
    </>
  );
}

export default App;
