// import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
// import Body from "./components/Body";
import { createContext, useState } from "react";
import BelowHeader from "./components/BelowHeader";


export const AppContext = createContext();

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedin,setIsLoggedin] = useState(false);
  const [user,setUser] = useState("Guest");
  return (
    <Provider store={store}>
      <AppContext.Provider value={{isModalOpen,setIsModalOpen,isSignedUp,setIsSignedUp,isLoggedin,setIsLoggedin,user,setUser}}>
      <div style={{position:"relative"}}>
      <Header />
       {/* <Body/> */}
      
      <Outlet />
     
      <BelowHeader/>
      </div>
      </AppContext.Provider>
      {/* <Footer /> */}
    </Provider>
  );
}

export default App;


