import styles from './page.module.scss'
import logoImg from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'; // Importing the API service, though not used in this snippet
import { redirect } from 'next/navigation'; // Importing redirect, though not used in this snippet
import { cookies } from 'next/headers'; // Importing headers, though not used in this snippet


export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server";


    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      console.log('All fields are required');
      return;
    }

    try {
      // Simulate an API call for login
      console.log('Email:', email);
      console.log('Password:', password);
      // Here you would typically call your API to authenticate the user  

      const response = await api.post('/session', {
        email,
        password

      })
      console.log('Login successful: ', response.data);

      // Assuming the response contains a token
      if (!response.data.token) {
        console.log('Login failed: No token received');
        return;
      }

      console.log(response.data);

      const expressTime = 60 * 60 * 24 * 30 * 1000; // 1 day in seconds
      const cookieStore = await cookies();


      cookieStore.set('session', response.data.token, {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      });

    } catch (error) {

      console.log('Error during login: ', error);
      return;
    }

    // Redirect to the home page after successful login
    redirect('/dashboard');
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da pizzaria"
        />

        <section className={styles.login}>
          <form action={handleLogin}>
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
              Acessar
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>

        </section>

      </div>
    </>
  )
}