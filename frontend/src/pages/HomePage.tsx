import axios from 'axios'
import { useEffect, useReducer } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery()
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    // why can't use {getError(error as ApiError)}
    <MessageBox variant="danger">{error.message}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      {products!.map((product) => (
        <Col
          key={product.slug}
          sm={6}
          md={4}
          lg={3}
        >
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
