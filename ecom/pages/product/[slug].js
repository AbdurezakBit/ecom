import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import data from '../../utils/data';
import { Store } from '../../utils/Store';

function ProductScreen() {
    const {state, dispatch} = useContext(Store)

    const router = useRouter();
    const{query} = useRouter();
    
    const{slug} = query;
    const product = data.products.find(x =>x.slug === slug)
    if(!product){
        return <div>product not found</div>
    }
    const addToCart = () =>{
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})

        if(product.countInStock < quantity){
            alert('sorry, product is out of stock')
        }
       
        router.push('/cart')
    }
  return (
   <Layout title={product.name}>
    <div className='py-2'>
        <Link href= '/'>back to products </Link>
    </div>
    <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
            <Image src={product.image} alt={product.name}
                   width = {640}
                   height={640}
                   layout = "responsive"
            ></Image>
        </div>
        <div>
            <ul>
                <li>
                    <h1 className='text-lg'>{product.name}</h1>
                </li>
                <li >Category: {product.category}</li>
                <li > Brand: {product.brand}</li>
                <li>{product.rating} of{product.numReviews} reviews</li>
                <li>Description: {product.description}</li>
            </ul>
        </div>
        <div className='card p-5'>
            <div className='mb-2 flex justify-between'>
                <div className=''>Price</div>
                <div>${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>{product.countInStock>0 ? 'In Stock' : 'unavailable '}</div>
            </div>
            <button className='primary-button w-full' onClick={addToCart}>Add to cart</button>
        </div>
    </div>
   </Layout>
  )
}

export default ProductScreen