import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function UserForm({ editingUser, setEditingUser, fetchUsers }) {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        telefono: ''
    });

    useEffect(() => {
        if (editingUser) {
            setFormData({
                nombres: editingUser.nombres,
                apellidos: editingUser.apellidos,
                telefono: editingUser.telefono
            });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await axios.put(`http://localhost:8000/api/users/${editingUser.id}`, formData);
            } else {
                await axios.post('http://localhost:8000/api/users', formData);
            }
            fetchUsers();
            setEditingUser(null);
            setFormData({
                nombres: '',
                apellidos: '',
                telefono: ''
            });
        } catch (error) {
            console.error('Error saving user', error);
        }
    };
    

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
            </Button>
        </Form>
    );
}

export default UserForm;
