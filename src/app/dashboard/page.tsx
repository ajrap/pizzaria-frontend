import { Orders } from "./components/orders";
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'
import { OrderProps } from '@/lib/order.type'

async function getOrders(): Promise<OrderProps[] | []> {

    try {

        const token = await getCookieServer();

        const response = await api.get('./orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }

        })

        return response.data || [];

    } catch (error) {
        console.log(error);
        return [];


    }
}


export default async function Dashboard() {

    const orders = await getOrders();
    //console.log(orders);
    // Note: Since getOrders is an async function, you might want to handle the promise properly in a real application.
    return (
        <>
            <Orders orders={orders}/>
        </>
    )
}