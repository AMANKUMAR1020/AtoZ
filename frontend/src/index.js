import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
	</React.StrictMode>
);













// import { store } from "./redux/store.js";
// import { Provider } from "react-redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import { BrowserRouter, Routes,Route } from "react-router-dom";
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import { ChakraProvider } from '@chakra-ui/react'
// //import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
//     <ChakraProvider>
//       <Provider store={store}>
//         <PersistGate persistor={persistStore(store)}>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/*" element={<App />} />
//             </Routes>
//           </BrowserRouter>
//         </PersistGate>
//       </Provider>
//     </ChakraProvider>
// 	</React.StrictMode>
// );










// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
