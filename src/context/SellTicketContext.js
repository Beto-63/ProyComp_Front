import { createContext, useState } from "react";

//se crea el contexto
const SellTicketContext = createContext();

//se crea el proveedor de contexto (es el que agrupa el arbol de elementos)
const SellTicketProvider = ({ children }) => {
    const [origins, setOrigins] = useState([{}]);
    const [paymentMethods, setPaymentMethods] = useState([{}]);
    const [categories, setCategories] = useState([{}]);
    const [selectedProducts, setSelectedProducts] = useState([{}])
    const [clientId, setClientId] = useState({})

    const data = {
        //handleClientRegister, //getProductByCatName,
        origins, setOrigins,
        paymentMethods, setPaymentMethods,
        categories, setCategories,
        selectedProducts, setSelectedProducts,
        clientId, setClientId
    };

    return <SellTicketContext.Provider value={data}>{children}</SellTicketContext.Provider>
}

//se exportan el context y el provider
export { SellTicketProvider };
export default SellTicketContext;