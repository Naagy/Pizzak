import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { Button } from 'react-bootstrap';
import apiClient from '../api/apiClient';
import { Container, Toast, ToastContainer } from 'react-bootstrap';

const Pizza: React.FC<{ addToKosar: (pizza: Product) => void }> = ({ addToKosar }) => {
    const { id } = useParams<{ id: string }>();
    const [pizza, setPizza] = useState<Product | null>(null);
    const navigate = useNavigate();

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    useEffect(() => {
        apiClient
            .get(`/pizzak/${id}`)
            .then((response) => setPizza(response.data))
            .catch(console.error);
    }, [id]);

    if (!pizza) return <p>Pizza betöltése...</p>;

    return (
        <Container className="mt-4">
            <div className="container mt-4">
                <img
                    src={`http://localhost:8001/api/kepek/${pizza.imageUrl}`}
                    alt={pizza.nev}
                    style={{ width: '30%' }}
                />
                <h2>{pizza.nev}</h2>
                <p>{pizza.leiras}</p>
                <p>
                    <strong>{pizza.ar} Ft</strong>
                </p>
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
            </div>
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
                    <Toast.Body>Pizza megtekintése.</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Pizza;
