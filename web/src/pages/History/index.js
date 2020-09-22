import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { stringfy } from '../../components/Formatter';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function History() {
    const [patient, setPatient] = useState({});
    const [consultas, setConsultas] = useState([]);
    const { token } = useContext(StoreContext);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            await api.get(`patients/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setPatient(response.data);
            });
        })();
    }, [setPatient]);

    useEffect(() => {
        (async () => {
            await api.get(`appointments-patient/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setConsultas(response.data);
            });
        })();
    }, [setConsultas]);

    function patientHistory(e, consulta) {
        e.preventDefault();
        history.push(`/details/${consulta}`);
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <Link className="back-link" id="link4" to="/user">
                    <FiArrowLeft size={16} color="#52658c" />
                    Voltar
                </Link>
            </header>
            <h2>Histórico de consultas de {patient.nome}</h2>
            <ul>
                {consultas.map(consulta => (
                    <li key={consulta.id}>
                        <strong>Tipo da consulta:</strong>
                        <p>{stringfy(consulta.tipo)}</p>
                        <strong>Data:</strong>
                        <p>{consulta.created_at}</p>
                        <button className="historico" onClick={(e) => { patientHistory(e, consulta.id) }}>Detalhes</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
