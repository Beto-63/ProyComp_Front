import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
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

    const { keepSelecting, setKeepSelecting,

        categories, saleSummary,
        setSelectedProducts,
        summary, setSummary,
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


    const handleProduct = () => {
        if (!drink) {
            let obj = {
                cat_name: cat.cat_name
            };

            fetch(`${server}/product/findByCatName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
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

            fetch(`${server}/product/selectCatTemp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(obj2)
            })
                .then(response => response.json())
                .then(json => setSelectedProducts(json));
        }
    }



    const handleCloseSale = () => {
        (saleSummary.length > 0) ? setKeepSelecting(false) : window.alert("No has seleccionado nada")
    }

    const handleAddItems = (e) => {
        handleProduct()
        setSummary(true)
        setCat(objCat)
        setTemp(objTemp)

        switch (cat.cat_name) {
            case
                'Té': navigate('/sell/chooseProductTable');
                break;
            case
                'Infusión': navigate('/sell/chooseProductTable');
                break;
            case
                'Evento': navigate('/sell/chooseProductTable');
                break;
            case
                'Accesorios': navigate('/sell/chooseProductTable');
                break;
            case
                'Combo': navigate('/sell/chooseProductTable');
                break;
            case
                'Por Gramos': navigate("/sell/packet");
                break;
            case
                'no inventariable': navigate("/sell/catTempSelection");
                break;
            default:
            //do nothing

        }
    }
    return (
        <div className='canvas_claro'>
            <p className="titulo_oscuro">Selecciona los productos</p>
            <Link to="/menu" className='inicio'>Inicio</Link>
            <Link to="/sell" className='volver'>Volver</Link>
            <Container >
                <div >
                    {keepSelecting ?
                        <div>
                            <label>Tipo de Producto:</label>
                            <div className="radio-light">
                                {categories.map((e, index) => (
                                    <input
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
                                    <label>Temperatura de las bebidas:</label>
                                    <div className='radio-light' >

                                        <input
                                            onClick={handleTemp}
                                            inline
                                            label='Caliente'
                                            name="temperature"
                                            type='radio'
                                            id={`inline-radio-1`}
                                            value='Caliente'
                                        />
                                        <input
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

                            <div>
                                <br />
                                <button className='btn-light-bkg' type='button' onClick={handleAddItems}>Escoger</button>
                            </div>

                            <br />
                            <p>Al terminar de escoger oprime Ya! y procederas al pago</p>
                            <div><button className='btn-light-bkg' type='button' onClick={handleCloseSale}>Ya!</button></div>
                        </div>
                        :
                        ''
                    }
                </div>
            </Container>
            {summary ?
                <SaleSummary />
                :
                ''
            }
        </div>

    );
};


export default ProductSelectForm;
