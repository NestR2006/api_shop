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
import { useRef, useState } from "react";

function App() {
  const [pageId, changeState] = useState(0);
  const [cart, setCart] = useState([]);
  const commentsRef = useRef(null);

  const decreaseCartItemCountHandler = (itemId) => {
    setCart((prev) =>
      prev.map((cartItem) => {
        if (cartItem.object.id === itemId) {
          const newCount = cartItem.count === 1 ? 1 : cartItem.count - 1;
          return { ...cartItem, count: newCount };
        }
        return cartItem;
      }),
    );
  };

  const increaseCartItemCountHandler = (itemId) => {
    setCart((prev) =>
      prev.map((cartItem) => {
        if (cartItem.object.id === itemId) {
          const newCount = cartItem.count + 1;
          return { ...cartItem, count: newCount };
        }
        return cartItem;
      }),
    );
  };

  const showCatalogHandler = () => {
    changeState(1);
  };

  const goToMainPageHandler = () => {
    changeState(0);
  };

  const showCartHandler = () => {
    changeState(2);
  };

  const addToCartHandler = (item) => {
    setCart((prev) => {
      return [...prev, { object: item, count: 1 }];
    });
  };

  const showCommentsHandler = (object) => {
    if (pageId != 0) return;
    commentsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
            <div ref={commentsRef}>
              <Comments />
            </div>
          </>
        );
        break;
      case 1:
        return <ItemList items={items} onAddToCartItem={addToCartHandler} />;
        break;
      case 2:
        return (
          <Cart
            addedItems={cart}
            onDecreaseClicked={decreaseCartItemCountHandler}
            onIncreaseClicked={increaseCartItemCountHandler}
          />
        );
        break;
    }
  };

  return (
    <div className="App">
      <Header
        onShowCatalog={showCatalogHandler}
        onGoToMainPage={goToMainPageHandler}
        onShowCart={showCartHandler}
        onShowComments={showCommentsHandler}
        cartItemsCount={cart.length}
      />
      {PageRender()}
    </div>
  );
}

export default App;
