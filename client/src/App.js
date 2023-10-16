import logo from './logo.svg';
import './App.css';
import Heading from "../src/components/Heading";
import SearchCrypto from './components/SearchCrypto';
import CryptoPriceChart from './components/CryptoPriceChart';

function App() {
  return (
    <div className="App">
      <Heading></Heading>
      <SearchCrypto></SearchCrypto>
      <CryptoPriceChart></CryptoPriceChart>
    </div>
  );
}

export default App;
