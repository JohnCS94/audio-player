import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { ArrowBackIos, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import Player from "./Player";
import Album from "./Album";

const Wrapper = ({ children, flipped, setFlipped }) => {
  const toggleFlipped = () => setFlipped(!flipped);
  return (
    <div className="container">
      <div className="header">
        <IconButton onClick={toggleFlipped}>
          <ArrowBackIos sx={{ color: "white", margin: 2 }} />
        </IconButton>
        <IconButton onClick={toggleFlipped}>
          <Menu sx={{ color: "white", margin: 2 }} />
        </IconButton>
      </div>
      {children}
    </div>
  );
};

const Container = ({ setAnalyzerData }) => {
  const [flipped, setFlipped] = useState(false);
  const [song, setSong] = useState(0);
  return (
    <ReactCardFlip isFlipped={flipped}>
      <Wrapper flipped={flipped} setFlipped={setFlipped}>
        <Player
          setAnalyzerData={setAnalyzerData}
          song={song}
          setSong={setSong}
        />
      </Wrapper>

      <Wrapper flipped={flipped} setFlipped={setFlipped}>
        <Album song={song} setSong={setSong} />
      </Wrapper>
    </ReactCardFlip>
  );
};

export default Container;
