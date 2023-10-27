import {Column} from './Column';
import {RenderStation} from './RenderStation';

export class Station {
  #queue = [];
  #fillingColumns = [];
  #ready = [];

  constructor(stationType, renderApp = null) {
    this.stationType = stationType;
    this.renderApp = renderApp;
    this.renderStation = null;
  }

  get fillingColumns() {
    return this.#fillingColumns;
  }

  get queue() {
    return this.#queue;
  }

  init() {
    this.createColumn();
    this.renderNewStation();

    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  }

  createColumn() {
    for (const station of this.stationType) {
      if (!station.count) {
        station.count = 1;
        station.speed = 5;
      }

      for (let i = 0; i < station.count; i++) {
        this.#fillingColumns.push(new Column(station.type, station.speed));
      }
    }
  }

  renderNewStation() {
    if (this.renderApp) {
      this.renderStation = new RenderStation(this.renderApp, this);
    }
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#fillingColumns.length; j++) {
          if (!this.#fillingColumns[j].car &&
            this.#queue[i].fuelType === this.#fillingColumns[j].type) {
            this.#fillingColumns[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#fillingColumns[j]);
            this.renderStation.renederStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    let nowTank = car.nowTank;
    const timerId = setInterval(() => {
      nowTank += column.speed;
      if (nowTank >= car.maxTank) {
        clearInterval(timerId);
        car.fillUp();
        column.car = null;
        this.leaveClient({car});
      }
    }, 1000);
  }

  leaveClient({car, total}) {
    this.#ready.push(car);
    this.renderStation.renederStation();
  }

  addCarQueue(car) {
    this.#queue.push(car);
    this.renderStation.renederStation();
  }
}
