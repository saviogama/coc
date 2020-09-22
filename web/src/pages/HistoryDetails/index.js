import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';
import './styles.css';

export default function HistoryDetails() {
    const [patient, setPatient] = useState({});
    const [consulta, setConsulta] = useState({});
    const [avaliacao, setAvaliacao] = useState({});
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
    }, [setAvaliacao]);

    useEffect(() => {
        (async () => {
            await api.get(`appointments/${id}`, {
                headers: {
                    Authorization: token,
                }
            }).then(response => {
                setConsulta(response.data);
                
                api.get(`patients/${response.data.patient_id}`, {
                    headers: {
                        Authorization: token,
                    }
                }).then(response => {
                    setPatient(response.data);
                });
            });
        })();
    }, [setConsulta]);

    function goBack(e) {
        e.preventDefault();
        history.push('/user');
    }

    function hide() {
        setHide(true);
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Consulta do dia:</h1>
                    <h2>{consulta.created_at}</h2>
                    <strong>Nome:</strong>
                    <p>{patient.nome}</p>
                    <strong>OP/HDA:</strong>
                    <p>{avaliacao.hda}</p>
                    <strong>Refração (esférico):</strong>
                    <p>OD: {avaliacao.longe_esferico_od} / OE: {avaliacao.longe_esferico_oe}</p>
                    <strong>Refração (cilindro):</strong>
                    <p>OD: {avaliacao.longe_cilindro_od} / OE: {avaliacao.longe_cilindro_oe}</p>
                    <strong>Refração (eixo):</strong>
                    <p>OD: {avaliacao.longe_eixo_od} / OE: {avaliacao.longe_eixo_oe}</p>
                    <strong>Adição (esférico):</strong>
                    <p>OD: {avaliacao.perto_esferico_od} / OE: {avaliacao.perto_esferico_oe}</p>
                    <strong>Adição (cilindro):</strong>
                    <p>OD: {avaliacao.perto_cilindro_od} / OE: {avaliacao.perto_cilindro_oe}</p>
                    <strong>Adição (eixo):</strong>
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
                    <button className="button" type="button" onClick={hide}>Gerar PDF</button>
                    <button className="button" type="button" onClick={(e) => { goBack(e) }}>Voltar</button>
                    {show && (
                        <PDFDownloadLink document={
                            <Document>
                                <Page style={styles.body}>
                                    <Image
                                        style={styles.image}
                                        src={logo}
                                    />
                                    <Text style={styles.nome}>
                                        {patient.nome}
                                    </Text>
                                    <Text style={styles.text}>
                                        OP/HDA: {avaliacao.hda}
                                    </Text>
                                    <Text style={styles.text}>
                                        Refração (esférico):
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.longe_esferico_od} / OE: {avaliacao.longe_esferico_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Refração (cilindro):
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.longe_cilindro_od} / OE: {avaliacao.longe_cilindro_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Refração (eixo):
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.longe_eixo_od} / OE: {avaliacao.longe_eixo_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Adição (esférico):
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.perto_esferico_od} / OE: {avaliacao.perto_esferico_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Adição (cilindro):
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.perto_esferico_od} / OE: {avaliacao.perto_esferico_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Adição (eixo):
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.longe_perto_od} / OE: {avaliacao.longe_perto_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        AVL:
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.avl_od} / OE: {avaliacao.avl_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Tonometria:
                                    </Text>
                                    <Text style={styles.description}>
                                        OD: {avaliacao.tonometria_od} / OE: {avaliacao.tonometria_oe}
                                    </Text>
                                    <Text style={styles.text}>
                                        Biomicroscopia: {avaliacao.biomicroscopia}
                                    </Text>
                                    <Text style={styles.text}>
                                        Fundoscopia: {avaliacao.fundoscopia}
                                    </Text>
                                    <Text style={styles.text}>
                                        Outros: {avaliacao.outros}
                                    </Text>
                                    <View style={styles.footer}>
                                        <Image
                                            style={styles.image}
                                            src={footer}
                                        />
                                    </View>
                                </Page>
                            </Document>
                        } fileName="historico.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Carregando o documento...' : <button className="button" id="downloadButton" type="button">Download histórico</button>)}
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
    nome: {
        color: '#192F5E',
        fontSize: 16,
        marginVertical: 15,
        marginHorizontal: 50,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    text: {
        color: '#192F5E',
        fontSize: 14,
        marginVertical: 10,
        marginHorizontal: 100,
        fontFamily: 'Times-Roman'
    },
    description: {
        color: '#192F5E',
        fontSize: 14,
        marginVertical: 5,
        marginHorizontal: 120,
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
