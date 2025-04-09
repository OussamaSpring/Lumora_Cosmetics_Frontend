import { createContext, useReducer } from 'react';
export const CartContaxt = createContext();

export const Context = (props) => {
    const reducer = (state, Action) => {
        switch(Action.type) {
            case 'ADD':
                // Check if item already exists
                const existingItem = state.find(item => Action.payload.id === item.id);
                
                if(existingItem) {
                    // If item exists, increment its quantity
                    return state.map(item => 
                        item.id === Action.payload.id
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    );
                } else {
                    // If item doesn't exist, add it with quantity 1
                    return [...state, {...Action.payload, quantity: 1}];
                }
                
            case 'INC':
                return state.map(item => {
                    if(item.id === Action.payload.id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                });

            case 'DEC':
                return state.map(item => {
                    if(item.id === Action.payload.id) {
                        // Prevent quantity from going below 1
                        return {...item, quantity: Math.max(1, item.quantity - 1)}
                    } else {
                        return item;
                    }
                });

            case 'REMOVE':
                return state.filter(item => item.id !== Action.payload.id);
                
            default:
                return state;
        }
    }
    
    const [state, dispatch] = useReducer(reducer, []);
    const info = {state, dispatch};
    
    return <CartContaxt.Provider value={info}>{props.children}</CartContaxt.Provider>
}