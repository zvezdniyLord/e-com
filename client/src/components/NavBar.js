import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import {NavLink} from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom';

import SearchForm from "./SearchForm";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const { basket } = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    const basketLabel = basket.getCounter() > 0 ? "Товаров в корзине:" + basket.getCounter() : "В корзине нет товаров";

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>Белая Лошадь</NavLink>            
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <SearchForm />
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(BASKET_ROUTE)}
                        >
                            {basketLabel}
                        </Button>                        
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => history.push(LOGIN_ROUTE)}
                        >Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
