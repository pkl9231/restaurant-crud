import express from "express";

import {
  createRestaurants,
  getRestaurants,
  vegetarianRestaurants,
  lowCostVegetarianRestaurants,
  lowCostVegFrenchRestaurants,
  costCuisineRestaurants,
} from "../controller";

export default (router: express.Router) => {
  try {
    router.post("/restaurants", createRestaurants);
    router.get('/restaurants', getRestaurants);
    router.get('/restaurants/veg', vegetarianRestaurants)
    router.get('/restaurants/veg/low-cost', lowCostVegetarianRestaurants);
    router.get('/restaurants/veg/french/low-cost', lowCostVegFrenchRestaurants);
    router.get('/restaurants/cost-cuisine', costCuisineRestaurants);
  } catch (error) {
    console.log(error);
  }
};
