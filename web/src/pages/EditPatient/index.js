import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function EditPatient() {
    const [patient, setPatient] = useState({});
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
    const { cpf } = useParams();
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            await api.get('patients', {
                params: {
                    'cpf': cpf
                },
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setPatient(response.data[0]);
                setNome(response.data[0].nome);
                setRg(response.data[0].rg);
                setData_nascimento(response.data[0].data_nascimento);
                setIdade(response.data[0].idade);
                setReg(response.data[0].reg);
                setRua(response.data[0].rua);
                setNumero(response.data[0].numero);
                setBairro(response.data[0].bairro);
                setNome_pai(response.data[0].nome_pai);
                setNome_mae(response.data[0].nome_mae);
                setTelefone(response.data[0].telefone);
                setEmail(response.data[0].email);
                setProfissao(response.data[0].profissao);
                setConvenio(response.data[0].convenio);
                setAntecedentes_pessoais(response.data[0].antecedentes_pessoais);
            })
        })();
    }, [setPatient]);

    async function handleEditPatient(e) {
        e.preventDefault();

        const data = {
            cpf,
            nome,
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
            await api.put('/patients', data, {
                headers: {
                    'Authorization': token
                }
            });
            history.push('/user');
        } catch (err) {
            alert('Erro ao editar cadastro!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Editar paciente</h1>
                    <p>Edite as informações do paciente no sistema.</p>
                    <Link className="back-link" to="/user">
                        <FiArrowLeft size={16} color="#52658c" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleEditPatient}>
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
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
                    <button className="button" type="submit">Editar</button>
                </form>
            </div>
        </div>
    )
}
