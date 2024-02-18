import { useState, useRef, useEffect } from "react";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { albums } from "./constants";

const Volume = ({ volume, sx }) => {
  if (volume > 0.7) return <VolumeUp sx={sx} />;
  else if (volume > 0.2) return <VolumeDown sx={sx} />;
  else return <VolumeMute sx={sx} />;
};

const Player = ({ setAnalyzerData, album, song, setSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef();
  const source = useRef();
  const analyzer = useRef();

  const buttonSX = { background: "#1e304a", marginX: 2 };
  const iconSX = { color: "white", fontSize: 25 };

  const initVisualizer = () => {
    let audioCtx = new AudioContext();
    if (!source.current) {
      source.current = audioCtx.createMediaElementSource(audioRef.current);
      analyzer.current = audioCtx.createAnalyser();
      source.current.connect(analyzer.current);
      analyzer.current.connect(audioCtx.destination);

      const bufferLength = analyzer.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      setAnalyzerData({ analyzer: analyzer.current, bufferLength, dataArray });
    }
  };

  const handleSeek = (e) => {
    setTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleTimeUpdate = () => setTime(audioRef.current.currentTime);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setMuted(false);
    audioRef.current.volume = newVolume;
  };

  const togglePlayer = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
    initVisualizer();
  };

  const toggleMuted = () => setMuted(!muted);

  const back = () => {
    if (song === 0) setSong(albums[album].tracks.length - 1);
    else setSong(song - 1);
    initVisualizer();
  };

  const forward = () => {
    if (song === albums[album].tracks.length - 1) setSong(0);
    else setSong(song + 1);
    initVisualizer();
  };

  useEffect(() => {
    muted ? (audioRef.current.volume = 0) : (audioRef.current.volume = volume);
  }, [muted, volume]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleAudioEnded = () => {
      if (song + 1 < albums[album].tracks.length) {
        setSong(song + 1);
      } else {
        setSong(0);
      }
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleAudioEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [song, album]);

  useEffect(() => {
    if (!audioRef.current.paused) setIsPlaying(true);
    else setIsPlaying(false);
  }, [audioRef.current?.paused]);

  return (
    <div className="player">
      <div className="album-image">
        <img
          src={albums[album].image}
          width={"100%"}
          height={"100%"}
          alt={albums[album].name}
        />
      </div>
      <div className="title">{albums[album].tracks[song].title}</div>
      <div className="album">{albums[album].name}</div>
      <div className="artist">{albums[album].artist}</div>
      <audio
        ref={audioRef}
        src={albums[album].tracks[song].src}
        onTimeUpdate={handleTimeUpdate}
      />
      <input
        className="seeker"
        type="range"
        min={0}
        max={
          audioRef.current && audioRef.current.duration
            ? parseFloat(audioRef.current.duration)
            : 0
        }
        value={time}
        onChange={handleSeek}
      />
      <div className="controls">
        <IconButton sx={buttonSX} onClick={back}>
          <FastRewind sx={iconSX} />
        </IconButton>
        <IconButton sx={buttonSX} onClick={togglePlayer}>
          {!isPlaying ? <PlayArrow sx={iconSX} /> : <Pause sx={iconSX} />}
        </IconButton>
        <IconButton sx={buttonSX} onClick={forward}>
          <FastForward sx={iconSX} />
        </IconButton>
      </div>
      <div className="footer">
        <input
          className="volume"
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
        />
        <IconButton onClick={toggleMuted}>
          {muted ? (
            <VolumeOff sx={{ color: "white" }} />
          ) : (
            <Volume volume={volume} sx={{ color: "white" }} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Player;
