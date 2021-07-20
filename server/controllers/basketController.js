const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
  async addItem(req, res, next) {
    try {
      const { userId, deviceId } = req.body;
      console.log(userId, deviceId)
      const basket = await Basket.findOne({
        where: { userId }
      });

      const itemInTheBasket = await BasketDevice.findOne({
        where: {
          basketId: basket.id,
          deviceId: deviceId
        }
      });

      if (!itemInTheBasket) {
        await BasketDevice.create({ basketId: basket.id, deviceId });
      } else {
        await BasketDevice.update({
          quantity: itemInTheBasket.quantity + 1
        }, {
          where: {
            basketId: basket.id,
            deviceId: deviceId
          }
        })
      }

      const userBasket = await BasketDevice.findAll(
        {
          where: { basketId: basket.id },
          include: {
            model: Device,
            as: 'device'
          }
        }
      );

      return res.json(userBasket);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeItems(req, res, next) {
    try {
      const { id } = req.query;
      await BasketDevice.destroy({
        where: {
          id
        }
      })

      return res.json("Предметы успешно удалены");
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeOneItem(req, res, next) {
    try {
      const { userId, deviceId } = req.body;
      const basket = await Basket.findOne({
        where: { userId }
      });

      const itemInTheBasket = await BasketDevice.findOne({
        where: {
          basketId: basket.id,
          deviceId: deviceId
        }
      });

      if (itemInTheBasket) {
        if (itemInTheBasket.quantity <= 1) {
          await BasketDevice.destroy({
            where: {
              basketId: basket.id,
              deviceId: deviceId
            }
          })
        } else {
          await BasketDevice.update({
            quantity: itemInTheBasket.quantity - 1
          }, {
            where: {
              basketId: basket.id,
              deviceId: deviceId
            }
          })

          const userBasket = await BasketDevice.findAll(
            {
              where: { basketId: basket.id },
              include: {
                model: Device,
                as: 'device'
              }
            }
          );

          return res.json(userBasket);
        }
      }

      return res.json(`${userId} - ${deviceId}`);
    }
    catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllItems(req, res, next) {
    try {
      const { userId } = req.params
      const basket = await Basket.findOne({
        where: { userId }
      });

      const userBasket = await BasketDevice.findAll(
        {
          where: { basketId: basket.id },
          include: {
            model: Device,
            as: 'device'
          }
        }
      );

      return res.json(userBasket);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new BasketController();
