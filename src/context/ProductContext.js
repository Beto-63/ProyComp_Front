import React, { createContext, useState } from 'react'



const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    //estados, effectos, funciones

    const [productsArray, setProductsArray] = useState([])
    const [name, setName] = useState('')



    const data = {
        name, setName,

        productsArray, setProductsArray
    }

    return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>

}

export { ProductProvider }
export default ProductContext