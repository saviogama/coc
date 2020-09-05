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
                    <Link className="back-link" to="/appointments">
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
                        <option defaultValue value="curva_tensional">Curva Tensional</option>
                        <option value="fundo_de_olho">Fundo de olho</option>
                        <option value="teste_de_olhinho">Teste de olhinho</option>
                        <option value="mapeamento_de_retina">Mapeamento de retina</option>
                        <option value="paquimetria">Paquimetria</option>
                        <option value="gonioscopia">Gonioscopia</option>
                        <option value="pressao_intraocular">Pressão intraocular</option>
                    </select>
                    <button className="button" type="submit">Confirmar</button>
                </form>
            </div>
        </div>
    )
}
