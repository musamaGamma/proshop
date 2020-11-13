import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./ProductCarousel.css"

const ProductCarousel = () => {
    
    const dispatch = useDispatch()

    const {loading, error, products:topProducts} = useSelector(state => state.productTopRated)
   

    useEffect(()=> {
      dispatch(listTopProducts())
    }, [dispatch])
    return loading? <Loader/> : error? <Message  variant="danger" msg={error}/> : (
        <Carousel pause="hover" className="bg-dark">
            {topProducts.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                    <Image src={product.image} fluid alt={product.name}/>
                    <Carousel.Caption className="carousel-caption">
            <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                    </Link>
                    
                </Carousel.Item>  
            ))}
        </Carousel>
    )
}

export default ProductCarousel
