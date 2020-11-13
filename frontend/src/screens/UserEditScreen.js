import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser} from '../actions/userActions'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { userUpdateReset } from "../constants/userConstants";

const UserEditScreen = ({history, match}) => {

const userId = match.params.id
    const {loading, error, user} = useSelector(state => state.userDetails)  
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = useSelector(state => state.userUpdate)  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  

  const dispatch = useDispatch()
 
  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({ _id:userId, name, email, isAdmin}))
    
    
  }

  useEffect(() => {
      if(successUpdate) {
          dispatch({type: userUpdateReset})
          history.push("/admin/userList")
      }
      else {
        if(!user?.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
          }
          else {
         setName(user.name)
         setEmail(user.email)
         setIsAdmin(user.isAdmin)
          }
      }
  
     
  }, [user, userId, dispatch, successUpdate, history]);
  
  return (
      <>
      <Link to="/admin/userlist" className="btn btn-light ny-3">
         <i className="fas fa-arrow-back"></i> Go Back
      </Link>
      <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger" msg={errorUpdate} />}
      {loading? <Loader /> : error? <Message variant="danger" msg={error}/> : (
      
      
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
          
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="isadmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>
        
        <Button type="submit" variant="primary">Update</Button>
      </Form>
    
   
      )}
       </FormContainer>
      </>
    
  );
};

export default UserEditScreen;
