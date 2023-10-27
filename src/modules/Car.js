export class Car {
  #maxTank;

  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;
    return this;
  }

  get maxTank() {
    return this.#maxTank;
  }

  set maxTank(data) {
    console.log(`Нельзя поменять значение на ${data}`);
  }
}

export class PassengerCar extends Car {
  carType = 'passenger';

  constructor(brand, model, maxTank, fuelType = 'petrol') {
    super(brand, model, maxTank);
    this.fuelType = fuelType;
  }
}

export class Truck extends Car {
  carType = 'truck';

  constructor(brand, model, maxTank, fuelType = 'diesel') {
    super(brand, model, maxTank);
    this.fuelType = fuelType;
  }
}
