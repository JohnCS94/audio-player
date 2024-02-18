import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { ArrowBackIos, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import Player from "./Player";
import Album from "./Album";

const Wrapper = ({ children, flipped, setFlipped }) => {
  const toggleFlipped = () => setFlipped(!flipped);
  const iconSX = { color: "white", margin: 2 };

  return (
    <div className="container">
      <div className="header">
        {flipped ? (
          <IconButton onClick={toggleFlipped}>
            <ArrowBackIos sx={iconSX} />
          </IconButton>
        ) : (
          <div className="menu">
            <IconButton onClick={toggleFlipped}>
              <Menu sx={iconSX} />
            </IconButton>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const Container = ({ setAnalyzerData }) => {
  const [flipped, setFlipped] = useState(false);
  const [album, setAlbum] = useState(0);
  const [song, setSong] = useState(0);

  return (
    <ReactCardFlip isFlipped={flipped}>
      <Wrapper flipped={flipped} setFlipped={setFlipped}>
        <Player
          setAnalyzerData={setAnalyzerData}
          album={album}
          song={song}
          setSong={setSong}
        />
      </Wrapper>

      <Wrapper flipped={flipped} setFlipped={setFlipped}>
        <Album
          album={album}
          setAlbum={setAlbum}
          song={song}
          setSong={setSong}
        />
      </Wrapper>
    </ReactCardFlip>
  );
};

export default Container;
