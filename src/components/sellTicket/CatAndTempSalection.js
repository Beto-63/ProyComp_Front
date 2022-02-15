import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { server } from '../../context/Api'
/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const ProductSelectForm = () => {
    const objCat = {
        cat_name: ''
    }

    const objTemp = {
        temp: ''
    }

    const navigate = useNavigate()

    const { categories, selectedProducts, setSelectedProducts } = useContext(SellTicketContext)

    const [drink, setDrink] = useState(false);
    const [cat, setCat] = useState(objCat)
    const [temp, setTemp] = useState(objTemp)

    const handleCat = (e) => {
        let obj = { ...cat, [e.target.name]: e.target.value }
        setCat(obj)
        if (e.target.value === "Té" || e.target.value === "Infusión") {
            setDrink(true)
        } else { setDrink(false) }

    }

    const handleTemp = (e) => {
        let obj = { ...temp, [e.target.name]: e.target.value }
        setTemp(obj)
    }


    const handleProduct = (objProduct) => {
        if (temp.temp === '') {
            let obj = {
                cat_name: cat.cat_name
            };

            fetch(`${server}/product/findByCatName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(json => setSelectedProducts(json));
        } else {
            let obj = {
                cat_name: cat.cat_name,
                temperature: temp.temp
            };

            fetch(`${server}/product/selectCatTemp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then(json => setSelectedProducts(json));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProduct()
        setCat(objCat)
        setTemp(objTemp)
        console.log(selectedProducts)
        navigate('/sell/chooseProductTable');
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Tipo de Producto:</Form.Label>
                <div className="mb-3">
                    {categories.map((e, index) => (
                        <Form.Check
                            key={index}
                            onClick={handleCat}
                            inline
                            label={e.name}
                            name="cat_name"
                            type='radio'
                            id={`inline-radio-1`}
                            value={e.name}
                        />

                    ))}
                </div>
                {drink ?
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Temperatira de las bebidas:</Form.Label>
                        <div className="mb-3" >

                            <Form.Check
                                onClick={handleTemp}
                                inline
                                label='Caliente'
                                name="temperature"
                                type='radio'
                                id={`inline-radio-1`}
                                value='Caliente'
                            />
                            <Form.Check
                                onClick={handleTemp}
                                inline
                                label='Frío'
                                name="temperature"
                                type='radio'
                                id={`inline-radio-1`}
                                value='Frío'
                            />
                        </div>
                    </Form>
                    :
                    ''}



                <Button variant='secondary' type="submit">Escoge el Producto</Button>
            </Form>

        </div>
    );
};


export default ProductSelectForm;
