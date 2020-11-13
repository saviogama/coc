import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';
import './styles.css';

export default function Review() {
    const [avaliacao, setAvaliacao] = useState({});
    const [patient, setPatient] = useState([]);
    const [anotacoes, setAnotacoes] = useState('');
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

    async function goToAtestado(e) {
        e.preventDefault();
        history.push(`/atestado/${id}`);
    }

    function hide() {
        setHide(true);
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Revisão da avaliação</h1>
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
                    <textarea
                        placeholder="Anotação"
                        value={anotacoes}
                        onChange={e => setAnotacoes(e.target.value)}
                    />
                    <button className="button" type="button" onClick={hide}>Gerar Anotação</button>
                    <button className="button" type="button" onClick={(e) => { goToAtestado(e) }}>Continuar</button>
                    {show && (
                        <PDFDownloadLink document={
                            <Document>
                                <Page style={styles.body}>
                                    <Image
                                        style={styles.image}
                                        src={logo}
                                    />
                                    <Text style={styles.description}>{anotacoes}</Text>
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
                        } fileName="anotacao.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Carregando o documento...' : <button className="button" id="downloadButton" type="button">Download anotação</button>)}
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
    description: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 130,
        marginVertical: 50,
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