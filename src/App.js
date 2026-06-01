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
import Cart from "./components/Cart";
import { useState } from "react";

function App() {
  const [pageId, changeState] = useState(0);

  const showCatalogHandler = () => {
    changeState(1);
  };

  const goToMainPageHandler = () => {
    changeState(0);
  };

  const showCartHandler = () => {
    console.log("catalog");
    changeState(2);
  };

  const PageRender = () => {
    switch (pageId) {
      case 0:
        return (
          <>
            <MainSection onGoCheckCollection={showCatalogHandler} />
            <Features />
            <PopularModels onShowAllModels={showCatalogHandler} />
            <WhyUs />
            <Comments />
          </>
        );
      case 1:
        return <ItemList />;
      case 2:
        return <Cart />;
    }
  };

  return (
    <div className="App">
      <Header
        onShowCatalog={showCatalogHandler}
        onGoToMainPage={goToMainPageHandler}
        onShowCart={showCartHandler}
      />
      {PageRender()}
    </div>
  );
}

export default App;
