import { createContext, useState } from "react";

//se crea el contexto
const SellTicketContext = createContext();

//se crea el proveedor de contexto (es el que agrupa el arbol de elementos)
const SellTicketProvider = ({ children }) => {
    const [keepSelecting, setKeepSelecting] = useState(true)        //Se usa para predentar las variables de categoria a
    const [summary, setSummary] = useState(false)                 // se usa para esconder el resumen antes de que exista
    const [showPacketList, setShowPacketList] = useState(false)


    const [origins, setOrigins] = useState([{}]);                   // Describe los origenes de la venta
    const [paymentMethods, setPaymentMethods] = useState([{}]);     // Tipo de pago recibido
    const [categories, setCategories] = useState([{}]);             // Categorias de producto para poderlas seleccionar  
    const [selectedCategory, setSelectedCategory] = useState('')     // Categoria de producto de la cual hacer la seleccion --clave para manejo de Combos
    const [selectedProducts, setSelectedProducts] = useState([{}])  // Son la ista corta de productos por cat y temp(si aplica)
    const [clientId, setClientId] = useState({})                    // Es el Objeto cliente al que se refiere la venta, para armar el sell ticket
    const [saleSummary, setSaleSummary] = useState([])
    const [packsToFill, setPacksToFill] = useState([])
    const [allPackets, setAllPackets] = useState([])
    //La venta fue en efectivo?
    const [finalSale, setFinalSale] = useState(0)
    const [isCash, setIsCash] = useState(false)

    const data = {
        keepSelecting, setKeepSelecting,
        origins, setOrigins,
        paymentMethods, setPaymentMethods,
        categories, setCategories,
        selectedProducts, setSelectedProducts,
        clientId, setClientId,
        selectedCategory, setSelectedCategory,
        saleSummary, setSaleSummary,
        summary, setSummary,
        packsToFill, setPacksToFill,
        allPackets, setAllPackets,
        showPacketList, setShowPacketList,
        finalSale, setFinalSale,
        isCash, setIsCash

    };

    return <SellTicketContext.Provider value={data}>{children}</SellTicketContext.Provider>
}

//se exportan el context y el provider
export { SellTicketProvider };
export default SellTicketContext;