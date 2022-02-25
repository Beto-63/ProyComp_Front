import React, { createContext, useState } from 'react'



const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    //estados, effectos, funciones

    const [productsArray, setProductsArray] = useState([])
    const [name, setName] = useState('')
    const [showSummaryCombo, setShowSummaryCombo] = useState(false)


    const data = {
        name, setName,
        showSummaryCombo, setShowSummaryCombo,
        productsArray, setProductsArray
    }

    return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>

}

export { ProductProvider }
export default ProductContext