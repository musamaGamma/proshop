import express from "express";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";
const router = express.Router();


//post /api/users/login

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password ");
    }
  })
);

//POST api/users
router.post('/', asyncHandler( async(req, res)=> {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error("User already exist")
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }

}))

//route GET /api/users/profile
//access private

router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await  User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User is not found");
    }
  })
);

//put /api/users/:id
//access admin
router.put("/:id",protect, admin,  asyncHandler(async (req, res)=> {
  console.log("are tou preceed")
    const user = await User.findById(req.params.id)
    if(user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
      
  
    }
  
    else {
      res.status(404)
  
      throw new Error ("User was not found")
    }
  }))

//route PUT /api/users/profile
//access private

router.put("/profile",protect,  asyncHandler(async (req, res)=> {
console.log("helloooooo")
  const user = await User.findById(req.user._id)
  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
    

  }

  else {
    res.status(404)

    throw new Error ("User was not found")
  }
}))


//get all users if admin

router.get("/",protect, admin, asyncHandler(async (req, res)=> {
  const users = await User.find({})
  res.json(users)
}))

//delete user
router.delete("/:id", protect, admin, asyncHandler(async(req,res)=> {
  const user = await User.findById(req.params.id)
  if(user) {
    await user.remove()
    res.json({msg: "user have been removed"})
  }
  else {
    res.status(404)
    throw new Error("user not found")
  }
}))

//GET /api/users/:id
//access admin
router.get("/:id", protect, admin, asyncHandler(async(req, res)=> {
  const user = await User.findById(req.params.id)
  if(user) {
    res.json(user)
  }
  else {
    res.status(404)
    throw new Error("user not found")
  }
}))



export default router;
