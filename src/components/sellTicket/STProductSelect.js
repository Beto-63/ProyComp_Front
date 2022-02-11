import React, { useContext } from 'react';
import SellTicketContext from '../../context/SellTicketContext';

import ProductSelectForm from './ProductSelectForm';
import ProductSelectTable from './ProductSelectTable';


const STProductSelect = () => {
  const { getProductByCatName, product, setProduct } = useContext(SellTicketContext)
  
  
  //Manejador para el Producto
  const handleProduct = (objProduct) => {
    //Utilizar funcion del contexto
    getProductByCatName(objProduct).then(async resp => {
      let json = await resp.json();
      //almacenar los objetos recibidos de la base de datos en un array
      let array = [...product, json]
      setProduct(array)
    });
  }
  return (
    <div>
      <ProductSelectForm handleProduct={handleProduct} />
      <ProductSelectTable />
    </div>
  );
};

export default STProductSelect;
