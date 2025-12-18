export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: any;
    options?: Record<string, any>;
};

export type State = {
    items: CartItem[];
};

export type Action =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: { id: string } }
    | { type: "UPDATE_CART"; payload: { id: string; quantity: number } };

export const cartReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
                };
                return { items: updatedItems };
            } else {
                return { items: [...state.items, action.payload] };
            }
        }

        case "REMOVE_FROM_CART":
            return {
                items: state.items.filter(item => item.id !== action.payload.id)
            };

        case "UPDATE_CART":
            return {
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        default:
            return state;
    }
};
