import React from 'react'
import { useDispatch } from 'react-redux'
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/solid'
import { setAddItemToCart, setOpenCart } from '../../app/CartSlice';

const Item = ({ ifExists, id, color, shadow, title, text, img, btn, rating, price }) => {
    // console.log(id);
    const dispatch = useDispatch();

    const onAddToCart = () => {
        const item = { id, title, text, img, color, shadow, price };

        dispatch(setAddItemToCart(item));
    };
    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }))
    }

    return (
        <>
            <div className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center ${ifExists ? 'justify-items-start' : 'justify-items-center'} rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}>
                <div className={`grid items-center ${ifExists ? "justify-items-start" : "justify-items-center"} text-slate-200 filter drop-shadow`}>
                    <h3 className='text-xl lg:text-lg md:text-base font-medium'>{title}</h3>
                    <p className='text-base md:text-sm font-normal'>{text}</p>

                    <div className='flex items-center justify-between w-28 my-2'>

                        <div className='flex items-center px-1 rounded bg-white/80 blur-effect-theme'>
                            <h3 className='text-black text-sm font-medium'>${price}</h3>
                        </div>

                        <div className='flex items-center gap-1'>
                            <StarIcon className='icon-style w-5 h-5 md:w-4 md:h-4' />
                            <h3 className='md:text-sm font-normal text-slate-100'>{rating}</h3>
                        </div>

                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            type='button'
                            className='bg-white/90 blur-effect-theme p-0.5 shadow shadow-sky-200'
                            onClick={()=> onAddToCart()} >
                            
                            <ShoppingBagIcon className='icon-style text-slate-900' />
                        </button>
                        <button
                            type='button'
                            onClick={()=> {onAddToCart(); onCartToggle();}}
                            className='bg-white/90 blur-effect-theme px-2 shadow shadow-sky-200 text-sm text-black py-1'>
                            {btn}
                        </button>
                    </div>

                </div>

                <div className={`flex items-center ${ifExists ? 'absolute top-5 right-1' : 'justify-center'}`}>
                    <img src={img} alt={`image/itemImage/${id}`}
                        className={`transitions-theme hover:-rotate-12 ${ifExists ? 'h-auto w-64 lg:w-56 md:w-48 sm:w-34 -rotate-[35deg]' : 'h-36 w-64'}`} />
                </div>
            </div>
        </>
    )
}

export default Item