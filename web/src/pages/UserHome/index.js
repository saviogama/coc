import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiLogOut, FiTrash2, FiEdit3 } from 'react-icons/fi';
import { formatter } from '../../components/Formatter';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function UserHome() {
    const [cpf, setCpf] = useState(null);
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
            alert('Erro ao buscar paciente!');
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
            alert('Erro ao deletar paciente!');
        }
    }

    async function editPatient(e, patient) {
        e.preventDefault();
        history.push(`/edit/${patient}`);
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
                <button className="smallbutton" id="allsearch" type="button" onClick={searchAll}>Listar todos</button>
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
                            <FiTrash2 size={20} color="#a8a8b3" onClick={(e) => { deletePatient(e, patient.cpf) }} />
                        </button>
                        <button className="bt2" type="button">
                            <FiEdit3 size={20} color="#a8a8b3" onClick={(e) => { editPatient(e, patient.cpf) }} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
