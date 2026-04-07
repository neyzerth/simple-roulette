import { createContext, useContext, useState } from 'react';

interface ItemsContextType {
    items: string[];
    setItems: (items: string[]) => void;
};

export const ItemsContext = createContext<ItemsContextType>({
    items: [],
    setItems: () => { },
});

export const useItems = () => useContext(ItemsContext);

export const ItemsProvider = ({ children, initialItems = [] }: { children: React.ReactNode; initialItems?: string[] }) => {
    const [items, setItems] = useState<string[]>(initialItems);

    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    );
};
