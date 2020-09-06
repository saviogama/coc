import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/context';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const { setToken, setType } = useContext(StoreContext);
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            id,
            password
        };

        try {
            const response = await api.post('login', data);
            if (response.data) {
                setToken(response.data.id);
                setType(response.data.type);
                if (response.data.type === 1) {
                    history.push("/home");
                } else {
                    history.push("/user");
                }
            }
        } catch (err) {
            alert("Id ou senha inválidos");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
            <img className="img" src={logoImg} alt="COC" />
        </div>
    );
}
