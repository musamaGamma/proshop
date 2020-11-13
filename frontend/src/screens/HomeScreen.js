import React, { useEffect } from "react";

import { Row, Col, Container } from "react-bootstrap";
import Product from '../components/Product'
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";


 
const HomeScreen = ({match}) => {
 
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword

const dispatch = useDispatch()
const productList = useSelector(state => state.productList)

const {loading, products, error, pages, page} = productList
      
  useEffect(()=> {
    dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
  return (
    <>
    {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-light">Go Back</Link>}
      <h1 className="mt-3">latest products</h1>
  {loading?  <Loader /> : error? <Message variant="danger" msg={error}/> : 
   <Container>
     
   <Row>
   {products?.map((product) => (
     <Col key={product._id} sm={12} md={6} lg={4} >
      <Product product={product} />
     </Col>
   ))}
   </Row>
   <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
   </Container>}
     
    </>
  );
};

export default HomeScreen;
