import React, { useEffect, useRef } from "react";

import PopularModels from "./PopularModels";
import WhyUs from "./WhyUs";
import MainSection from "./MainSection";
import Comments from "./Comments";
import Features from "./Features";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = (onShowComments) => {
  const navigate = useNavigate();

  const commentsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#comments") {
      commentsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  return (
    <>
      <MainSection
        onGoCheckCollection={() => {
          navigate("/modelsList");
        }}
      />
      <Features />
      <PopularModels />
      <WhyUs />
      <div ref={commentsRef}>
        <Comments />
      </div>
    </>
  );
};

export default HomePage;
