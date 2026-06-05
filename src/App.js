import "./App.css";

import items from "./api/items";

import Header from "./components/Header";
import HomePage from "./components/HomePage";

import ItemList from "./components/ItemsList";
import Cart from "./components/Cart";
import Support from "./components/Support";

import { useRef, useState } from "react";

import { Route, Routes } from "react-router-dom";

function App() {
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

  const addToCartHandler = (item) => {
    setCart((prev) => {
      const isItemInCart = prev.find(
        (cartItem) => cartItem.object.id === item.id,
      );

      if (isItemInCart) {
        return prev.map((cartItem) =>
          cartItem.object.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem,
        );
      }

      return [...prev, { object: item, count: 1 }];
    });
  };

  return (
    <div className="App">
      <Header cartItemsCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/modelsList"
          element={
            <ItemList items={items} onAddToCartItem={addToCartHandler} />
          }
        />
        <Route path="/support" element={<Support />} />
        <Route
          path="/cart"
          element={
            <Cart
              addedItems={cart}
              onDecreaseClicked={decreaseCartItemCountHandler}
              onIncreaseClicked={increaseCartItemCountHandler}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
