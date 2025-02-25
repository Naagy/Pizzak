import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import apiClient from '../api/apiClient';
import { Card, Button, Col, Container, Row, Toast, ToastContainer, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

const Pizzak: React.FC<{ addToKosar: (pizza: Product) => void }> = ({ addToKosar }) => {
    const [data, setData] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((response) => setData(response.data))
            .catch(console.error);
    }, []);

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Container className="mt-4">
            <h1 className="text-center">Pizzák</h1>
            <Row xs={1} md={3} lg={4} className="g-4">
                {data.map((pizza) => (
                    <Col key={pizza.id}>
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={`http://localhost:8001/api/kepek/${pizza.imageUrl}`}
                                alt={pizza.nev}
                            />
                            <Card.Body>
                                <Card.Title>{pizza.nev}</Card.Title>
                                <Card.Text>{pizza.leiras}</Card.Text>
                                <Card.Text>{pizza.ar} Ft</Card.Text>
                                <Stack gap={3}>
                                    <Link to={`/pizza/${pizza.id}`}>
                                        <Button
                                            variant="primary"
                                            type="button"
                                            className="btn btn-dark"
                                        >
                                            Megtekintés
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={() => {
                                            addToKosar(pizza);
                                        }}
                                    >
                                        Kosárba
                                    </Button>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    bg="dark"
                    className="text-white"
                    autohide
                    delay={3000}
                    show={show}
                    onClose={handleClose}
                >
                    <Toast.Header>
                        <strong className="me-auto">Értesítés</strong>
                        <small>Épp most</small>
                    </Toast.Header>
                    <Toast.Body>Pizzák.</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Pizzak;
