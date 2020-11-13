import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { toNumber } from '../../components/Formatter';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';
import footerTable from '../../assets/footerTable.png';
import './styles.css';

export default function RenderPrescricao() {
    const [avaliacao, setAvaliacao] = useState({});
    const [patient, setPatient] = useState([]);
    const [simples, setSimples] = useState('');
    const [multifocais, setMultifocais] = useState('');
    const [bifocais, setBifocais] = useState('');
    const [obs, setObs] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [show, setHide] = useState(false);

    const [longe_esferico_od, setLonge_esferico_od] = useState('');
    const [longe_esferico_oe, setLonge_esferico_oe] = useState('');
    const [longe_cilindro_od, setLonge_cilindro_od] = useState('');
    const [longe_cilindro_oe, setLonge_cilindro_oe] = useState('');
    const [longe_eixo_od, setLonge_eixo_od] = useState('');
    const [longe_eixo_oe, setLonge_eixo_oe] = useState('');
    const [perto_esferico_od, setPerto_esferico_od] = useState('');
    const [perto_esferico_oe, setPerto_esferico_oe] = useState('');
    const [perto_cilindro_od, setPerto_cilindro_od] = useState('');
    const [perto_cilindro_oe, setPerto_cilindro_oe] = useState('');
    const [perto_eixo_od, setPerto_eixo_od] = useState('');
    const [perto_eixo_oe, setPerto_eixo_oe] = useState('');

    const { token } = useContext(StoreContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            await api.get(`evaluations/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setAvaliacao(response.data);
            });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await api.get(`today/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
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
    }, []);

    async function finalizarAvaliacao(e) {
        e.preventDefault();

        await api.delete(`/today/${id}`, {
            headers: {
                Authorization: token,
            }
        });
        history.push("/home");
    }

    function hide() {
        setHide(true);
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Gerar prescrição</h1>
                    <strong>Nome:</strong>
                    <p>{patient.nome}</p>
                    <strong>Antecedentes pessoais:</strong>
                    <p>{patient.antecedentes_pessoais}</p>
                    <strong>OP/HDA:</strong>
                    <p>{avaliacao.hda}</p>
                    <strong>Refração:</strong>
                    <p/>
                    <strong>Longe(esférico):</strong>
                    <p>OD: {avaliacao.longe_esferico_od} / OE: {avaliacao.longe_esferico_oe}</p>
                    <strong>Longe(cilindro):</strong>
                    <p>OD: {avaliacao.longe_cilindro_od} / OE: {avaliacao.longe_cilindro_oe}</p>
                    <strong>Longe(eixo):</strong>
                    <p>OD: {avaliacao.longe_eixo_od} / OE: {avaliacao.longe_eixo_oe}</p>
                    <strong>Adição:</strong>
                    <p>{avaliacao.adicao}</p>
                    <strong>Perto (esférico):</strong>
                    <p>OD: {avaliacao.perto_esferico_od} / OE: {avaliacao.perto_esferico_oe}</p>
                    <strong>Perto (cilindro):</strong>
                    <p>OD: {avaliacao.perto_cilindro_od} / OE: {avaliacao.perto_cilindro_oe}</p>
                    <strong>Perto (eixo):</strong>
                    <p>OD: {avaliacao.perto_eixo_od} / OE: {avaliacao.perto_eixo_oe}</p>
                    <strong>AVL:</strong>
                    <p>OD: {avaliacao.avl_od} / OE: {avaliacao.avl_oe}</p>
                    <strong>Tonometria:</strong>
                    <p>OD: {avaliacao.tonometria_od} / OE: {avaliacao.tonometria_oe}</p>
                    <strong>Biomicroscopia:</strong>
                    <p>{avaliacao.biomicroscopia}</p>
                    <strong>Fundoscopia:</strong>
                    <p>{avaliacao.fundoscopia}</p>
                    <strong>Outros:</strong>
                    <p>{avaliacao.outros}</p>
                </section>
                <form>
                    <strong>Sugestão de lentes:</strong>
                    <input
                        placeholder="Visão simples"
                        value={simples}
                        onChange={e => setSimples(e.target.value)}
                    />
                    <input
                        placeholder="Multifocais"
                        value={multifocais}
                        onChange={e => setMultifocais(e.target.value)}
                    />
                    <input
                        placeholder="Bifocais"
                        value={bifocais}
                        onChange={e => setBifocais(e.target.value)}
                    />
                    <strong>Observações:</strong>
                    <input
                        placeholder="Observações"
                        value={obs}
                        onChange={e => setObs(e.target.value)}
                    />
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
                    <strong>Data:</strong>
                    <div>
                        <input
                            placeholder="Dia"
                            value={dia}
                            onChange={e => setDia(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Mês"
                            value={mes}
                            onChange={e => setMes(toNumber(e.target.value))}
                            required
                        />
                        <input
                            placeholder="Ano"
                            value={ano}
                            onChange={e => setAno(e.target.value)}
                            required
                        />
                    </div>
                    <button className="button" type="button" onClick={hide}>Gerar prescrição</button>
                    <button className="button" type="button" onClick={finalizarAvaliacao}>Finalizar avaliação</button>
                    {show && (
                        <PDFDownloadLink document={
                            <Document>
                                <Page style={styles.body}>
                                    <Image
                                        style={styles.image}
                                        src={logo}
                                    />
                                    <Text style={styles.titleTop}>Para o Sr(a):</Text>
                                    <Text style={styles.description}>{patient.nome}</Text>
                                    <Text style={styles.title}>Sugestão de lentes:</Text>
                                    <Text style={styles.description}>(     ) Visão simples: {simples}</Text>
                                    <Text style={styles.description}>(     ) Multifocais: {multifocais}</Text>
                                    <Text style={styles.description}>(     ) Bifocais: {bifocais}</Text>
                                    <Text style={styles.title}>Obs.:</Text>
                                    <Text style={styles.description}>{obs}</Text>
                                    <Text style={styles.description}>{dia} / {mes} / {ano}     ___________________________________</Text>
                                    <Text style={styles.text}>Médico</Text>
                                    <Text style={styles.titleFooter}>Prescrição de lentes corretivas</Text>
                                    <View style={styles.firsttable}>
                                        <Text style={styles.values}>Longe </Text>
                                        <Text style={styles.azul}>---------------------------------------------------------------------------------</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <Text style={styles.olhodireito}>OD</Text>
                                        <Text style={styles.values}>{longe_esferico_od}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{longe_cilindro_od}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{longe_eixo_od}</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <Text style={styles.olhoesquerdo}>OE</Text>
                                        <Text style={styles.values}>{longe_esferico_oe}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{longe_cilindro_oe}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{longe_eixo_oe}</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <Text style={styles.values}>Perto   </Text>
                                        <Text style={styles.azul}>---------------------------------------------------------------------------------</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <Text style={styles.olhodireito}>OD</Text>
                                        <Text style={styles.values}>{perto_esferico_od}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{perto_cilindro_od}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{perto_eixo_od}</Text>
                                    </View>
                                    <View style={styles.table}>
                                        <Text style={styles.olhoesquerdo}>OE</Text>
                                        <Text style={styles.values}>{perto_esferico_oe}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{perto_cilindro_oe}</Text>
                                        <Text style={styles.values}>|</Text>
                                        <Text style={styles.values}>{perto_eixo_oe}</Text>
                                    </View>
                                    <Image
                                        style={styles.footerTable}
                                        src={footerTable}
                                    />
                                    <Text style={styles.titleFooter}>Confira as lentes antes de usar</Text>
                                    <View style={styles.footer}>
                                        <Image
                                            style={styles.image}
                                            src={footer}
                                        />
                                    </View>
                                </Page>
                            </Document>
                        } fileName="prescricao.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Carregando o documento...' : <button className="button" id="downloadButton" type="button">Download prescrição</button>)}
                        </PDFDownloadLink>
                    )}
                </form>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingHorizontal: 1,
    },
    titleTop: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 100,
        marginTop: 30,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    titleFooter: {
        color: '#192F5E',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 100,
        marginTop: 30,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    titleTable: {
        color: '#192F5E',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 100,
        marginTop: 1,
        fontFamily: 'Times-Roman'
    },
    title: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 100,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    description: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 130,
        marginVertical: 10,
        fontFamily: 'Times-Roman'
    },
    date: {
        color: '#192F5E',
        marginHorizontal: 25,
        marginVertical: 150,
        fontSize: 14,
        textAlign: 'right',
        fontFamily: 'Times-Roman'
    },
    text: {
        color: '#192F5E',
        fontSize: 14,
        marginLeft: 320,
        fontFamily: 'Times-Roman'
    },
    image: {
        width: '100%'
    },
    olhodireito: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Times-Roman',
        backgroundColor: '#52658C',
        padding: 5
    },
    olhoesquerdo: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Times-Roman',
        backgroundColor: '#52658C',
        padding: 5,
        paddingRight: 6.5
    },
    azul: {
        color: '#52658C',
        fontSize: 14,
        fontFamily: 'Times-Roman',
        backgroundColor: '#52658C',
        padding: 5
    },
    firsttable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 100,
        marginTop: 50
    },
    table: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 100,
        marginTop: 1
    },
    values: {
        color: '#192F5E',
        fontSize: 14,
        fontFamily: 'Times-Roman'
    },
    footerTable: {
        marginTop: 20,
        marginHorizontal: 75,
        width: '12%',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center"
    }
});