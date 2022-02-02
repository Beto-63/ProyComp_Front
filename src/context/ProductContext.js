import React from 'react';
import AppContext from './AppContext';

const ProductContext = ({children}) => {
    const getProductByCatName = async (objProduct) => {
        let objTemp = objProduct
        console.log('objProduct Parametro: ')
        console.log(objProduct)
        const resp = await fetch('https://dokotestback.herokuapp.com/product/findByCatName', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(objTemp)
        })
        console.log('objTemp JSON: ')
        console.log(objTemp)
        console.log('resp: ')
        console.log(resp)
        return resp;
    }
    const data = { getProductByCatName };
    return <AppContext.Provider value={data}>{children}</AppContext.Provider>
    //return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
};

export default ProductContext;
