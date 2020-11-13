import React from 'react'
import { useState } from 'react'
import { useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {

    const history = useHistory()
    const [keyword, setKeyword] = useState("")
    const submitHandler = (e) => {
         
        e.preventDefault()
        if(keyword.trim()) {
            console.log("are you trimming")
            history.push(`/search/${keyword}`)
        }
        else {
            console.log("are you trimd")
            history.push("/")
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control className="ml-sm-2" name="q" type="text" placeholder="search products" onChange={(e)=> setKeyword(e.target.value)} style={{outlineWidth: "none"}} />
                <Button type="submit"  variant="outline-success"><i class="fas fa-search"></i></Button>
            </Form>
            
        </div>
    )
}

export default SearchBox
