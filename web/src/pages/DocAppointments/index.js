import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function DocAppointments() {
    const [consultas, setConsultas] = useState([]);

    const { token, signOut } = useContext(StoreContext);
    const history = useHistory();

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

    function handleLogout() {
        signOut();
    }

    function handleEvaluation(e, consulta) {
        e.preventDefault();
        history.push(`/evaluation/${consulta}`);
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <span>Bem-vindo de volta!</span>
                <button className="logout" id="logoutmed" onClick={handleLogout} type="button">
                    Sair
                    <FiLogOut size={18} color="#52658c" />
                </button>
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
                        <p>{consulta.tipo}</p>
                        <button className="bt" type="button" onClick={(e) => { handleEvaluation(e, consulta.id) }}>
                            <FiLogIn size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
