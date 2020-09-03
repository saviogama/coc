import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function DocAppointments() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function handleEvaluation() {
        history.push('/evaluation')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <span>Bem-vindo de volta!</span>
                <button className="logout" onClick={handleLogout} type="button">
                    Sair
                    <FiLogOut size={18} color="#52658c" />
                </button>
            </header>
            <h2>Consultas do dia</h2>
            <ul>
                <li>
                    <strong>Nome:</strong>
                    <p>José Savio Gama Macêdo da Silva Cordeiro</p>
                    <strong>CPF:</strong>
                    <p>118.321.494-47</p>
                    <strong>Tipo de consulta:</strong>
                    <p>Teste de olhinho</p>
                    <strong>Antecedentes pessoais:</strong>
                    <p>Não tem</p>
                    <button className="bt" type="button" onClick={handleEvaluation}>
                        <FiLogIn size={20} color="#a8a8b3" />
                    </button>
                </li>
            </ul>
        </div>
    );
}
