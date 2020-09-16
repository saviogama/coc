import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import { formatter } from '../../components/Formatter';
import './styles.css';

export default function NewAppointment() {
    const [id, setId] = useState('');
    const [tipo, setTipo] = useState('');

    const { token } = useContext(StoreContext);
    const history = useHistory();

    async function handleNewAppointment(e) {
        e.preventDefault();

        const data = {
            tipo,
            'patient_id': id
        };

        try {
            await api.post('/appointments', data, {
                headers: {
                    'Authorization': token
                }
            });
            history.push('/appointments');
        } catch (err) {
            alert('Erro ao criar consulta!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Nova consulta</h1>
                    <p>Informe o ID de um paciente cadastrado e o tipo da consulta.</p>
                    <Link className="back-link" to="/appointments">
                        <FiArrowLeft size={16} color="#52658c" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewAppointment}>
                    <input
                        placeholder="ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        required
                    />
                    <select value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value='' disabled>Selecione o tipo da consulta</option>
                        <option value="curva_tensional">Curva Tensional</option>
                        <option value="fundo_de_olho">Fundo de olho</option>
                        <option value="teste_de_olhinho">Teste de olhinho</option>
                        <option value="mapeamento_de_retina">Mapeamento de retina</option>
                        <option value="paquimetria">Paquimetria</option>
                        <option value="gonioscopia">Gonioscopia</option>
                        <option value="pressao_intraocular">Pressão intraocular</option>
                    </select>
                    <button className="button" type="submit">Criar</button>
                </form>
            </div>
        </div>
    )
}
