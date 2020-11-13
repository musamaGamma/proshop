import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

//@desc fetch all products
//@route GET /api/products
//@access public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    
    const pageSize = 2
    const page = +req.query.pageNumber || 1
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: "i"
      }
    } : {}
    
     const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))

    res.json({products, page, pages: Math.ceil(count / pageSize)});
  })
);
//GET the top rated products
router.get("/top", asyncHandler(async (req, res)=> {
  const products = await Product.find({}).sort({rating: -1}).limit(3)
  res.json(products)
}))
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log("object", product);
    if (product) res.status(200).json(product);
    else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);

//delete api/products/:id
//access admin

router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ msg: "product is removed" });
    } else {
      res.status(404);
      throw new Error("product was not found");
    }
  })
);

// create a proudct
// POST api/products

router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name",
      price: 0,
      user: req.user._id,
      image: "images/sample.jpg",
      brand: "sample brand",
      category: "sample category",
      countInStock: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

// update a proudct
// PUT api/products

router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      image,
      price,
      brand,
      category,
      countInStock,
      description,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.image = image;
      product.price = price;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.description = description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      throw new Error("Product is not found");
    }
  })
);

//add a review
//POST /api/products/:id/reviews
router.post(
  "/:id/reviews",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("already reviewed");
      }
      //create a review object
      const review = {
        name: req.user.name,
        rating: +rating,
        comment,
        user: req.user._id,
      };
      //push the object to the review array
      product.reviews.push(review);
      //update the number of reviews
      product.numReviews = product.reviews.length;
      //calculate the average rating
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.numReviews;

      //save the changes
      await product.save();
      res.status(201).json({ msg: "review added" });
    } else {
      res.status(404);
      throw new Error("product was not found");
    }
  })
);



export default router;
