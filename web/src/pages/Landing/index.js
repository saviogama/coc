import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/olho_log.svg';
import heroImg from '../../assets/landing.svg';

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
                <img className="logo" src={logoImg} alt="COC" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
            <img className="img" src={heroImg} alt="Hero" />
        </div>
    );
}
