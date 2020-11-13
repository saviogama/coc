import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiLogOut, FiTrash2, FiEdit3 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function UserHome() {
    const [nome, setNome] = useState('');
    const [patients, setPatients] = useState([]);
    const { token, signOut } = useContext(StoreContext);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            await api.get('patients-all', {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setPatients(response.data);
            });
        })();
    }, [setPatients]);

    function handleLogout() {
        signOut();
    }

    async function searchPatient(e) {
        e.preventDefault();

        try {
            await api.get('patients-name', {
                params: {
                    nome
                },
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setPatients(response.data);
            })
        } catch (error) {
            alert('Paciente não encontrado.');
        }
    }

    async function searchAll(e) {
        e.preventDefault();

        try {
            await api.get('patients-all', {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setPatients(response.data);
            })
        } catch (error) {
            alert('Erro ao buscar pacientes!');
        }
    }

    async function deletePatient(e, patient) {
        e.preventDefault();

        try {
            await api.delete(`patients/${patient}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                alert('Paciente deletado com sucesso');
                window.location.reload(false);
            });
        } catch (error) {
            alert('Erro ao deletar cadastro.');
        }
    }

    function editPatient(e, patient) {
        e.preventDefault();
        history.push(`/edit/${patient}`);
    }

    function patientHistory(e, patient) {
        e.preventDefault();
        history.push(`/history/${patient}`);
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
                <h3>Pesquisar por nome:</h3>
                <input
                    className="searchform"
                    placeholder="Informe o nome desejado"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <button className="smallbutton" type="submit">Buscar</button>
                <button className="smallbutton" id="allsearch" type="button" onClick={searchAll}>Listar todos</button>
            </form>
            <h2>Pessoas cadastradas</h2>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        <strong>ID:</strong>
                        <p>{patient.id}</p>
                        <strong>Nome:</strong>
                        <p>{patient.nome}</p>
                        <strong>Nome da mãe:</strong>
                        <p>{patient.nome_mae}</p>
                        <button className="historico" onClick={(e) => { patientHistory(e, patient.id) }}>Ver histórico</button>
                        <button className="bt" type="button">
                            <FiTrash2 size={20} color="#a8a8b3" onClick={(e) => { deletePatient(e, patient.id) }} />
                        </button>
                        <button className="bt2" type="button">
                            <FiEdit3 size={20} color="#a8a8b3" onClick={(e) => { editPatient(e, patient.id) }} />
                        </button>
                    </li>
                )).reverse()}
            </ul>
        </div>
    );
}
