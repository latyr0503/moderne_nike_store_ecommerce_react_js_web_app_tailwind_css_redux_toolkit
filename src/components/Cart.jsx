import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartCount from "./Cart/CartCount"
import CartEmpty from "./Cart/CartEmpty"
import CartItem from "./Cart/CartItem"
import {
    selectCartItems,
    selectCartState,
    selectTotalAmount,
    selectTotalQTY,
    setClearCarItems,
    setCloseCart,
    setGetTotals
} from '../app/CartSlice';


const Cart = () => {

    const dispatch = useDispatch();
    const ifCartState = useSelector(selectCartState);
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectTotalAmount);
    const totalQTY = useSelector(selectTotalQTY);

    // console.log(cartItems);

    useEffect(() => {
        dispatch(setGetTotals)
    }, [cartItems, dispatch])

    const onCartToggle = () => {
        dispatch(
            setCloseCart({
                cartState: false
            })
        );
    };

    const onClearCartItems = () => {
        dispatch(setClearCarItems())
    }



    return (
        <>
            <div className={`fixed top left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[250]
                ${ifCartState ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-8'}`}>
                <div className={`blur-effect-theme h-screen max-w-xl w-full absolute right-0`}>
                    <CartCount totalQTY={totalQTY} onCartToggle={onCartToggle} onClearCartItems={onClearCartItems} />
                    {cartItems?.length === 0 ?
                        <CartEmpty onCartToggle={onCartToggle} /> :
                        <div>
                            <div className='flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[80vh] scroll-smooth scroll-hidden py-3'>
                                {cartItems?.map((item, i) => (
                                    <CartItem key={i} item={item} />
                                ))}
                            </div>

                            <div className='fixed bottom-0 bg-white w-full px-5 py-2 grid items-center'>
                                <div className='flex items-center justify-between'>
                                    <h2 className='text-base font-semibold uppercase'>SubTotal</h2>
                                    <h3 className='text-sm rounded bg-theme-cart text-slate-100 px-1.5 py-0.5'>
                                        ${totalAmount}
                                    </h3>
                                </div>
                                <div className='grid items-center gap-2'>
                                    <p className='text-sm font-medium text-center capitalize'>
                                        Taxes and Shippink Will Calculate at Shipping
                                    </p>
                                    <button type='button'
                                        className='button-theme bg-theme-cart text-white'> Check Out
                                    </button>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Cart