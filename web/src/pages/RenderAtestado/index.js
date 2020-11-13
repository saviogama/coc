import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';
import './styles.css';

export default function RenderAtestado() {
    const [avaliacao, setAvaliacao] = useState({});
    const [patient, setPatient] = useState([]);
    const [dias, setDias] = useState('');
    const [motivo, setMotivo] = useState('');
    const [quando, setQuando] = useState('');
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [show, setHide] = useState(false);

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

    async function goToPrescricao(e) {
        e.preventDefault();
        history.push(`/prescricao/${id}`);
    }

    function hide() {
        setHide(true);
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Gerar atestado</h1>
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
                    <strong>Dias de licença:</strong>
                    <input
                        placeholder="Dias"
                        value={dias}
                        onChange={e => setDias(e.target.value)}
                    />
                    <strong>Motivo:</strong>
                    <input
                        placeholder="Motivo"
                        value={motivo}
                        onChange={e => setMotivo(e.target.value)}
                    />
                    <strong>A partir de:</strong>
                    <input
                        placeholder="Dia"
                        value={quando}
                        onChange={e => setQuando(e.target.value)}
                    />
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
                            onChange={e => setMes(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Ano"
                            value={ano}
                            onChange={e => setAno(e.target.value)}
                            required
                        />
                    </div>
                    <button className="button" type="button" onClick={hide}>Gerar atestado</button>
                    <button className="button" type="button" onClick={(e) => { goToPrescricao(e) }}>Continuar</button>
                    {show && (
                        <PDFDownloadLink document={
                            <Document>
                                <Page style={styles.body}>
                                    <Image
                                        style={styles.image}
                                        src={logo}
                                    />
                                    <Text style={styles.title}>ATESTADO MÉDICO</Text>
                                    <Text style={styles.description}>Atesto, para os devidos fins, que o(a) Sr(a) {patient.nome} necessita de {dias} dias de licença, por motivo de {motivo}, a partir de {quando}.</Text>
                                    <Text style={styles.date}>Cachoeirinha-PE, {dia} de {mes} de {ano}</Text>
                                    <View style={styles.footer}>
                                        <View style={styles.footerText}>
                                            <Text style={styles.text}>_________________________________________</Text>
                                            <Text style={styles.text}>Médico</Text>
                                        </View>
                                        <Image
                                            style={styles.image}
                                            src={footer}
                                        />
                                    </View>
                                </Page>
                            </Document>
                        } fileName="atestado.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Carregando o documento...' : <button className="button" id="downloadButton" type="button">Download atestado</button>)}
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
    title: {
        color: '#192F5E',
        marginVertical: 100,
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    description: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 50,
        marginVertical: 20,
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
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    image: {
        width: '100%'
    },
    footerText: {
        marginBottom: 35
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center"
    }
});
