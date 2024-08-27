import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TextTrackList from "./assets/logo-teal.svg";

function App() {
  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [inBasket, setInBasket] = useState([]);

  const calculateSubtotal = () => {
    return inBasket.reduce(
      (somme, item) => somme + item.price * item.quantity,
      0
    );
  };

  const incrementValue = (index) => {
    const basketCopy = [...inBasket];
    basketCopy[index].quantity += 1;
    setInBasket(basketCopy);
  };

  const decrementValue = (index) => {
    const basketCopy = [...inBasket];
    basketCopy[index].quantity >= 2
      ? (basketCopy[index].quantity -= 1)
      : basketCopy.splice([index], 1);
    setInBasket(basketCopy);
  };

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--6zq9tqc62vcv.code.run/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div className="body">
          <header>
            <img src={TextTrackList} alt="restaurantlogo" />
          </header>
          <div className="restaurant-top">
            <div className="restaurant-top-container">
              <div className="restaurant-top-left">
                <h1>{data.restaurant.name} </h1>
                <span>{data.restaurant.description}</span>
              </div>
              <div className="restaurant-top-right">
                <img src={data.restaurant.picture} alt="restaurantlogo" />
              </div>
            </div>
          </div>

          <div className="restaurant-down">
            <div className="restaurant-down-left">
              {data.categories.map((elem, index) => {
                return (
                  <div className="restaurant-category" key={index}>
                    <div className="restaurant-category-title">
                      <h2>{elem.meals.length > 0 && elem.name}</h2>
                    </div>
                    <div className="restaurant-category-menu">
                      {elem.meals.map((elem2, index) => {
                        return (
                          <div className="restaurant-category-item" key={index}>
                            <div
                              className="restaurant-category-item-left"
                              onClick={() => {
                                const basketCopy = [...inBasket];
                                const isPresent = (element) =>
                                  element.title === elem2.title;

                                const itemIndex =
                                  basketCopy.findIndex(isPresent);

                                itemIndex !== -1
                                  ? (basketCopy[itemIndex].quantity += 1)
                                  : basketCopy.push({
                                      title: elem2.title,
                                      price: elem2.price,
                                      quantity: 1,
                                    });

                                setInBasket(basketCopy);
                                console.log(inBasket);
                              }}
                            >
                              <h3>{elem2.title}</h3>
                              <p>{elem2.description}</p>
                              <p className="price">
                                {elem2.price}€
                                {elem2.popular && <span> Populaire</span>}
                              </p>
                            </div>

                            <div className="restaurant-category-item-right">
                              {elem2.picture && (
                                <img src={elem2.picture} alt="food" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="restaurant-down-right">
              <div className="basket-container">
                <button>Valider mon panier</button>
                <div className="basket-listing">
                  <div className="container-in-basket">
                    {inBasket.map((elem3, index) => {
                      return (
                        <div className="items" key={index}>
                          <div className="quantity">
                            <button
                              onClick={() => {
                                decrementValue(index);
                              }}
                            >
                              -
                            </button>
                            {elem3.quantity}
                            <button
                              onClick={() => {
                                incrementValue(index);
                              }}
                            >
                              +
                            </button>
                          </div>

                          <div className="title">{elem3.title}</div>

                          <div className="price">
                            {(
                              Number(elem3.price) * Number(elem3.quantity)
                            ).toFixed(2) || ""}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {inBasket.length > 0 ? (
                    <div className="basket-listing-price">
                      <span>Sous-total {calculateSubtotal().toFixed(2)}€</span>
                      <span>Frais de livraison 2.50€</span>
                      <span>
                        Total {(calculateSubtotal() + 2.5).toFixed(2)}€
                      </span>
                    </div>
                  ) : (
                    <div className="basket-listing-price">
                      <span>Votre panier est vide</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
