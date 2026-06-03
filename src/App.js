import "./App.css";

import items from "./api/items";

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
        break;
      case 1:
        return <ItemList items={items} />;
        break;
      case 2:
        return <Cart addedItems={items} />;
        break;
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
