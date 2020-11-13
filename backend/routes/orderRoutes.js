import express from "express";
import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middlewares/authMiddlewares.js";
const router = express.Router();

//desc create new order
// POST /api/orders
//access private

router.post(
  "/",protect, 
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPric,
      totalPrice,
    } = req.body;
 
    if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error("No order items")
  }
  else {
      const order = new Order({
          user: req.user._id,
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPric,
          totalPrice,
      })
  
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
  }
  
  })
);
 //get all orders admin access
//GET /api/orders
router.get("/", protect, admin, asyncHandler(async (req, res)=> {
  console.log("what the fuck is going")
    const orders = await Order.find({}).populate("user", "id name")
    console.log({orders})
    res.json(orders)
  }) )
   
//route GET /api/orders/myorders
router.get("/myorders", protect, asyncHandler(async(req, res)=> {
  console.log(req.user)
   const orders = await Order.find({user: req.user._id})
   res.json(orders)
 
 }))


router.get("/:id", protect, asyncHandler(async(req, res)=> {
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if(order) {
    res.status(200).json(order)
  }
  else {
    res.status(404)
    throw new Error("Order not Found")
  }
}))





router.put("/:id/pay", protect, asyncHandler(async (req, res)=> {
  console.log('are going into here')
  const order = await Order.findById(req.params.id)
  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      stauts: req.body.status,
      update_time:req.body.update_time,
      email_address: req.body.payer.email_address

    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
  else {
    res.status(404)
    throw new Error("Order not found")
  }
}))
//mark as delivered
//PUT /api/orders/:id

router.put("/:id/deliver", protect,admin,  asyncHandler(async (req, res)=> {

  const order = await Order.findById(req.params.id)
  if(order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
  else {
    res.status(404)
    throw new Error("Order not found")
  }
}))




export default router;
