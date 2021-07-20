import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { checkString} from "../utils/filter";

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    const serachString = device.getSearchFilter();
    let devices = device.devices;
    
    if (serachString.length >0) {
        devices = device.devices.filter((item) => {
            return checkString(item.name, serachString);
        });
    }

    return (
        <Row className="d-flex">
            {devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    );
});

export default DeviceList;
