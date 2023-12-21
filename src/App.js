import winedata from "./Data/WineData.json";
import FlavanoidsGamma from "./Page/FlavanoidsGamma";

function App() {
  return (
    <div className="App">
      <>
        <FlavanoidsGamma winedata={winedata} />
      </>
    </div>
  );
}

export default App;
