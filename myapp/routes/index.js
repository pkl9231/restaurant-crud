const restourantController = require("../controller/index");

let express = require('express');
let router = express.Router();

router
  .post('/restaurants', restourantController.createRestaurants)
  .get('/restaurants', restourantController.getRestaurants)
  .get('/restaurants/veg', restourantController.vegetarianRestaurants)
  .get('/restaurants/veg/low-cost', restourantController.lowCostVegetarianRestaurants)
  .get('/restaurants/veg/french/low-cost', restourantController.lowCostVegFrenchRestaurants)
  .get('/restaurants/cost-cuisine', restourantController.costCuisineRestaurants)
  .get('/restaurants/cost-cuisine-alternative', restourantController.FrenchOrItalianRestaurants)

module.exports = router;
