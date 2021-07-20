import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._devises = [];

    makeAutoObservable(this);
  }

  setItems(items) {
    this._devises = [...items];
  }

  getItems() {
    const itemIds = [...this._devises];
    return itemIds;
  }

  getCounter() {
    return [...this._devises].reduce((prev, next) => {
      return prev + next.quantity
    }, 0);
  }

  getTotalPrice() {
    let totalPrice = 0;
    totalPrice = this._devises.reduce((prev, next) => {
      return prev + (next.device.price * next.quantity);
    }, 0);

    return totalPrice;
  }
}
