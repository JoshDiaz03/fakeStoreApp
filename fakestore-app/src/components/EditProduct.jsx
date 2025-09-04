import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', price: '', description: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
            console.log(response.data);
            setSuccess(true);
            navigate('/products');
            setError(null);
        } catch(error) {
            setError(`Error submitting form. Please try again: ${error.message}`);
            setSuccess(false);
        }
    }

  if (loading) return <Spinner animation="border" className='d-block mx-auto' />;
  if (error && !success) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2>Edit Product</h2>
      {success && <Alert variant="success">Product updated (mock success)!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" value={formData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Update Product</Button>
      </Form>
    </Container>
  );
}

export default EditProduct;