import React, { useContext, useState } from 'react';

import ProductSelectForm from './ProductSelectForm';
import ProductSelectTable from './ProductSelectTable';
import ProductContext from '../../context/ProductContext';
import AppContext from '../../context/AppContext';
import ProductSelectChoiceTable from './ProductSelectChoiceTable';


const STProductSelect = () => {
  const { getProductByCatName } = useContext(AppContext)
  //estado que va a almacenar en un arreglo los datos del ProductForm 
  const [product, setProduct] = useState([]);
  //Manejador para el Producto
  const handleProduct = (objProduct) => {
    //Utilizar funcion del contexto
    getProductByCatName(objProduct).then(async resp => {

      let json = await resp.json();
      //almacenar los objetos recibidos del ClientForm en un array
      let array = [...product, objProduct]
      setProduct(array)
    });
  }
  return (
    <ProductContext>
      <ProductSelectForm handleProduct={handleProduct} />
      <ProductSelectTable />
      <ProductSelectChoiceTable/>
    </ProductContext>
  );
};

export default STProductSelect;
