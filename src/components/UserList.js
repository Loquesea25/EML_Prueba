import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

function UserList({ setEditingUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Teléfono</th>
                    <th>Fecha de Registro</th>
                    <th>Fecha de Última Modificación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nombres}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.telefono}</td>
                        <td>{user.fecha_registro}</td>
                        <td>{user.fecha_ultima_modificacion}</td>
                        <td>
                            <Button variant="warning" onClick={() => setEditingUser(user)}>Editar</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(user.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserList;
