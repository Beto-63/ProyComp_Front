import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

/**********************Importacion de Componentes**************************/
import SellTicketContext from '../../context/SellTicketContext';
import { server } from '../../context/Api'
import SaleSummary from './SaleSummary';

/**********************Importacion de Estilos******************************/
import '../generic/Light-bkg.css'


const ProductSelectForm = () => {

    const objCat = {
        cat_name: ''
    }

    const objTemp = {
        temperature: ''
    }

    const navigate = useNavigate()

    const { categories, selectedProducts,
        keepSelecting, setKeepSelecting,
        setSelectedProducts, setSelectedCategory,
    } = useContext(SellTicketContext)

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
        if (!drink) {
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
            let obj2 = {
                cat_name: cat.cat_name,
                temperature: temp.temperature
            };
            setSelectedCategory(cat.cat_name)
            fetch(`${server}/product/selectCatTemp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj2)
            })
                .then(response => response.json())
                .then(json => setSelectedProducts(json));
        }
    }

    const handleCloseSale = () => {
        setKeepSelecting(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProduct()
        setCat(objCat)
        setTemp(objTemp)
        console.log(selectedProducts)
        navigate('/sell/chooseProductTable');
        // switch (objCat.cat_name) {
        //     case 'Té': navigate('/sell/chooseProductTable');
        //     case 'Infusión': navigate('/sell/chooseProductTable');
        //     case 'Evento': navigate('/sell/chooseProductTable');
        //     case 'Accesorio': navigate('/sell/chooseProductTable');
        //     case 'Combo': console.log("elemento de Combo");
        //     case 'Paquete': console.log("elemento de Paquete");
        //     case 'no inventariable': console.log("retornar");

        // }
    }
    return (
        <div className='canvas_claro'>
            <p className="titulo_oscuro">Proceso de Venta</p>
            <Link to="/" className='inicio'>Inicio</Link>
            <Link to="/sell" className='volver'>Volver</Link>
            <Container >
                <Form >
                    {keepSelecting ?

                        <div>
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
                                <div>
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
                                </div>
                                :
                                ''}

                            <div><button className='btn-light-bkg' onClick={handleSubmit}>Escoger</button></div>
                            <br />
                            <div><button className='btn-light-bkg' onClick={handleCloseSale}>Terminar</button></div>
                        </div>
                        :
                        ''
                    }
                </Form>
            </Container>
            <SaleSummary />
        </div>

    );
};


export default ProductSelectForm;
