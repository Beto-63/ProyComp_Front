import { server } from './Api'

var ubicaciones = [{}];
const GetUbicaciones = async () => {
    const response = await fetch(`${server}/stock/channels`);
    const data = await response.json();
    ubicaciones = data;
    return (data);
};

var categories = [{}];
const GetCategories = async () => {
    const response = await fetch(`${server}/product/categories`);
    const data = await response.json();
    categories = data;

    return (data);
};

var stockItemByCategory = [{}];
const GetStockItemsByCategory = async (objCat) => {
    const response = await fetch(`${server}/stock/findByCatName`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objCat)
    });
    const data = await response.json();
    console.log("prod by category", data)
    stockItemByCategory = data;
    return (data);
};

var prodByCategory = [{}];
const GetProdByCategory = async (objCat) => {
    const response = await fetch(`${server}/product/selectCat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objCat)
    });
    const data = await response.json();
    console.log("prod by category", data)
    prodByCategory = data;
    return (data);
};


const NewStockItem = async (objStockItem) => {
    const resp = await fetch(`${server}/stock`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        //enviamos los datos por body y se debe convertir el objeto en JSON
        body: JSON.stringify(objStockItem)
    });
    return resp;
}

const AddQuantityToStock = async (objStockItem) => {
    const resp = await fetch(`${server}/stock/addQty`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        //enviamos los datos por body y se debe convertir el objeto en JSON
        body: JSON.stringify(objStockItem)
    });
    return resp;
}

const StockTransfer = async (objStockItem) => {
    const resp = await fetch(`${server}/stock/transfer`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        //enviamos los datos por body y se debe convertir el objeto en JSON
        body: JSON.stringify(objStockItem)
    });
    return resp;
}



const GetStockItemByNameAndLocation = async (objStockItem) => {
    const resp = await fetch(`${server}/stock/findByNameChannel`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        //enviamos los datos por body y se debe convertir el objeto en JSON
        body: JSON.stringify(objStockItem)
    });
    return resp;
}

export {
    // General
    GetUbicaciones,
    ubicaciones,
    GetCategories,
    categories,

    //Stock
    GetProdByCategory,
    prodByCategory,
    GetStockItemsByCategory,
    stockItemByCategory,
    NewStockItem,
    StockTransfer,

    GetStockItemByNameAndLocation,
    AddQuantityToStock,

}
