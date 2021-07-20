import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand',)
    return data
}

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

// Отправка рейтинга товара от пользователя
export const sendRatin = async (deviceId, rating, userId) => {
    const { data } = await $host.post('api/device/' + deviceId + '/rating', { rating, userId })
    return data;
}
// Отправка id товара при добавлении в корзину
export const addToBasket = async (userId, deviceId) => {
    const { data } = await $host.post('api/basket/', { userId, deviceId })
    return data;
}

export const removeFromBasket = async (id) => {
    const { data } = await $host.delete('api/basket/', { params: {
        id
    }})
    return data;
}
export const removeOneItemFromBasket = async (userId, deviceId) => {
    const { data } = await $host.put('api/basket/', {
            userId,
            deviceId
        }
    )
    return data;
}

export const fetchBasketItems = async (userId) => {
    const { data } = await $host.get('api/basket/' + userId)
    return data;
}
