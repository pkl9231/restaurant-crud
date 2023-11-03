let Restaurant = require("../model/schema");

module.exports = {
    // Create a new restaurant
    createRestaurants: async (req, res) => {
        try {
            const restaurant = await Restaurant.create(req.body);
            res.status(201).json(restaurant);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // get all Restaurants
    getRestaurants: async (req, res) => {
        try {
            const restaurants = await Restaurant.findAll();
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all vegetarian (vegOnly) restaurants
    vegetarianRestaurants: async (req, res) => {
        try {
            const vegetarianRestaurants = await Restaurant.findAll({
                where: { vegOnly: true },
            });
            res.status(200).json(vegetarianRestaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get vegetarian restaurants with low cost
    lowCostVegetarianRestaurants: async (req, res) => {
        try {
            const vegetarianLowCostRestaurants = await Restaurant.findAll({
                where: { vegOnly: true, cost: 'Low' },
            });
            res.status(200).json(vegetarianLowCostRestaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get vegetarian restaurants with low cost and French cuisine
    lowCostVegFrenchRestaurants: async (req, res) => {
        try {
            const filteredRestaurants = await Restaurant.findAll({
                where: {
                    vegOnly: true,
                    cost: 'Low',
                    cusineTypes: { [Sequelize.Op.contains]: ['french'] },
                },
            });
            res.status(200).json(filteredRestaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get restaurants with high or low cost and French or Italian cuisine
    costCuisineRestaurants: async (req, res) => {
        try {
            const filteredRestaurants = await Restaurant.findAll({
                where: {
                    cost: { [Sequelize.Op.in]: ['High', 'Low'] },
                    cusineTypes: {
                        [Sequelize.Op.contains]: { [Sequelize.Op.or]: ['french', 'italian'] },
                    },
                },
            });
            res.status(200).json(filteredRestaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get restaurants with high or low cost and French or Italian cuisine (alternative using OR)
    FrenchOrItalianRestaurants: async (req, res) => {
        try {
            const filteredRestaurants = await Restaurant.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { cost: 'High' },
                        { cost: 'Low' },
                    ],
                    cusineTypes: { [Sequelize.Op.contains]: { [Sequelize.Op.or]: ['french', 'italian'] } },
                },
            });
            res.status(200).json(filteredRestaurants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

}