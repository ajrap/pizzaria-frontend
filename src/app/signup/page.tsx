
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.scss';
import logoImg from '/public/logo.svg';
import { api } from '@/services/api'; // Importing the API service, though not used in this snippet
import { redirect } from 'next/navigation'; // Importing for potential navigation features, not used in this snippet

export default function Signup() {

    async function handleRegister(formData: FormData) {
        "use server";

        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password)

        //if (name === "" || email === "" || password === "") {
        if (!name || !email || !password) {
            console.log('All fields are required');
            return;
        }

        try {
            await api.post('/users', {
                name,
                email,
                password
            });
            console.log('User registered successfully');
            // Optionally, redirect to login page or show a success message
        } catch (error) {
            console.error('Error during registration:', error);
        }

        redirect('/'); // Redirect to the home page after registration
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt="Logo da pizzaria"
                />

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input
                            type="text"
                            required
                            name="name"
                            placeholder="Digite seu nome..."
                            className={styles.input}
                        />
                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="Digite seu email..."
                            className={styles.input}
                        />

                        <input
                            type="password"
                            required
                            name="password"
                            placeholder="***********"
                            className={styles.input}
                        />

                        <button type="submit" className={styles.button}>
                            Cadastrar
                        </button>
                    </form>

                    <Link href="/" className={styles.text}>
                        Já possui uma conta? Faça login
                    </Link>

                </section>

            </div>
        </>
    )
}