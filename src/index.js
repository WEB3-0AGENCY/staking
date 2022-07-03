import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MoralisProvider serverUrl="https://9paos9ehpmff.usemoralis.com:2053/server" appId="6CF08Q5FQ7apoq4tcVbyVR3Lh1vFRktHpE5cYTki">
      <ChakraProvider>
          <App />
      </ChakraProvider>
  </MoralisProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
