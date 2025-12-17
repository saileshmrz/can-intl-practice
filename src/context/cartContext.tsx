import { Action, cartReducer, State } from "@/reducer/cartReducer";
import { createContext, useContext, useReducer } from "react";


type CartContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] } as State);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};