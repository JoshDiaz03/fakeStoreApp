import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from 'react-router-dom';






function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios
        .get(`https://fakestoreapi.com/products`)
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError("Failed to fetch products.");
            setLoading(false);
        })
    }, []);

    if(loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Products</h1>
            <Container>
                <Row>
                    {products.map((product) =>(
                        <Col key={product.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img variant="top" src={product.image} alt={product.title}/>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>${product.price}</Card.Text>
                                </Card.Body>
                                <Button as={Link} to={`${product.id}`} variant="primary">View Details</Button>
                            </Card>

                        </Col> 
                    ))}
                </Row>
            </Container>
        </>
    )
}
export default ProductList