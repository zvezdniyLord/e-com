const uuid = require('uuid')
const path = require('path');
const { Device, DeviceInfo, Rating } = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            },
        )
        return res.json(device)
    }

    async setRating(req, res, next) {
        try {
            const deviceId = req.params.id;
            const { rating, userId } = req.body;
            let newRating;
            const userRating = await Rating.findOne({
                where: {
                    deviceId: deviceId,
                    userId: userId
                }
            });

            if (!userRating) {
                newRating = await Rating.create({
                    rate: rating,
                    deviceId: deviceId,
                    userId: userId
                });
            }
            else {
                await Rating.update({ rate: rating },
                    {
                        where: {
                            deviceId: deviceId,
                            userId: userId
                        }
                    });
            }

            const deviceRatings = await Rating.findAll({
                attributes: ["rate"],
                where: {
                    deviceId: deviceId,
                }
            });

            const newDeviceRating = (deviceRatings.reduce((prev, next) => {
                return prev + next.rate
            }, 0)) / deviceRatings.length;

            await Device.update({
                rating: Math.round(newDeviceRating)
            }, {
                where: {
                    id: deviceId
                }
            });

            const currentDevice = await Device.findOne({
                where: {
                    id: deviceId
                }
            });

            return res.json("Рейтинг товара успешно изменен");
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DeviceController()
