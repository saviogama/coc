import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { formatter } from '../../components/Formatter';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function NewPatient() {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [idade, setIdade] = useState('');
    const [reg, setReg] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [nome_pai, setNome_pai] = useState('');
    const [nome_mae, setNome_mae] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [profissao, setProfissao] = useState('');
    const [convenio, setConvenio] = useState('');
    const [antecedentes_pessoais, setAntecedentes_pessoais] = useState('');

    const { token } = useContext(StoreContext);
    const history = useHistory();

    async function handleNewPacient(e) {
        e.preventDefault();

        const data = {
            nome,
            cpf,
            rg,
            data_nascimento,
            idade,
            reg,
            rua,
            numero,
            bairro,
            nome_pai,
            nome_mae,
            telefone,
            email,
            profissao,
            convenio,
            antecedentes_pessoais
        };

        try {
            await api.post('/patients', data, {
                headers: {
                    'Authorization': token
                }
            });
            history.push('/user');
        } catch (err) {
            alert('Erro ao cadastrar paciente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Novo paciente</h1>
                    <p>Preencha as informações para cadastrar um novo paciente no sistema.</p>
                    <Link className="back-link" to="/user">
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
                        placeholder="CPF"
                        value={cpf}
                        onChange={e => setCpf(formatter(e.target.value))}
                    />
                    <input
                        placeholder="RG"
                        value={rg}
                        onChange={e => setRg(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Data de nascimento"
                        value={data_nascimento}
                        onChange={e => setData_nascimento(e.target.value)}
                    />
                    <input
                        placeholder="Idade"
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                    />
                    <input
                        placeholder="Reg."
                        value={reg}
                        onChange={e => setReg(e.target.value)}
                    />
                    <input
                        placeholder="Endereço"
                        value={rua}
                        onChange={e => setRua(e.target.value)}
                    />
                    <div>
                        <input
                            placeholder="Bairro"
                            value={bairro}
                            onChange={e => setBairro(e.target.value)}
                        />
                        <input
                            placeholder="Número"
                            value={numero}
                            onChange={e => setNumero(e.target.value)}
                        />
                    </div>
                    <input
                        placeholder="Nome do pai"
                        value={nome_pai}
                        onChange={e => setNome_pai(e.target.value)}
                    />
                    <input
                        placeholder="Nome da mãe"
                        value={nome_mae}
                        onChange={e => setNome_mae(e.target.value)}
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
                        value={antecedentes_pessoais}
                        onChange={e => setAntecedentes_pessoais(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
