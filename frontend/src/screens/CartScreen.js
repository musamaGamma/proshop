import React from "react";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? +location.search.split("=")[1] : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (cartItems && productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId]);
  const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
  };
  const checkOutHandler = () => {
      history.push("/login?redirect=shipping")
  };
  const msg = (
    <span>
      Your cart is empty <Link to="/">Go back</Link>
    </span>
  );
  return (
    <Row style={{marginTop: '4rem'}}>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message msg={msg} />
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong style={{ fontSize: "1.8rem" }}>
                Subtotal ( {cartItems.reduce((a, b) => a + +b.qty, 0)} ) Items
              </strong>
              <h5 style={{marginTop: "1rem"}}>
                $
                {cartItems.reduce((a, b) => a + +b.qty * b.price, 0).toFixed(2)}
              </h5>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                onClick={checkOutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
