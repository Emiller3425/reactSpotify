import { useEffect, useState } from 'react'; // <-- Import useEffect
import './App.css';
import './index.css';

// API services
import { testAPI } from './services/apiTest.js';

// components
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';


function App() {

  useEffect(() => {
    // Define a function to call testAPI
    const getData = async () => {
      const data = await testAPI();
      if (data) {
        console.log("data from test api:", data);
      }
    };

    getData();
  }, []);


  return (
    <div class="wrapper bg-gray-500">
      <Header/>
      <div class="flex-1 ">

        {/* Landing Page Content Here */}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
