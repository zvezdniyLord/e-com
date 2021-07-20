import React, { useContext, useEffect}  from 'react';
import { Context} from "../index";
import { Row, Col, Container, Button} from "react-bootstrap";
import BasketItem from "../components/BasketItem";
import { observer } from "mobx-react-lite";
import { fetchBasketItems, removeFromBasket, addToBasket, removeOneItemFromBasket} from "../http/deviceAPI";

const Basket = observer(() => {
    const { basket } = useContext(Context)
    const { user } = useContext(Context)
    const basketItems = basket.getItems();
    const totalPrice = basket.getTotalPrice();

    useEffect(() => {
        fetchBasketItems(user.user.id).then(data => {
            basket.setItems(data);
        })
    }, [basket.getItems])

    const hendleRemoveButtonClick = (basketItemId) => {
        removeFromBasket(basketItemId)
            .then(()=>{
                return fetchBasketItems(user.user.id)
            })
            .then(data => {
                basket.setItems(data);
            });
        
    }   

    const handleAddItemClick = (deviceId) => {
        console.log("Вы добавляете предмет предмет: " + deviceId);
        addToBasket(user.user.id, deviceId)
            .then((data) => {
                basket.setItems(data);
            })
    }

    const handleRemoveItemClick = (deviceId) => {
        console.log("Вы удаляете предмет: " + user.user.id, deviceId);
        removeOneItemFromBasket(user.user.id, deviceId)
            .then(() => {
                return fetchBasketItems(user.user.id)
            })
            .then(data => {
                basket.setItems(data);
            });
    }

    return (
        <Container>
            <h1>Корзина</h1>
            <Row className="mt-2">                
                <Col md={9}>
                    {basketItems <= 0 ?
                        <h2>Вы не добавили ничего в корзину</h2>
                        : <Row className="d-flex">
                            {basketItems.map((item, index) =>
                                <BasketItem key={`${index}-${item.id}`} device={item.device}
                                    onRemoveButtonClick={() => {
                                        hendleRemoveButtonClick(item.id);
                                    }}
                                    onAddItemClick={() =>{
                                        handleAddItemClick(item.device.id)
                                    }}
                                    onRemoveItemClick={()=>{
                                        handleRemoveItemClick(item.device.id)
                                    }}
                                    quantity={item.quantity}
                                />)}
                        </Row>
                    }
                    
                </Col>
                <Col md={3}>
                    <p>Итого: <b>{totalPrice}</b></p>
                    <Button onClick={()=>{ alert("Страница с оплатой не готова")}}>Оформить заказ</Button>
                </Col>
            </Row>
        </Container>
        
    );
});



export default Basket;
