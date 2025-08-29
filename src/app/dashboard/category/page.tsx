
import styles from './styles.module.scss'
import { Button } from '@/app/dashboard/components/button';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { redirect } from 'next/navigation';


export default function Category() {

    async function handleRegisterCategory(formData: FormData) {
        "use server"

        const name = formData.get('name')?.valueOf();
        if (typeof name !== 'string') { 
            throw new Error('Nome da categoria é obrigatório');
        }

        if (name === "") {
            throw new Error('Nome da categoria é obrigatório');
            return;
        }

        const data = {
            name: name
        }

        const token = await getCookieServer();

        await api.post('/category', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((err) => {
                console.log(err);
                return;//encerra após o error, para não continuar o fluxo
            });

            redirect('/dashboard');

    }


    return (
        <main className={styles.container}>
            <h1>Nova Categoria</h1>
            <form className={styles.form}
                action={handleRegisterCategory}
            >

                <input
                    type='text'
                    name='name'
                    placeholder='Nome da categoria, ex: Pizzas'
                    required
                    className={styles.input}
                />

                <Button name='Cadastrar' />

            </form>


        </main>
    );
}   