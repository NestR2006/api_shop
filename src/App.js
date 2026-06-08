import "./App.css";

import fetchItems from "../src/api/items";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";

import OrdersPage from "./components/OrdersPage";
import LikedItems from "./components/LikedItems";
import UserInformation from "./components/UserInformation";

import ItemsList from "./components/ItemsList";
import Cart from "./components/Cart";
import Support from "./components/Support";

import { useEffect, useRef, useState } from "react";

import { Route, Routes } from "react-router-dom";
import { indexOf } from "lodash";

function App() {
  const [cart, setCart] = useState([]);
  const [items, setList] = useState([]);
  const [likedItemsList, changeLikedItem] = useState([]);
  const commentsRef = useRef(null);

  useEffect(() => {
    fetchItems()
      .then((items) => {
        setList(items);
      })
      .catch((error) => {
        console.log("Что-то случилось", error);
      });
  }, []);

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

  const itemLikedHandler = (likedItem) => {
    changeLikedItem((prev) => {
      if (prev.includes(likedItem)) {
        return prev.filter((item) => {
          return item.id != likedItem.id;
        });
      }
      return [...prev, likedItem];
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
            <ItemsList
              items={items}
              onAddToCartItem={addToCartHandler}
              onLikeButtonClicked={itemLikedHandler}
            />
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
        <Route path="/user-page" element={<UserPage />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route
            path="liked-items"
            element={
              <LikedItems
                likedItems={likedItemsList}
                onLikeButtonClicked={itemLikedHandler}
                onAddToCartButtonClicked={addToCartHandler}
              />
            }
          />
          <Route path="user-information" element={<UserInformation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
