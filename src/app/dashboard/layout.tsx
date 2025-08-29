import { Header } from './components/header';
import { OrderProvider } from '@/providers/order';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {/* só vais er utilizado o provider no dashboard */}
            {/* porque é o único que vai utilizar o modal */}
            {/* qualquer rota aqui dentro poderá utilizar o provider */}

            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    )
}   