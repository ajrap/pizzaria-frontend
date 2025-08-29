"use client"

import Link from 'next/link';
import styles from './styles.module.scss';
import logoImg from '/public/logo.svg';
import Image from 'next/image';
import { LogOutIcon } from 'lucide-react'; // Importing lucide-react icons
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Header() {

    const router = useRouter();

    async function handleLogout() {

        deleteCookie('session', { path: "/" }); // Deleting the token cookie to log out the user
        toast.success("Usuário deslogado com sucesso!"); // Displaying a success message
        router.replace("/"); // Redirecting to the login page 
    }


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        alt="Logo do sistema de pedidos"
                        src={logoImg}
                        width={190}
                        height={60}
                        priority={true} //prioridade para carregar a imagem
                        quality={100}
                    />
                </Link>

                {/* A tag "<nav>" é o Local de navegação do cabeçalho - local onde ficam os links */}
                <nav>
                    <Link href="/dashboard/category">Categoria</Link>
                    <Link href="/dashboard/product">Produto</Link>


                    <form action={handleLogout}>
                        <button type="submit" className={styles.button}>
                            <LogOutIcon size={24} color='#FFF' />
                        </button>
                    </form>

                </nav>

            </div>




        </header>
    )
}