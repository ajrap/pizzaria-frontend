// Tranforma em user client para consumir o contexto 
'use client';

import { use } from 'react'
import styles from './styles.module.scss';
import { RefreshCw } from 'lucide-react';
import { OrderProps } from '@/lib/order.type';
import { ModalOrder } from '@/app/dashboard/components/modal';
import { OrderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


interface Props {
    orders: OrderProps[]
}

export function Orders({ orders }: Props) {
    const { isOpen, onRequestOpen } = use(OrderContext)
    const router = useRouter();

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id);
        console.log(order_id);
        //console.log('Detalhes do pedido');
        // Aqui você pode adicionar a lógica para exibir os detalhes do pedido
        // Por exemplo, abrir um modal com as informações do pedido selecionado
    }

    function handleRefresh() {
        // Aqui você pode adicionar a lógica para atualizar a lista de pedidos
        console.log('Atualizando pedidos...');
    
        router.refresh();
        // Por exemplo, você pode chamar uma função que busca os pedidos mais recentes
        toast.success("Pedidos atualizados com sucesso!");
    }

    return (
        <>
            <main className={styles.container}>

                <section className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>

                    <button onClick={handleRefresh}>
                        <RefreshCw size={24} color='#3fffa3' />
                    </button>
                </section>



                <section className={styles.listOrders}>

                    {orders.length === 0 && (
                        <span className={styles.emptyItem}>
                            <strong>Nenhum pedido encontrado</strong>
                        </span>

                    )}

                    {orders.map(order => (
                            <button
                                key={order.id}
                                className={styles.orderItem}
                                onClick={() => handleDetailOrder(order.id)}  // Chama a função para abrir o modal com o ID do pedido
                            >
                                <div className={styles.tag}></div>
                                <span>Mesa {order.table}</span>
                            </button>

                        ))}


                </section>


            </main>


            {/* se estiver setado como true o isOpen, executar o modal order (da mesma forma que for if isOpen then ModalOrder*/}
            {isOpen && <ModalOrder />}
        </>
    )



}