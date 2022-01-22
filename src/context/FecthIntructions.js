import { server } from './Api'

const GetUbicaciones = async () => {
    const response = await fetch(`${server}/stock/channels`);
    const data = await response.json();
    return data;
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

const AddToStockItem = async (objStockItem) => {
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

    //Stock
    NewStockItem,
    AddToStockItem,
    GetStockItemByNameAndLocation,

}
