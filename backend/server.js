
import morgan from 'morgan'

if (process.env.NODE_ENV === "development") {
  import dotenv from "dotenv";
  dotenv.config();
}
import express from "express";
import path from 'path'
import connectDb from './config/db.js'
import {notFound, errorHandler} from './middlewares/errorMiddlewares.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app = express();

if(process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

//body parser
app.use(express.json())


//connect to db
connectDb()



//routes


app.use("/api/products", productRoutes)
app.use("/api/users/", userRoutes)
app.use("/api/orders/", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res)=> res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")))
}
else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}
//custom error handlers 
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`)
);


