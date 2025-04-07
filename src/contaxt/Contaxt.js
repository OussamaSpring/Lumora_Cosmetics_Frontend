import { Action } from '@remix-run/router';
import {createContext, useReducer} from 'react';
export const CartContaxt=createContext();



export const Context =(props)=>
{
    const reducer=(state,Action)=>{
        switch(Action.type){
            case 'ADD':
                const tempstate=state.filter((item)=>Action.payload.id===item.id)
                if(tempstate.length>0){
                    return state
                }else{
                    return [...state,Action.payload];

                }
               

                case 'INC':
                    const tempstate1=state.map((item)=>{
                        if(item.id===Action.payload.id){
                           return {...item,quantity:item.quantity+1}
                        }else{
                            return item;
                        }
                    })
                    return tempstate1;

      
                    case 'DEC':
                        const tempstate2=state.map((item)=>{
                            if(item.id===Action.payload.id){
                               return {...item,quantity:item.quantity-1}
                            }else{
                                return item;
                            }
                        })

                    return tempstate2;

                    case 'REMOVE':
                        const tempstate3=state.filter((item)=>
                            item.id!==Action.payload.id
                        )
                        return tempstate3;
                            
                    


            default:
                return state;
        }
    }
    const [state,dispatch]=useReducer(reducer,[]);

    const info={state,dispatch};

    return <CartContaxt.Provider value={info}>{props.children}</CartContaxt.Provider>
}