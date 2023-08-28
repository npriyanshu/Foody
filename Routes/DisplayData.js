import express from "express";
const router = express.Router();
router.get('/foodData', (req, res) => {
  try {
    
    res.send([global.food_items,global.foodCategory]);
  } catch (error) {
    console.log(error);
  }


})



export default router;