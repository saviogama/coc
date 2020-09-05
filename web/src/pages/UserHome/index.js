import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiLogOut, FiTrash2, FiEdit3 } from 'react-icons/fi';
import { formatter } from '../../components/Formatter';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function UserHome() {
    const [cpf, setCpf] = useState('');
    const [patients, setPatients] = useState([]);

    const { token } = useContext(StoreContext);
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    async function searchPatient(e) {
        e.preventDefault();

        try {
            await api.get('patients', {
                params: {
                    cpf
                },
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setPatients(response.data);
            })
        } catch (error) {
            alert('Erro ao buscar paciente!');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <span>Bem-vindo de volta!</span>
                <Link className="button" id="link1" to="/register">Novo Paciente</Link>
                <Link className="button" id="link2" to="/appointments">Consultas</Link>
                <button className="logout" onClick={handleLogout} type="button">
                    Sair
                    <FiLogOut size={18} color="#52658c" />
                </button>
            </header>
            <form onSubmit={searchPatient}>
                <h3>Pesquisar por CPF:</h3>
                <input
                    className="searchform"
                    placeholder="Digite o CPF desejado"
                    value={cpf}
                    onChange={e => setCpf(formatter(e.target.value))}
                    required
                />
                <button className="smallbutton" type="submit">Buscar</button>
            </form>
            <h2>Pessoas cadastradas</h2>
            <ul>
                {patients.map(patient => (
                    <li key={patient.cpf}>
                        <strong>Nome:</strong>
                        <p>{patient.nome}</p>
                        <strong>CPF:</strong>
                        <p>{patient.cpf}</p>
                        <strong>RG:</strong>
                        <p><p>{patient.rg}</p></p>
                        <button className="bt" type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button className="bt2" type="button">
                            <FiEdit3 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
