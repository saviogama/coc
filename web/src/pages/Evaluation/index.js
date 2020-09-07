import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function Evaluation() {
    const [consulta, setConsulta] = useState({});
    const [patient, setPatient] = useState([]);
    const [tipo, setTipo] = useState('');

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
    const [biomicroscopia, setBiomicroscopia] = useState('');
    const [fungoscopia, setFungoscopia] = useState('');

    const { token } = useContext(StoreContext);
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

                if (response.data.tipo === 'curva_tensional') {
                    setTipo('Curva tensional');
                }
                else if (response.data.tipo === 'fundo_de_olho') {
                    setTipo('Fundo de olho');
                }
                else if (response.data.tipo === 'teste_de_olhinho') {
                    setTipo('Teste de olhinho');
                }
                else if (response.data.tipo === 'mapeamento_de_retina') {
                    setTipo('Mapeamento de retina');
                }
                else if (response.data.tipo === 'paquimetria') {
                    setTipo('Paquimetria');
                }
                else if (response.data.tipo === 'gonioscopia') {
                    setTipo('Gonioscopia');
                }
                else if (response.data.tipo === 'pressao_intraocular') {
                    setTipo('Pressão intraocular');
                } else {
                    setTipo('');
                }

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

    async function handleNewEvaluation(e) {
        e.preventDefault();

        const data = {
            avl_olho_direito,
            avl_olho_esquerdo,
            hda,
            tonometria_olho_direito,
            tonometria_olho_esquerdo,
            inspecao,
            inspecao_ppc,
            refracao_olho_direito_esferico,
            refracao_olho_esquerdo_esferico,
            refracao_olho_direito_cilindro,
            refracao_olho_esquerdo_cilindro,
            refracao_olho_direito_eixo,
            refracao_olho_esquerdo_eixo,
            refracao_olho_direito_adicao,
            refracao_olho_esquerdo_adicao,
            dp,
            biomicroscopia,
            fungoscopia,
            'consulta_id': id
        };

        try {
            await api.post('/avaliacao', data, {
                headers: {
                    'Authorization': token
                }
            });
            history.push(`/review/${consulta.id}`);
            //remover o deletar de consulta do usuario, pois o today ja sera deletado apos a consulta finalizar
        } catch (err) {
            alert('Erro ao confirmar avaliação');
        }
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
                    <p>{tipo}</p>
                    <strong>Antecedentes pessoais:</strong>
                    <p>{patient.antecedentes_pessoais}</p>
                </section>
                <form onSubmit={handleNewEvaluation}>
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
                    <strong>Biomicroscopia:</strong>
                    <input
                        placeholder="Biomicroscopia"
                        value={biomicroscopia}
                        onChange={e => setBiomicroscopia(e.target.value)}
                    />
                    <strong>Fundoscopia:</strong>
                    <input
                        placeholder="Fundoscopia"
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
