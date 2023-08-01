import { createContext, useState, useEffect } from "react";


export const CardDataContext = createContext()

export const CardDataProvider = ({ children }) => {
    const [card_data, setCard_data] = useState([])

    useEffect(() => {

        const storedArrayAsString = sessionStorage.getItem('card_data');

        const storedArray = JSON.parse(storedArrayAsString);


        if (storedArray == null) {
            sessionStorage.setItem('card_data', JSON.stringify([]));
            setCard_data([])
        } else {
            setCard_data(storedArray)
        }

    }, [])

    const handleAddCard = (card) => {
        setCard_data((prev) => [...prev,card])
    }



    useEffect(() => {
        sessionStorage.setItem('card_data', JSON.stringify(card_data));
    }, [card_data])
    
    return (
        <CardDataContext.Provider value={{ card_data, handleAddCard }}>
            {children}
        </CardDataContext.Provider>
    )
}
