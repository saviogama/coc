import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function NewPatient() {
    const [nome, setNome] = useState('');
    const [dn, setDn] = useState('');
    const [reg, setReg] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nomePai, setNomePai] = useState('');
    const [nomeMae, setNomeMae] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [profissao, setProfissao] = useState('');
    const [convenio, setConvenio] = useState('');
    const [antecedentes, setAntecedentes] = useState('');

    const history = useHistory();

    async function handleNewPacient(e) {
        e.preventDefault();
        console.log(nome);
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Novo paciente</h1>
                    <p>Preencha as informações para cadastrar um novo paciente no sistema.</p>
                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#52658c" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewPacient}>
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Data de nascimento"
                        value={dn}
                        onChange={e => setDn(e.target.value)}
                    />
                    <input
                        placeholder="Reg."
                        value={reg}
                        onChange={e => setReg(e.target.value)}
                    />
                    <input
                        placeholder="Endereço"
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)}
                    />
                    <input
                        placeholder="Nome do pai"
                        value={nomePai}
                        onChange={e => setNomePai(e.target.value)}
                    />
                    <input
                        placeholder="Nome da mãe"
                        value={nomeMae}
                        onChange={e => setNomeMae(e.target.value)}
                    />
                    <input
                        placeholder="RG"
                        value={rg}
                        onChange={e => setRg(e.target.value)}
                    />
                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                    <input
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Profissão"
                        value={profissao}
                        onChange={e => setProfissao(e.target.value)}
                    />
                    <input
                        placeholder="Convênio"
                        value={convenio}
                        onChange={e => setConvenio(e.target.value)}
                    />
                    <textarea
                        placeholder="Antecedentes pessoais"
                        value={antecedentes}
                        onChange={e => setAntecedentes(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
