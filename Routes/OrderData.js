import express from "express";
const router = express.Router();
import Order from '../model/Orders.js'

router.post('/orderData', async(req, res) => {
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date: req.body.order_date});

    let eId = await Order.findOne({email:req.body.email});
    if(eId === null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            });
            res.status(200).json({success:true});
            
        } catch (error) {
            res.status(500).json({error:error.message}) 
        }
    }
    
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}});
            res.status(200).json({success:true});
        }
        
        catch (error) {
            res.status(500).json({error:error.message}) 
        }
    }

})

router.post('/myOrderData', async(req, res) => {
try {
    let myData = await Order.findOne({email:req.body.email});
    res.json({orderdata:myData})
} catch (error) {
    res.status(500).json({error:error.message}) 

}
})


export default router;