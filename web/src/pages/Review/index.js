import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
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

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#52658c" />
                        Voltar
                    </Link>
                    <h1>Revisão da avaliação</h1>
                    <strong>Nome:</strong>
                    <p>Teste</p>
                    <strong>CPF:</strong>
                    <p>111.111.111.19</p>
                    <strong>HDA:</strong>
                    <p>123</p>
                    <strong>Tonometria:</strong>
                    <p>OE: 123 / OD: 123</p>
                    <strong>Inspeção:</strong>
                    <p>123</p>
                    <strong>PPC:</strong>
                    <p>123</p>
                    <strong>Refração (esférico):</strong>
                    <p>OE: 123 / OD: 123</p>
                    <strong>Refração (cilindro):</strong>
                    <p>OE: 123 / OD: 123</p>
                    <strong>Refração (eixo):</strong>
                    <p>OE: 123 / OD: 123</p>
                    <strong>Refração (adição):</strong>
                    <p>OE: 123 / OD: 123</p>
                    <strong>Biomicroscopia:</strong>
                    <p>123</p>
                    <strong>Fundoscopia:</strong>
                    <p>123</p>
                    <strong>AVL:</strong>
                    <p>OE: 123 / OD: 123</p>
                </section>
                <form>
                    <button className="button">Gerar atestado médico</button>
                    <button className="button">Gerar prescrição de lentes de correção</button>
                    <button className="button">Gerar folha de anotações</button>
                    <button className="button" type="submit">Finalizar avaliação</button>
                </form>
            </div>
        </div>
    )
}
