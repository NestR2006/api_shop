import "./App.css";
import "../src/styles/itemsList.css";
import "../src/styles/filters.css";
import "../src/styles/comments.css";
import "../src/styles/whyUs.css";
import "../src/styles/popularModels.css";
import "../src/styles/features.css";
import "../src/styles/sortBar.css";

import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Features from "./components/Features";
import PopularModels from "./components/PopularModels";
import WhyUs from "./components/WhyUs";
import Comments from "./components/Comments";

import ItemList from "./components/ItemsList";
import { useState } from "react";

function App() {
  const [showDakimakuresState, changeState] = useState(0);

  const showCatalogHandler = () => {
    changeState(1);
  };

  const goToMainPageHandler = () => {
    changeState(0);
  };

  if (showDakimakuresState === 1) {
    return (
      <div className="App">
        <Header
          showCatalog={showCatalogHandler}
          goToMainPage={goToMainPageHandler}
        />
        <ItemList />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header
          showCatalog={showCatalogHandler}
          goToMainPage={goToMainPageHandler}
        />
        <MainSection onGoCheckCollection={showCatalogHandler} />
        <Features />
        <PopularModels onShowAllModels={showCatalogHandler} />
        <WhyUs />
        <Comments />
      </div>
    );
  }
}

export default App;
