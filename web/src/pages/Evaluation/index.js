import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

export default function Evaluation() {
    const [consulta, setConsulta] = useState({});
    const [patient, setPatient] = useState([]);
    const [forma, setForma] = useState('');
    const [tipo, setTipo] = useState('');

    const [hda, setHda] = useState('');
    const [longe_esferico_od, setLonge_esferico_od] = useState('');
    const [longe_esferico_oe, setLonge_esferico_oe] = useState('');
    const [longe_cilindro_od, setLonge_cilindro_od] = useState('');
    const [longe_cilindro_oe, setLonge_cilindro_oe] = useState('');
    const [longe_eixo_od, setLonge_eixo_od] = useState('');
    const [longe_eixo_oe, setLonge_eixo_oe] = useState('');
    const [adicao, setAdicao] = useState('');
    const [perto_esferico_od, setPerto_esferico_od] = useState('');
    const [perto_esferico_oe, setPerto_esferico_oe] = useState('');
    const [perto_cilindro_od, setPerto_cilindro_od] = useState('');
    const [perto_cilindro_oe, setPerto_cilindro_oe] = useState('');
    const [perto_eixo_od, setPerto_eixo_od] = useState('');
    const [perto_eixo_oe, setPerto_eixo_oe] = useState('');
    const [avl_od, setAvl_od] = useState('');
    const [avl_oe, setAvl_oe] = useState('');
    const [tonometria_od, setTonometria_od] = useState('');
    const [tonometria_oe, setTonometria_oe] = useState('');
    const [biomicroscopia, setBiomicroscopia] = useState('');
    const [fundoscopia, setFundoscopia] = useState('');
    const [outros, setOutros] = useState('');

    const { token } = useContext(StoreContext);
    const history = useHistory();
    const { id } = useParams();

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

                if (response.data.forma === 'consulta') {
                    setForma('Consulta');
                }
                if (response.data.forma === 'volta') {
                    setForma('Volta');
                }

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

                const patientId = response.data.patient_id;

                api.get(`patients/${patientId}`, {
                    headers: {
                        Authorization: token
                    }
                }).then(response2 => {
                    setPatient(response2.data);
                });
            });
        })();
    }, [setConsulta]);

    async function handleNewEvaluation(e) {
        e.preventDefault();

        const data = {
            hda,
            longe_esferico_od,
            longe_esferico_oe,
            longe_cilindro_od,
            longe_cilindro_oe,
            longe_eixo_od,
            longe_eixo_oe,
            adicao,
            perto_esferico_od,
            perto_esferico_oe,
            perto_cilindro_od,
            perto_cilindro_oe,
            perto_eixo_od,
            perto_eixo_oe,
            avl_od,
            avl_oe,
            tonometria_od,
            tonometria_oe,
            biomicroscopia,
            fundoscopia,
            outros,
            'consulta_id': id
        };

        try {
            await api.post('/evaluations', data, {
                headers: {
                    'Authorization': token
                }
            });
            history.push(`/review/${consulta.id}`);
        } catch (err) {
            alert('Erro ao continuar avaliação');
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
                    <strong>Tipo:</strong>
                    <p>{forma}</p>
                    <strong>Tipo de consulta:</strong>
                    <p>{tipo}</p>
                    <strong>Antecedentes pessoais:</strong>
                    <p>{patient.antecedentes_pessoais}</p>
                </section>
                <form onSubmit={handleNewEvaluation}>
                    <strong>OP/HDA:</strong>
                    <input
                        placeholder="OP/HDA"
                        value={hda}
                        onChange={e => setHda(e.target.value)}
                    />
                    <strong>Refração:</strong>
                    <strong>Longe:</strong>
                    <div>
                        <p id="od">OD</p>
                        <input
                            placeholder="Esférico"
                            value={longe_esferico_od}
                            onChange={e => setLonge_esferico_od(e.target.value)}
                        />
                        <input
                            placeholder="Cilindro"
                            value={longe_cilindro_od}
                            onChange={e => setLonge_cilindro_od(e.target.value)}
                        />
                        <input
                            placeholder="Eixo"
                            value={longe_eixo_od}
                            onChange={e => setLonge_eixo_od(e.target.value)}
                        />
                    </div>
                    <div>
                        <p id="oe">OE</p>
                        <input
                            placeholder="Esférico"
                            value={longe_esferico_oe}
                            onChange={e => setLonge_esferico_oe(e.target.value)}
                        />
                        <input
                            placeholder="Cilindro"
                            value={longe_cilindro_oe}
                            onChange={e => setLonge_cilindro_oe(e.target.value)}
                        />
                        <input
                            placeholder="Eixo"
                            value={longe_eixo_oe}
                            onChange={e => setLonge_eixo_oe(e.target.value)}
                        />
                    </div>
                    <strong>Adição:</strong>
                    <input
                        placeholder="Adição"
                        value={adicao}
                        onChange={e => setAdicao(e.target.value)}
                    />
                    <strong>Perto:</strong>
                    <div>
                        <p id="od">OD</p>
                        <input
                            placeholder="Esférico"
                            value={perto_esferico_od}
                            onChange={e => setPerto_esferico_od(e.target.value)}
                        />
                        <input
                            placeholder="Cilindro"
                            value={perto_cilindro_od}
                            onChange={e => setPerto_cilindro_od(e.target.value)}
                        />
                        <input
                            placeholder="Eixo"
                            value={perto_eixo_od}
                            onChange={e => setPerto_eixo_od(e.target.value)}
                        />
                    </div>
                    <div>
                        <p id="oe">OE</p>
                        <input
                            placeholder="Esférico"
                            value={perto_esferico_oe}
                            onChange={e => setPerto_esferico_oe(e.target.value)}
                        />
                        <input
                            placeholder="Cilindro"
                            value={perto_cilindro_oe}
                            onChange={e => setPerto_cilindro_oe(e.target.value)}
                        />
                        <input
                            placeholder="Eixo"
                            value={perto_eixo_oe}
                            onChange={e => setPerto_eixo_oe(e.target.value)}
                        />
                    </div>
                    <strong>AVL:</strong>
                    <div>
                        <input
                            placeholder="OD"
                            value={avl_od}
                            onChange={e => setAvl_od(e.target.value)}
                        />
                        <input
                            placeholder="OE"
                            value={avl_oe}
                            onChange={e => setAvl_oe(e.target.value)}
                        />
                    </div>
                    <strong>Tonometria:</strong>
                    <div>
                        <input
                            placeholder="OD"
                            value={tonometria_od}
                            onChange={e => setTonometria_od(e.target.value)}
                        />
                        <input
                            placeholder="OE"
                            value={tonometria_oe}
                            onChange={e => setTonometria_oe(e.target.value)}
                        />
                    </div>
                    <strong>Biomicroscopia:</strong>
                    <input
                        placeholder="Biomicroscopia"
                        value={biomicroscopia}
                        onChange={e => setBiomicroscopia(e.target.value)}
                    />
                    <strong>Fundoscopia:</strong>
                    <input
                        placeholder="Fundoscopia"
                        value={fundoscopia}
                        onChange={e => setFundoscopia(e.target.value)}
                    />
                    <textarea
                        placeholder="Outros"
                        value={outros}
                        onChange={e => setOutros(e.target.value)}
                    />
                    <button className="button" type="submit">Continuar</button>
                </form>
            </div>
        </div>
    )
}
