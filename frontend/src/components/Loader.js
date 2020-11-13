import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner role="status" animation="border" style={{height: "10rem", width: "10rem", margin: "auto", display: "block"}}>
            <span class="sr-only">loading...</span>
        </Spinner>
    )
}

export default Loader
