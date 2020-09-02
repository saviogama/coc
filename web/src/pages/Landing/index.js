import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Landing() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        history.push('/home');
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
                    />
                    <input
                        placeholder="Sua senha"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
            <img className="img" src={logoImg} alt="Hero" />
        </div>
    );
}
