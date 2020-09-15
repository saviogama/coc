import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { stringfy } from '../../components/Formatter';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function UserAppointments() {
    const [consultas, setConsultas] = useState([]);

    const { token } = useContext(StoreContext);

    useEffect(() => {
        (async () => {
            await api.get('today', {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setConsultas(response.data);
            });
        })();
    }, [setConsultas]);

    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                await api.get('today', {
                    headers: {
                        Authorization: token,
                    }
                }).then(response => {
                    setConsultas(response.data);
                });
            })();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    async function deleteConsulta(e, id) {
        e.preventDefault();

        try {
            await api.delete(`today/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                window.location.reload(false);
            });
        } catch (error) {
            alert('A consulta não existe ou já foi deletada.');
            window.location.reload(false);
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <Link className="button" id="link1" to="/appointments-new">Nova Consulta</Link>
                <Link className="back-link" id="link3" to="/user">
                    <FiArrowLeft size={16} color="#52658c" />
                    Voltar
                </Link>
            </header>
            <h2>Consultas do dia</h2>
            <ul>
                {consultas.map(consulta => (
                    <li key={consulta.id}>
                        <strong>Nome:</strong>
                        <p>{consulta.nome}</p>
                        <strong>CPF:</strong>
                        <p>{consulta.cpf}</p>
                        <strong>Tipo de consulta:</strong>
                        <p>{stringfy(consulta.tipo)}</p>
                        <button className="bt" type="button">
                            <FiCheck size={20} color="#a8a8b3" onClick={(e) => { deleteConsulta(e, consulta.id) }} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
