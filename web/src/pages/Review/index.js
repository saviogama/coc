import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { DownloadAnotacao } from '../RenderAnotacao';
import { DownloadAtestado } from '../RenderAtestado';
import { DownloadPrescricao } from '../RenderPrescricao';
import './styles.css';

export default function Review() {
    const [avaliacao, setAvaliacao] = useState({});
    const [patient, setPatient] = useState([]);

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

                api.get(`patients${patientId}`, {
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

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Revisão da avaliação</h1>
                    <strong>Nome:</strong>
                    <p>{patient.nome}</p>
                    <strong>HDA:</strong>
                    <p>{avaliacao.hda}</p>
                    <strong>Refração (esférico):</strong>
                    <p>OD: {avaliacao.longe_esferico_od} / OE: {avaliacao.longe_esferico_oe}</p>
                    <strong>Refração (cilindro):</strong>
                    <p>OD: {avaliacao.longe_cilindro_od} / OE: {avaliacao.longe_cilindro_oe}</p>
                    <strong>Refração (eixo):</strong>
                    <p>OD: {avaliacao.longe_eixo_od}/ OE: {avaliacao.longe_eixo_oe}</p>
                    <strong>Adição (esférico):</strong>
                    <p>OD: {avaliacao.perto_esferico_od} / OE: {avaliacao.perto_esferico_oe}</p>
                    <strong>Adição (cilindro):</strong>
                    <p>OD: {avaliacao.perto_cilindro_od} / OE: {avaliacao.perto_cilindro_oe}</p>
                    <strong>Adição (eixo):</strong>
                    <p>OD: {avaliacao.perto_eixo_od}/ OE: {avaliacao.perto_eixo_oe}</p>
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
                <form onSubmit={finalizarAvaliacao}>
                    <DownloadAnotacao />
                    <DownloadPrescricao />
                    <DownloadAtestado />
                    <button className="button" type="submit">Finalizar avaliação</button>
                </form>
            </div>
        </div>
    )
}
