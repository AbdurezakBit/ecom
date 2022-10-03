import React, { useContext } from 'react'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

function cart() {
    const {state, dispatch} = useContext(Store)
    const router = useRouter();
    const {cart: {cartItems},} = state
    const removeItem = (item)=>{
     dispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }

    const updateCart = (item, qty) => {
        const quantity = Number(qty)
        dispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}})
    }

  return (
<Layout title = 'Shopping cart'>
    <h1 className='mb-4 text-xl'>Shopping Cart</h1>
    {
        cartItems.length === 0 ?
        (<div>Cart is empity <Link href = '/'>Go to Shopping</Link></div>):
         (
            <div className='grid md:grid-cols-4 md:gap-5'>
                <div className=' overflow-x-auto md:col-span-3'>
                    <table className='min-w-full'>
                        <thead className='border-b'>
                            <tr>
                                <th className='px-5 text-left'>Item</th>
                                <th className='px-5 text-left'>Quantity</th>
                                <th className='px-5 text-left'>Price</th>
                                <th className='px-5 '>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item)=>(
                                <tr key={item.slug} className="border-b">
                                    <td>
                                        <Link href={`/product/${item.slug}`}>
                                            <a className='flex items-center'>
                                                <Image src={item.image}
                                                       alt={item.name}
                                                       width={50}
                                                       height = {50}
                                                    ></Image>
                                                    &nbsp;
                                                    {item.name}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className='p-5 '>
                                        <select value={item.quantity} onChange={(e)=>updateCart(item, e.target.value)}>
                                        {[...Array(item.countInStock).keys()].map((x)=>(
                                            <option key={x + 1} value = {x + 1}>{x+1}</option>
                                        ))}
                                        </select>
                                    </td>
                                    <td className='p-5 '>${item.price}</td>
                                    <td className='p-5 text-center'>
                                        <button onClick={()=>removeItem(item)}>
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                         </svg>
                                            
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='card p-5'>
                    <ul>
                        <li>
                            <div className='pb-3 text-xl'>
                                Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}): $
                                {cartItems.reduce((a,c) => a + c.quantity * c.price,0)}

                            </div>
                        </li>
                        <li >
                            <button onClick={()=>router.push('login?redirect=/shopping')} className='primary-button w-full'>Check Out</button>
                        </li>
                    </ul>
                </div>
            </div>
         )
    }
</Layout>  )
}

export default dynamic(() => Promise.resolve(cart),{ssr:false})