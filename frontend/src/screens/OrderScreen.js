import React, {useEffect} from "react";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButton} from 'react-paypal-button-v2'
import { Link } from "react-router-dom";
import { getOrder, payOrder, deliverOrder } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from 'axios'
import { useState } from "react";
import { orderPayReset, orderDeliverReset } from "../constants/orderConstants";

const OrderScreen = ({match, history}) => {

    const [sdkReady, setSdkReady] = useState(false)
    const orderId = match.params.id
  const {order, loading, error} = useSelector((state) => state.orderDetails);
  const {userInfo} = useSelector((state) => state.userLogin);
  const { loading:loadingPay, success:successPay} = useSelector((state) => state.orderPay);
  const { loading:loadingDeliver, success:successDeliver} = useSelector((state) => state.orderDeliver);


  


  const dispatch = useDispatch()

  if(!loading) {
    const addDecimal = (num) => {
        return +(Math.round(num * 100) / 100).toFixed(2);
      };
      //calculate Prices
      order.itemsPrice = addDecimal(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
  }

 
  useEffect(() => {
    if(!userInfo) {
      history.push("/login")
    }
     const addPaypalScript = async() => {
         const {data: clientId} = await axios.get("/api/config/paypal")
         const script = document.createElement("script")
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async= true
         script.onload = () => {
             setSdkReady(true)
         }
         document.body.appendChild(script)
     }

     
     if(!order || successPay || successDeliver) {
         dispatch({type: orderPayReset})
         dispatch({type: orderDeliverReset})
        dispatch(getOrder(orderId))
     }
     else if(!order.isPaid) {
         if(!window.paypal) {
             addPaypalScript()
         }
         else {
             setSdkReady(true)
         }
     }
    
   
     
  }, [order, successPay,successDeliver, orderId, dispatch, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
     
dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
 
  return  loading? <Loader />: error? <Message variant="danger" msg={error} /> 
  : <>
  
      <Row style={{marginTop: "4rem"}}>
      <h1 class="mb-4">order {order._id}</h1>
        <Col md={8}>
          <ListGroup variant="flush" style={{ fontSize: "1.5rem" }}>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p class="text-capitalize">{order.user.name}</p>
              <p><a href={`mailto:${order.user.email}`} >{order.user.email}</a></p>

              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}
              </p>
              {order.isDelivered? <Message variant="success" msg={"Delivered on " + order.deliveredAt}/> : <Message variant="warning" msg="Not Delivered"/>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method:</strong>
              <span className="ml-1">{order.paymentMethod}</span>
              </p>
              {order.isPaid? <Message variant="success" msg={"Paid on " + order.paidAt}/> : <Message variant="warning" msg="Not Paid"/>}
            

            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup style={{ fontSize: "1.5rem" }} variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
             {!order.isPaid && (
                 <ListGroup.Item>
                  
                     {loadingPay && <Loader />}
                     {!sdkReady? <Loader/> : (
                         <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                     )}
                 </ListGroup.Item>
             )}
             {loadingDeliver && <Loader />}
             {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
               <ListGroup.Item>
                 <Button type="button" className="btn btn-block" onClick={deliverHandler}>Mark As Delivered</Button>
               </ListGroup.Item>
             )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  
                }
export default OrderScreen;
