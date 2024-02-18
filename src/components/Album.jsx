import { PlayArrow } from "@mui/icons-material";
import { songs } from "./constants";
import { IconButton } from "@mui/material";

const Album = ({ song, setSong }) => {
  const playing = songs[song];
  const sameAlbum = songs.filter((s) => playing.album === s.album);

  return (
    <>
      <div className="album-image-back">
        <img
          src={songs[song].image}
          width={"100%"}
          height={"100%"}
          alt={playing.album}
        />
      </div>
      <div className="album-title">{playing.album}</div>
      <div className="album-artist">{playing.artist}</div>
      <div className="album-songs-container ">
        {sameAlbum.map((sa) => {
          const isPlaying = playing.id === sa.id;
          return (
            <div
              className="track"
              key={sa.id}
              style={{
                border: isPlaying ? ".5px solid white" : "none",
              }}
            >
              <div>{sa.title}</div>
              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => {
                  setSong(sa.id);
                }}
              >
                <PlayArrow sx={{ fontSize: 19, color: "white" }} />
              </IconButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Album;
