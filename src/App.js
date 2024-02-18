import { useState } from "react";

import Container from "./components/Container";
import Visualizer from "./components/Visualizer";

function App() {
  const [analyzerData, setAnalyzerData] = useState(null);

  return (
    <div className="app">
      <div className="visualizer-container">
        <div className="neon-line">
          {analyzerData && <Visualizer analyzerData={analyzerData} />}
        </div>
      </div>
      <Container setAnalyzerData={setAnalyzerData} />
    </div>
  );
}

export default App;
