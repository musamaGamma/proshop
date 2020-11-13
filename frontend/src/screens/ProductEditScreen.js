import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { productUpdateReset } from "../constants/productConstants";
import axios from "axios";

const UserEditScreen = ({ history, match }) => {
  const productId = match.params.id;
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = useSelector(state => state.productUpdate)
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
     
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brand,
        price,
        category,
        image,
        countInStock,
        description,
      })
    );
  };

  useEffect(() => {
    if(successUpdate) {
        dispatch({type: productUpdateReset})
        history.push("/admin/productlist")
    }
    else {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
          } else {
            setName(product.name);
            setBrand(product.brand);
            setCategory(product.category);
            setPrice(product.price);
            setCountInStock(product.countInStock);
            setImage(product.Image);
            setDescription(product.description);
          }
    }
    
  }, [product, productId, dispatch, history, successUpdate]);
  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    console.log({file}, "frontend")
    formData.append("image", file)
    console.log('hllo',  formData)
    setUploading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
        
      }
      const { data } = await axios.post("/api/upload", formData, config) 
      console.log({data})
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error.message)
      setUploading(false)
    }
  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light ny-3">
        <i className="fas fa-back-arrow"></i> Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message msg={errorUpdate} variant="danger" />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" msg={error} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
              >
              </Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter  Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="CountInStock">
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter CountInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
