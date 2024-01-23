"use client";

import React, { useRef, useState } from 'react';

export default function AboutVideo() {
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef(null);

  const classes = {
    opened: "opened",
    hidden: "hidden",
    active: "active",
  };
  const handleVideo = () => {
    setIsPlay(!isPlay);
    if (videoRef.current) {
      isPlay ? videoRef.current.pause() : videoRef.current.play();
    }
  };


  return (
      <section>
        <div className="mx-auto  text-gray-200 video">
          <div className="video-info">
            <div className="text-gray-300 text-center video-title">
              Im Jahr 2023 eröffneten wir unseren familiären Burger-Anhänger in
              Bernau bei Berlin und verliebten die Stadt in den legendären&nbsp;
              <span className="text-primary">Space Burger</span>. Wir versorgen
              die lautesten Festivals und Veranstaltungen mit unseren Bürgern.
              Unsere Burger sind eine Mischung aus mutigen Geschmäckern und
              natürlichen Zutaten. Es lohnt sich, sie einmal zu probieren, um
              ein Teil unserer Familie werden zu wollen!
            </div>
            <div
                className="bg-primary video-button flex
        justify-evenly
        items-center
        uppercase
        gap-2
        mt-2
        rounded-full
        text-white
        px-4
        py-2
        text-sm
        w-20
        hover:shadow-md
        hover:shadow-white"
                onClick={handleVideo}
            >
              {isPlay ? "Pause" : "Play"}
            </div>
          </div>
          <video ref={videoRef} className="video" src={"img/video.mp4"} poster={"img/bg-video.png"}></video>
        </div>
      </section>
  );
}
