import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function Consultas() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <Link className="button" id="link1" to="/new">Nova Consulta</Link>
                <Link className="back-link" id="link3" to="/home">
                    <FiArrowLeft size={16} color="#52658c" />
                    Voltar
                </Link>
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
                    <button className="bt" type="button">
                        <FiCheck size={20} color="#a8a8b3" />
                    </button>
                </li>
            </ul>
        </div>
    );
}
