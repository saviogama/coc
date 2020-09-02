import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiTrash2, FiEdit3 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function Home() {
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
                <span>Bem-vindo de volta!</span>
                <Link className="button" id="link1" to="/register">Novo Paciente</Link>
                <Link className="button" id="link2" to="/consultas">Consultas</Link>
                <button className="logout" onClick={handleLogout} type="button">
                    Sair
                    <FiLogOut size={18} color="#52658c" />
                </button>
            </header>
            <form>
                <h3>Pesquisar por CPF:</h3>
                <input
                    className="searchform"
                    placeholder="Digite o CPF desejado"
                />
                <button className="smallbutton" type="submit">Buscar</button>
            </form>
            <h2>Pessoas cadastradas</h2>
            <ul>
                <li>
                    <strong>Nome:</strong>
                    <p>José Savio Gama Macêdo da Silva Cordeiro</p>
                    <strong>CPF:</strong>
                    <p>118.321.494-47</p>
                    <strong>RG:</strong>
                    <p>9.257.175</p>
                    <button className="bt" type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    <button className="bt2" type="button">
                        <FiEdit3 size={20} color="#a8a8b3" />
                    </button>
                </li>
            </ul>
        </div>
    );
}
