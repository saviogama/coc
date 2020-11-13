import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { stringfy } from '../../components/Formatter';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';

export default function UserAppointmentsEnd() {
    const [consultas, setConsultas] = useState([]);

    const { token } = useContext(StoreContext);

    useEffect(() => {
        (async () => {
            await api.get('history', {
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
                await api.get('history', {
                    headers: {
                        Authorization: token,
                    }
                }).then(response => {
                    setConsultas(response.data);
                });
            })();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    async function deleteConsultas(e) {
        e.preventDefault();

        await api.delete('history', {
            headers: {
                Authorization: token,
            }
        }).then(response => {
            window.location.reload(false);
        });
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="COC" />
                <Link className="button" id="link1" onClick={deleteConsultas}>Excluir todas</Link>
                <Link className="back-link" id="link3" to="/user">
                    <FiArrowLeft size={16} color="#52658c" />
                    Voltar
                </Link>
            </header>
            <h2>Consultas finalizadas do dia</h2>
            <ul>
                {consultas.map(consulta => (
                    <li key={consulta.id}>
                        <strong>Nome:</strong>
                        <p>{consulta.nome}</p>
                        <strong>Nome da mãe:</strong>
                        <p>{consulta.nome_mae}</p>
                        <strong>Tipo:</strong>
                        <p>{stringfy(consulta.forma)}</p>
                        <strong>Tipo de consulta:</strong>
                        <p>{stringfy(consulta.tipo)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
