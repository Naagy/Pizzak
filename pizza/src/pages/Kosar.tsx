import { Product } from '../types/Product';
import { Container, Table, Button, ToastContainer, Toast } from 'react-bootstrap';
import { useState } from 'react';

const Kosar: React.FC<{
    kosar: Product[];
    setKosar: React.Dispatch<React.SetStateAction<Product[]>>;
}> = ({ kosar, setKosar }) => {
    const vegosszeg = kosar.reduce((total, item) => total + item.ar, 0);

    const emptyCart = () => {
        setKosar([]);
        localStorage.removeItem('kosar');
    };

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Container className="mt-4">
            <h1 className="text-center">Kosár</h1>
            {kosar.length ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Kép</th>
                                <th>Név</th>
                                <th>Ár</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kosar.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={`http://localhost:8001/api/kepek/${item.imageUrl}`}
                                            alt={item.nev}
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                    </td>
                                    <td>{item.nev}</td>
                                    <td>{item.ar} Ft</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h2>Végösszeg: {vegosszeg} Ft</h2>
                    <Button variant="danger" onClick={emptyCart}>
                        Kosár kiürítése
                    </Button>
                </>
            ) : (
                <p className="text-center">A kosár üres.</p>
            )}
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
                    <Toast.Body>A kosár sikeresen frissült.</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Kosar;
