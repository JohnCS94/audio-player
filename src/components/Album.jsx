import { useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { albums, songs } from "./constants";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Album = ({ album, setAlbum, song, setSong }) => {
  const [activeAlbum, setActiveAlbum] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveAlbum(swiper.activeIndex);
  };

  return (
    <>
      <div
        style={{
          width: "90%",
        }}
      >
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.5}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          onSlideChange={handleSlideChange}
          initialSlide={0}
        >
          {albums.map((album) => {
            return (
              <SwiperSlide key={album.name}>
                <img src={album.image} height={180} width={180} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="album-title">{albums[activeAlbum].name}</div>
      <div className="album-artist">{albums[activeAlbum].artist}</div>
      <div className="album-songs-container ">
        {albums[activeAlbum].tracks.map((t, index) => {
          const isPlaying = () => {
            if (activeAlbum === album && index === song) return true;
            return false;
          };

          return (
            <div
              className="track"
              key={t.id}
              style={{
                border: isPlaying() ? ".5px solid white" : "none",
              }}
            >
              <div>{t.title}</div>
              <IconButton
                sx={{ marginRight: 2 }}
                onClick={() => {
                  setAlbum(activeAlbum);
                  setSong(index);
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
