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
            await api.get(`avaliacao/${id}`, {
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
                    <strong>CPF:</strong>
                    <p>{patient.cpf}</p>
                    <strong>HDA:</strong>
                    <p>{avaliacao.hda}</p>
                    <strong>Tonometria:</strong>
                    <p>OE: {avaliacao.tonometria_olho_esquerdo} / OD: {avaliacao.tonometria_olho_direito}</p>
                    <strong>Inspeção:</strong>
                    <p>{avaliacao.inspecao}</p>
                    <strong>PPC:</strong>
                    <p>{avaliacao.inspecao_ppc}</p>
                    <strong>Refração (esférico):</strong>
                    <p>OE: {avaliacao.refracao_olho_esquerdo_esferico} / OD: {avaliacao.refracao_olho_direito_esferico}</p>
                    <strong>Refração (cilindro):</strong>
                    <p>OE: {avaliacao.refracao_olho_esquerdo_cilindro} / OD: {avaliacao.refracao_olho_direito_cilindro}</p>
                    <strong>Refração (eixo):</strong>
                    <p>OE: {avaliacao.refracao_olho_esquerdo_eixo}/ OD: {avaliacao.refracao_olho_direito_eixo}</p>
                    <strong>Refração (adição):</strong>
                    <p>OE: {avaliacao.refracao_olho_esquerdo_adicao} / OD: {avaliacao.refracao_olho_direito_adicao}</p>
                    <strong>Refração (dp):</strong>
                    <p>{avaliacao.dp}</p>
                    <strong>Biomicroscopia:</strong>
                    <p>{avaliacao.biomicroscopia}</p>
                    <strong>Fundoscopia:</strong>
                    <p>{avaliacao.fungoscopia}</p>
                    <strong>AVL:</strong>
                    <p>OE: {avaliacao.avl_olho_esquerdo} / OD: {avaliacao.avl_olho_direito}</p>
                </section>
                <form onSubmit={finalizarAvaliacao}>
                    <DownloadAnotacao />
                    <DownloadPrescricao />
                    <DownloadAtestado name={patient.nome}/>
                    <button className="button" type="submit">Finalizar avaliação</button>
                </form>
            </div>
        </div>
    )
}
