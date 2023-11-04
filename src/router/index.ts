import express from 'express';
import restaurant from './restaurant-route';

const router = express.Router();

export default (): express.Router => {
restaurant(router);
  return router;
};