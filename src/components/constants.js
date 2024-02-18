import {
  caliCoast,
  greenHill,
  chemicalPlant,
  emeraldHill,
  iceCap,
  planetWisp,
  sonic,
  sunnyDays,
  welcome,
} from "../assets";

export const albums = [
  {
    name: "Royalty Free Music",
    artist: "Anno Domini Beats",
    image: caliCoast,
    tracks: [
      {
        id: 0,
        title: "Welcome",
        src: welcome,
      },
      {
        id: 1,
        title: "Sunny Days",
        src: sunnyDays,
      },
    ],
  },
  {
    name: "Plasma 3 Music Remixes",
    artist: "Plasma3",
    image: sonic,
    tracks: [
      {
        id: 0,
        title: "Green Hill Zone Remix",
        src: greenHill,
      },
      {
        id: 1,
        title: "Chemical Plant Zone Remix",
        src: chemicalPlant,
      },
      {
        id: 2,
        title: "Emerald Hill Zone Remix",
        src: emeraldHill,
      },
      {
        id: 3,
        title: "Ice Cap Zone Remix",
        src: iceCap,
      },
      {
        id: 4,
        title: "Planet Wisp Remix",
        src: planetWisp,
      },
    ],
  },
];
