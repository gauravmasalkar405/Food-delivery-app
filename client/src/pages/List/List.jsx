import React, { useEffect, useState } from "react";
import "./list.scss";
import { useParams } from "react-router-dom";
import { getProductsRoute } from "../../api/api.js";
import axios from "axios";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import { RxCross2 } from "react-icons/rx";

const List = () => {
  const [category, setCategory] = useState("delivery");
  const [restaurants, setRestauransts] = useState();
  const [restaurantsToShow, setRestaurantsToShow] = useState();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState("sortBy");
  const [cuisines, setCuisines] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "",
    cuisines: [],
    rating: 0,
    costPerPerson: 0,
  });

  const { location } = useParams();

  const handleCategoryChange = (val) => {
    setCategory(val);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.post(getProductsRoute, {
          category: category,
          location: location,
        });

        setRestauransts(response?.data);
        setRestaurantsToShow(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [category]);

  const handleSortByFilter = (val) => {
    let newFilters = { ...filters };
    newFilters.sortBy = val;
    setFilters({ ...newFilters });
  };

  const handleCuisineChange = (val) => {
    let newFilters = { ...filters };
    let newCuisines = newFilters.cuisines;
    if (!newCuisines.includes(val)) {
      newCuisines = [...newFilters.cuisines, val];
    } else {
      newCuisines = newCuisines.filter((cuisine) => cuisine != val);
    }
    newFilters.cuisines = [...newCuisines];
    setFilters({ ...newFilters });
  };

  // get all cuisines
  useEffect(() => {
    const getAllCuisines = () => {
      let set = new Set();
      restaurants?.map((restau) =>
        restau.cuisines.map((cuisine) => set.add(cuisine))
      );

      setCuisines([...set]);
    };

    getAllCuisines();
  }, [restaurants]);

  // Handle slider change
  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    let newFilters = { ...filters };
    newFilters.rating = newValue;
    setFilters({ ...newFilters });
  };

  const handleCostPerPerson = (e) => {
    const newValue = e.target.value;
    let newFilters = { ...filters };
    newFilters.costPerPerson = newValue;
    setFilters({ ...newFilters });
  };

  const handleApplyFilters = () => {
    let copyRestaurants = [...restaurants];

    // sort by filter
    if (filters.sortBy == "ratingHighToLow") {
      copyRestaurants.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else if (filters.sortBy == "deliveryTime") {
      copyRestaurants.sort((a, b) => {
        return a.deliveryTime - b.deliveryTime;
      });
    } else if (filters.sortBy == "costLowToHigh") {
      copyRestaurants.sort((a, b) => {
        return b.priceForOne - a.priceForOne;
      });
    } else if (filters.sortBy == "costHighToLow") {
      copyRestaurants.sort((a, b) => {
        return a.priceForOne - b.priceForOne;
      });
    } else {
      copyRestaurants = [...copyRestaurants];
    }

    // cusines filter
    copyRestaurants = copyRestaurants.filter((restau) =>
      restau.cuisines.some((cuisine) => {
        if (filters.cuisines.length > 0) {
          return filters.cuisines.includes(cuisine);
        } else {
          return cuisines.includes(cuisine);
        }
      })
    );

    // rating filter
    copyRestaurants = copyRestaurants.filter(
      (restau) => restau.rating >= filters.rating
    );

    // cost per person filter
    copyRestaurants = copyRestaurants.filter(
      (restau) => restau.priceForOne >= filters.costPerPerson
    );

    setRestaurantsToShow([...copyRestaurants]);
    setShowFilters(!showFilters);
  };

  // console.log(restaurants);

  return (
    <div className="list-main">
      <Navbar />
      <div className="list-select-category-container">
        <div
          onClick={() => handleCategoryChange("delivery")}
          className={
            category == "delivery"
              ? "list-select-category list-select-category-add-bg"
              : "list-select-category"
          }
        >
          <div className={category == "delivery" && "add-bg"}>
            <img
              alt="illustration"
              src="https://b.zmtcdn.com/data/o2_assets/246bbd71fbba420d5996452be3024d351616150055.png"
              l
            />
          </div>
          <p>Delivery</p>
        </div>
        <div
          onClick={() => handleCategoryChange("dining out")}
          className={
            category == "dining out"
              ? "list-select-category list-select-category-add-bg"
              : "list-select-category"
          }
        >
          <div className={category == "dining out" && "add-bg"}>
            <img
              alt="illustration"
              src="https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png"
            />
          </div>
          <p>Dining out</p>
        </div>
        <div
          onClick={() => handleCategoryChange("nightlife")}
          className={
            category == "nightlife"
              ? "list-select-category list-select-category-add-bg"
              : "list-select-category"
          }
        >
          <div className={category == "nightlife" && "add-bg"}>
            <img
              alt="illustration"
              src="https://b.zmtcdn.com/data/o2_assets/855687dc64a5e06d737dae45b7f6a13b1616149818.png"
            />
          </div>
          <p>Nightlife</p>
        </div>
      </div>

      <div className="list-filters-container">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="filter-btn"
        >
          {showFilters ? <RxCross2 /> : <p>Filters</p>}
        </button>

        {showFilters && (
          <div className="list-filters-list-and-options-container">
            <div className="list-filters-body">
              <ul className="list-filters-list">
                <li
                  onClick={() => setActiveFilterCategory("sortBy")}
                  className={activeFilterCategory == "sortBy" && "add-bg"}
                >
                  Sort by
                </li>
                <li
                  onClick={() => setActiveFilterCategory("cuisines")}
                  className={activeFilterCategory == "cuisines" && "add-bg"}
                >
                  Cuisines
                </li>
                <li
                  onClick={() => setActiveFilterCategory("rating")}
                  className={activeFilterCategory == "rating" && "add-bg"}
                >
                  Rating
                </li>
                <li
                  onClick={() => setActiveFilterCategory("costPerPseron")}
                  className={
                    activeFilterCategory == "costPerPseron" && "add-bg"
                  }
                >
                  Cost per person
                </li>
              </ul>

              <div className="list-filters-options">
                <div>
                  {activeFilterCategory == "sortBy" ? (
                    <div className="list-filter-options-sort-by-container">
                      <label>
                        <input
                          type="checkbox"
                          value="ratingHighToLow"
                          checked={filters.sortBy == "ratingHighToLow"}
                          onChange={() => handleSortByFilter("ratingHighToLow")}
                        />
                        Rating: High to low
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="deliveryTime"
                          checked={filters.sortBy == "deliveryTime"}
                          onChange={() => handleSortByFilter("deliveryTime")}
                        />
                        Delievery Time
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="costHighToLow"
                          checked={filters.sortBy == "costHighToLow"}
                          onChange={() => handleSortByFilter("costHighToLow")}
                        />
                        Cost: Low to High
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="costLowToHigh"
                          checked={filters.sortBy == "costLowToHigh"}
                          onChange={() => handleSortByFilter("costLowToHigh")}
                        />
                        Cost: High to Low
                      </label>
                    </div>
                  ) : activeFilterCategory == "cuisines" ? (
                    <div className="list-filter-options-cuisines-container">
                      {cuisines.map((cuisine, index) => {
                        return (
                          <label key={index}>
                            <input
                              type="checkbox"
                              value={cuisine}
                              checked={filters.cuisines.includes(cuisine)}
                              onChange={() => handleCuisineChange(cuisine)}
                            />
                            {cuisine}
                          </label>
                        );
                      })}
                    </div>
                  ) : activeFilterCategory == "rating" ? (
                    <div className="list-filter-options-raiting-container">
                      <div className="rating-container">
                        <p>Rating</p>
                        <p className="rating">{filters.rating + "+"}</p>
                      </div>
                      <div className="input-container">
                        <input
                          type="range"
                          min={0}
                          max={5}
                          step={0.5}
                          value={filters.rating}
                          onChange={handleSliderChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="list-filter-options-raiting-container">
                      <div className="rating-container">
                        <p>Cost per pserson</p>
                        <p className="rating">{filters.costPerPerson + "+"}</p>
                      </div>
                      <div className="input-container">
                        <input
                          type="range"
                          min={0}
                          max={1000}
                          step={200}
                          value={filters.costPerPerson}
                          onChange={handleCostPerPerson}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="filter-apply-btn-conatiner">
              <button onClick={handleApplyFilters}>Apply</button>
            </div>
          </div>
        )}
      </div>
      <div className="list-restaurants">
        <h2>Best food in {location}</h2>
        <div className="list-card">
          {restaurantsToShow?.map((restau, index) => (
            <Card key={index} restaurant={restau} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
