import React, { useEffect, useState, useContext} from 'react';
import ReactStars from "react-rating-stars-component";
import {Context} from "../index";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE} from "../utils/consts";
import { sendRatin, addToBasket} from "../http/deviceAPI";

const DevicePage = () => {
    const { basket } = useContext(Context);
    const { user } = useContext(Context);
    const history = useHistory();

    const [device, setDevice] = useState({info: []});

    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, []);

    const handleAddToBasket = () => {
        if (user.isAuth) {
            addToBasket(user.user.id, device.id)
                .then((data) => {
                    basket.setItems(data)
                });
        }
        else {
            history.push(LOGIN_ROUTE)
        }
        
    }

    const handleRatingClick = (new_rating) => {
        sendRatin(device.id, new_rating, user.user.id)
            .then(() => {
                return fetchOneDevice(id);
            })
            .then(data => setDevice(data));
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                        <ReactStars 
                            count={5}
                            value={device.rating}
                            onChange={handleRatingClick}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={"outline-dark"} 
                            onClick={handleAddToBasket}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
