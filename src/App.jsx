import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TextTrackList from "./assets/logo-teal.svg";

function App() {
  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data);
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
              {data.categories.map((elem) => {
                return (
                  <div className="restaurant-category">
                    <div className="restaurant-category-title">
                      <h2>{elem.meals.length > 0 && elem.name}</h2>
                    </div>
                    <div className="restaurant-category-menu">
                      {elem.meals.map((meal) => {
                        return (
                          <div className="restaurant-category-item">
                            <div className="restaurant-category-item-left">
                              <h3>{meal.title}</h3>
                              <p>{meal.description}</p>
                              <p className="price">
                                {meal.price}€{" "}
                                {meal.popular && <span>Populaire</span>}
                              </p>
                            </div>
                            <div className="restaurant-category-item-right">
                              {meal.picture && (
                                <img src={meal.picture} alt="food" />
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
                <span>Votre panier est vide</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
