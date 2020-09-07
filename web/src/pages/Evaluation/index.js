import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function Evaluation() {
    const [consulta, setConsulta] = useState({});
    const [patient, setPatient] = useState('');

    const [avl_olho_direito, setAvl_olho_direito] = useState('');
    const [avl_olho_esquerdo, setAvl_olho_esquerdo] = useState('');
    const [hda, setHda] = useState('');
    const [tonometria_olho_direito, setTonometria_olho_direito] = useState('');
    const [tonometria_olho_esquerdo, setTonometria_olho_esquerdo] = useState('');
    const [inspecao, setInspecao] = useState('');
    const [inspecao_ppc, setInspecao_ppc] = useState('');
    const [refracao_olho_direito_esferico, setRefracao_olho_direito_esferico] = useState('');
    const [refracao_olho_esquerdo_esferico, setRefracao_olho_esquerdo_esferico] = useState('');
    const [refracao_olho_direito_cilindro, setRefracao_olho_direito_cilindro] = useState('');
    const [refracao_olho_esquerdo_cilindro, setRefracao_olho_esquerdo_cilindro] = useState('');
    const [refracao_olho_direito_eixo, setRefracao_olho_direito_eixo] = useState('');
    const [refracao_olho_esquerdo_eixo, setRefracao_olho_esquerdo_eixo] = useState('');
    const [refracao_olho_direito_adicao, setRefracao_olho_direito_adicao] = useState('');
    const [refracao_olho_esquerdo_adicao, setRefracao_olho_esquerdo_adicao] = useState('');
    const [dp, setDp] = useState('');
    const [fungoscopia, setFungoscopia] = useState('');

    const { token, signOut } = useContext(StoreContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            await api.get(`today/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setConsulta(response.data);
                const patientCpf = response.data.cpf;

                api.get('patients', {
                    params: {
                        'cpf': patientCpf
                    },
                    headers: {
                        Authorization: token
                    }
                }).then(response2 => {
                    setPatient(response2.data[0]);
                });
            });
        })();
    }, [setConsulta]);

    async function handleNewPatient(e) {
        e.preventDefault();
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#52658c" />
                        Voltar
                    </Link>
                    <h1>Informações adicionais do paciente</h1>
                    <strong>Nome:</strong>
                    <p>{patient.nome}</p>
                    <strong>Idade:</strong>
                    <p>{patient.idade}</p>
                    <strong>Profissão:</strong>
                    <p>{patient.profissao}</p>
                    <strong>Convênio:</strong>
                    <p>{patient.convenio}</p>
                    <strong>Tipo de consulta:</strong>
                    <p>{consulta.tipo}</p>
                    <strong>Antecedentes pessoais:</strong>
                    <p>{patient.antecedentes_pessoais}</p>
                </section>
                <form onSubmit={handleNewPatient}>
                    <strong>HDA:</strong>
                    <input
                        placeholder="HDA"
                        value={hda}
                        onChange={e => setHda(e.target.value)}
                    />
                    <strong>Tonometria:</strong>
                    <div>
                        <input
                            placeholder="OE"
                            value={tonometria_olho_esquerdo}
                            onChange={e => setTonometria_olho_esquerdo(e.target.value)}
                        />
                        <input
                            placeholder="OD"
                            value={tonometria_olho_direito}
                            onChange={e => setTonometria_olho_direito(e.target.value)}
                        />
                    </div>
                    <strong>Inspeção:</strong>
                    <input
                        placeholder="Inspeção"
                        value={inspecao}
                        onChange={e => setInspecao(e.target.value)}
                    />
                    <input
                        placeholder="PPC"
                        value={inspecao_ppc}
                        onChange={e => setInspecao_ppc(e.target.value)}
                    />
                    <strong>Refração:</strong>
                    <p>Esférico</p>
                    <div>
                        <input
                            placeholder="OE"
                            value={refracao_olho_esquerdo_esferico}
                            onChange={e => setRefracao_olho_esquerdo_esferico(e.target.value)}
                        />
                        <input
                            placeholder="OD"
                            value={refracao_olho_direito_esferico}
                            onChange={e => setRefracao_olho_direito_esferico(e.target.value)}
                        />
                    </div>
                    <p>Cilindro</p>
                    <div>
                        <input
                            placeholder="OE"
                            value={refracao_olho_esquerdo_cilindro}
                            onChange={e => setRefracao_olho_esquerdo_cilindro(e.target.value)}
                        />
                        <input
                            placeholder="OD"
                            value={refracao_olho_direito_cilindro}
                            onChange={e => setRefracao_olho_direito_cilindro(e.target.value)}
                        />
                    </div>
                    <p>Eixo</p>
                    <div>
                        <input
                            placeholder="OE"
                            value={refracao_olho_esquerdo_eixo}
                            onChange={e => setRefracao_olho_esquerdo_eixo(e.target.value)}
                        />
                        <input
                            placeholder="OD"
                            value={refracao_olho_direito_eixo}
                            onChange={e => setRefracao_olho_direito_eixo(e.target.value)}
                        />
                    </div>
                    <p>Adição</p>
                    <div>
                        <input
                            placeholder="OE"
                            value={refracao_olho_esquerdo_adicao}
                            onChange={e => setRefracao_olho_esquerdo_adicao(e.target.value)}
                        />
                        <input
                            placeholder="OD"
                            value={refracao_olho_direito_adicao}
                            onChange={e => setRefracao_olho_direito_adicao(e.target.value)}
                        />
                    </div>
                    <input
                        placeholder="DP"
                        value={dp}
                        onChange={e => setDp(e.target.value)}
                    />
                    <strong>Fungoscopia:</strong>
                    <input
                        placeholder="Fungoscopia"
                        value={fungoscopia}
                        onChange={e => setFungoscopia(e.target.value)}
                    />
                    <strong>AVL:</strong>
                    <div>
                        <input
                            placeholder="OE"
                            value={avl_olho_esquerdo}
                            onChange={e => setAvl_olho_esquerdo(e.target.value)}
                        />
                        <input
                            placeholder="OD"
                            value={avl_olho_direito}
                            onChange={e => setAvl_olho_direito(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Continuar</button>
                </form>
            </div>
        </div>
    )
}
