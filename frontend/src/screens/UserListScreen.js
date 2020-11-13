import React from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUsersList, deleteUser } from "../actions/userActions";

const UserListScreen = ({history}) => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.usersList);
  const {userInfo} = useSelector(state => state.userLogin)
  const {success:successDelete} = useSelector(state => state.userDelete)

  useEffect(() => {
    
    if(userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
    }
    else {
      history.push("/")
    }
    
  }, [dispatch, history, successDelete, userInfo]);

  const deleteUserHandler = (id) => {
    if(window.confirm("Are you sure you want to remove this user?")) {
      dispatch(deleteUser(id))
    }

  }
  return (
    <>
    <h1>Users</h1>
    {loading? <Loader /> : error? <Message variant="danger" msg={error}/> : (
        <Table striped bordered hover responsive  className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i class="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i class="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i class="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteUserHandler(user._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
      
    </>
  );
};

export default UserListScreen;
