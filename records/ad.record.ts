import { AdEntity, NewAdEntity, SimpleAdEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket];

export class AdRecord implements AdEntity {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public url: string;
  public lat: number;
  public lon: number;

  constructor(obj: NewAdEntity) {
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

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOne(id: string): Promise<AdRecord> {
    const [results] = pool.execute("SELECT * FROM `ad` WHERE id = :id", {
      id,
    }) as unknown as AdRecordResults;

    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
    const [results] = pool.execute(
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
      {
        search: `%${name}%`,
      },
    ) as unknown as AdRecordResults;

    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }
}
