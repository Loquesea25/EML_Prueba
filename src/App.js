import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios'; 

function App() {
    const [editingUser, setEditingUser] = useState(null);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Gestión de Usuarios</h1>
                    <UserForm
                        editingUser={editingUser}
                        setEditingUser={setEditingUser}
                        fetchUsers={fetchUsers}  
                    />
                    <UserList setEditingUser={setEditingUser} fetchUsers={fetchUsers} users={users} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
