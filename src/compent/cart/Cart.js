import React, { useContext } from 'react'
import { CartContaxt } from '../../contaxt/Contaxt';
import './cart.css'
const Cart=()=>
{
    const Globalstate=useContext(CartContaxt);
    const state =Globalstate.state;
    const dispatch=Globalstate.dispatch;
    const total=state.reduce((total,item)=>{
        return(total+item.price*item.quantity)
    },0)


    return <div className='cart'>
        {state.map((item,index)=>
        {
            return <div className='card' key={index}>
                <img src={item.image}/>
                <p>{item.title}</p>
                
                <p>{item.quantity*item.price}</p>



                <div className='quantity'>
                    <button onClick={()=>dispatch({type:'INC',payload:item})}>+</button>
                    <p>{item.quantity}</p>
                    <button onClick={()=>{
                        if(item.quantity>1){
                            dispatch({type:'DEC',payload:item})
                        }else{
                            dispatch({type:'REMOVE',payload:item})
                        }
                    }}>-</button>

                </div>

                <h2 onClick={()=>dispatch({type:'REMOVE',payload:item})}>!!</h2>




            </div>


        })}
        {state.length>0&& <div className='total'>
            <h2>{total}</h2>
            </div>}

    </div>

}
export default Cart;