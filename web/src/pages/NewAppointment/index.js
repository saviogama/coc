import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { formatter } from '../../components/Formatter';
import './styles.css';

export default function NewAppointment() {
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');

    const history = useHistory();

    async function handleNewPacient(e) {
        e.preventDefault();
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Nova consulta</h1>
                    <p>Informe o CPF de um paciente cadastrado e o tipo da consulta.</p>
                    <Link className="back-link" to="/consultas">
                        <FiArrowLeft size={16} color="#52658c" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewPacient}>
                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={e => setCpf(formatter(e.target.value))}
                    />
                    <select value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option defaultValue value="laranja">Laranja</option>
                        <option value="limao">Limão</option>
                        <option value="coco">Coco</option>
                        <option value="manga">Manga</option>
                    </select>
                    <button className="button" type="submit">Confirmar</button>
                </form>
            </div>
        </div>
    )
}
