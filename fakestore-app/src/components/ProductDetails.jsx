import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Modal from 'react-bootstrap/Modal'
import Alert from `react-bootstrap/Alert`
import Button from "react-bootstrap/esm/Button";

function ProductDetails () {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
            setProduct(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError("Failed to fetch products.");
            setLoading(false);
        })
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
            .then(() => {
                alert('Product deleted');
                navigate('/products');

            })
            .catch(() => alert('Delete failed.'));
            setShowModal(false);
    }

    if(loading) return <p>Loading products...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if(!product) return null;

    return (
        <Container>
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>Category: {product.category}</Card.Text>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                    <Button variant="warning" as={Link} to={`/edit-product/${id}`}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
                </Card.Body>
            </Card>

            <Modal onShow={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button varitant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>

                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default ProductDetails;




