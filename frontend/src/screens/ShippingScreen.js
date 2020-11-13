import React, {useState} from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    const { shippingAddress} = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
e.preventDefault()
dispatch(saveShippingAddress({address, city, postalCode, country}))
history.push("/payment")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h2>Shipping</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                  <Form.Label>
                      Address
                  </Form.Label>
                  <Form.Control type="text" required value={address} onChange={(e)=> setAddress(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="city">
                  <Form.Label>
                      City
                  </Form.Label>
                  <Form.Control type="text" required value={city} onChange={(e)=> setCity(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="postalCode">
                  <Form.Label>
                      postalCode
                  </Form.Label>
                  <Form.Control type="text" required value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="country">
                  <Form.Label>
                      Country
                  </Form.Label>
                  <Form.Control type="text" required value={country} onChange={(e)=> setCountry(e.target.value)} />
              </Form.Group>
              <Button type="submit" Rounded variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
