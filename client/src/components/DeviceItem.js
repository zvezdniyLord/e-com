import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import {Link} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    return (
        <Col md={3} className="d-flex">
            <Card style={{cursor: 'pointer', position: 'relative' }} 
                border={"light"}>
                <Link to={DEVICE_ROUTE + '/' + device.id}>
                    <Card.Img src={process.env.REACT_APP_API_URL + device.img} height={150}
                    />
                </Link>
                <Card.Body>
                    <Link to={DEVICE_ROUTE + '/' + device.id} className="text-dark">
                        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                            <div>Рейтинг</div>
                            <div className="d-flex align-items-center">
                                <div>{device.rating}</div>
                                <Image width={18} height={18} src={star} />
                            </div>
                        </div>
                        <div>{device.name}</div>
                    </Link>
                </Card.Body>                                
            </Card>            
        </Col>
    );
};

export default DeviceItem;
