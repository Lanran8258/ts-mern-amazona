import { useContext } from 'react'
import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { Product } from '../types/Product'
import { convertProductToCartItem } from '../utils'
import Rating from './Rating'

export default function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
        />
      </Link>
      <CardBody>
        <Link to={`/product/${product.slug}`}>
          <CardTitle>{product.name}</CardTitle>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        />
        <CardText>
          <p>${product.price}</p>
        </CardText>
        {product.countInStock === 0 ? (
          <Button
            variant="light"
            disabled
          >
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </CardBody>
    </Card>
  )
}
