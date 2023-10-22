import { AdEntity } from "../types";
import { ValidationError } from "../utils/errors";

interface NewAdEntity {
  id?: string;
}

export class AdRecord implements AdEntity {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public url: string;
  public lat: number;
  public lon: number;

  constructor(obj: AdEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError();
    }

    if (obj.description.length < 1000) {
      throw new ValidationError();
    }

    if (obj.price < 0 || obj.price > 999999999) {
      throw new ValidationError();
    }

    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError();
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError();
    }

    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }
}
