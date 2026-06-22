import React, { useEffect, useRef } from "react";

import PopularModels from "../elements/PopularModels";
import WhyUs from "../elements/WhyUs";
import MainSection from "../elements/MainSection";
import Comments from "../elements/Comments";
import Features from "../elements/Features";
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
