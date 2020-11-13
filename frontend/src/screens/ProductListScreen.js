import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { productCreateReset } from "../constants/productConstants";
import Paginate from "../components/Paginate";


const ProductListScreen = ({history, match}) => {
  const dispatch = useDispatch();
  const { loading, error, products, pages, page } = useSelector((state) => state.productList);
  const {userInfo} = useSelector(state => state.userLogin)
  const {loading:loadingDelete,error:errorDelete, success:successDelete} = useSelector(state => state.productDelete)
  const {loading:loadingCreate,error:errorCreate, success:successCreate, product: createdProduct} = useSelector(state => state.productCreate)

   const pageNumber = match.params.pageNumber
  useEffect(() => {
    dispatch({type : productCreateReset})
    
    if(!userInfo.isAdmin) {
      history.push("/login")
    }
    if(successCreate) {
      
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }
    else {
      dispatch(listProducts("", pageNumber));
    }
    
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteProductHandler = (id) => {
    if(window.confirm("Are you sure you want to remove this product?")) {
      dispatch(deleteProduct(id))
    }

  }
  const createProductHandler = () => {
dispatch(createProduct())
  }
  return (
    <>
    <Row className="align-items-center">
        <Col>
        <h1>Products</h1>
    </Col>
        <Col className="text-right"> 
        <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
        </Button>
        
        </Col>
    </Row>
    {loadingDelete && <Loader />}
    {errorDelete && <Message variant="danger" msg={errorDelete}/>}
    {loadingCreate && <Loader />}
    {errorCreate && <Message variant="danger" msg={errorCreate}/>}
    {loading? <Loader /> : error? <Message variant="danger" msg={error}/> : (
      <>
        <Table striped hover bordered responsive className="table-sm ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
              {product.category}
              </td>
          <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i class="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteProductHandler(product._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate pages={pages} page={page} isAdmin={true} />
      </>
    )}
      
    </>
  );
};

export default ProductListScreen;
