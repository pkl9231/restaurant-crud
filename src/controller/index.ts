import express from 'express';
import { Op, Sequelize } from 'sequelize'; // Import Sequelize and its Op object.
import Restaurant from "../model/schema"


/**
 * this function is use to create restaurant records
 * @param req.body 
 * @returns
 */
export const createRestaurants = async (req: express.Request, res: express.Response) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * this function is use to  Get all Restaurants
 * @returns
 */
export const getRestaurants = async (req: express.Request, res: express.Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * this function is use to  Get all vegetarian (vegOnly) restaurants
 * @returns
 */
export const vegetarianRestaurants = async (req: express.Request, res: express.Response) => {
  try {
    const vegetarianRestaurants = await Restaurant.findAll({
      where: { vegOnly: true },
    });
    res.status(200).json(vegetarianRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * this function is use to  Get vegetarian restaurants with low cost
 * @returns
 */
export const lowCostVegetarianRestaurants = async (req: express.Request, res: express.Response) => {
  try {
    const vegetarianLowCostRestaurants = await Restaurant.findAll({
      where: { vegOnly: true, cost: 'Low' },
    });
    res.status(200).json(vegetarianLowCostRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * this function is use to  Get vegetarian restaurants with low cost and French cuisine
 * @returns
 */
export const lowCostVegFrenchRestaurants = async (req: express.Request, res: express.Response) => {
  try {
    const filteredRestaurants = await Restaurant.findAll({
      where: {
        [Op.and]: [
          { vegOnly: true },
          { cost: 'Low' },
          Sequelize.literal(`JSON_CONTAINS(cusine_types, '["french"]')`), // Adjust the JSON array as needed
        ],
      },
    });
    res.status(200).json(filteredRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * this function is use to  Get restaurants with high or low cost and French or Italian cuisine
 * @returns
 */
export const costCuisineRestaurants = async (req: express.Request, res: express.Response) => {
  try {
    const filteredRestaurants = await Restaurant.findAll({
      where: {
        [Op.or]: [
          { cost: 'High' },
          { cost: 'Low' },
          Sequelize.where(
            Sequelize.fn('JSON_CONTAINS', Sequelize.col('cusine_types'), JSON.stringify(['french'])),
            true
          ),
          Sequelize.where(
            Sequelize.fn('JSON_CONTAINS', Sequelize.col('cusine_types'), JSON.stringify(['italian'])),
            true
          ),
        ],
      },
    });
    res.status(200).json(filteredRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};