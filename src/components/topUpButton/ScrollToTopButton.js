"use client";
import React, { useEffect, useRef, useState } from 'react';
import UpButton from "@/components/icons/UpButton";




export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const btnTop = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
      <button type="topUp"
          ref={btnTop}
          className={`fixed bottom-4 right-4 bg-primary text-white px-3 py-2 rounded-full hover:drop-shadow-md hover:shadow-white transition-opacity duration-300 ${
              isVisible ? "opacity-70" : "opacity-0"
          }`}
          onClick={scrollToTop}
          style={{width: '50px', height: '50px'}}
      >
        <UpButton/>
      </button>
  );
}