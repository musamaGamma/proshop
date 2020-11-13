import React from 'react'
import {Container, Col, Row} from 'react-bootstrap'
const FormContainer = ({children}) => {
    return (
        <Container className="mt-3">
            <Row  style={{height: "100%"}} className="justify-content-md-center align-items-center">
        <Col xs={12} md={6}>
            {children}
        </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
