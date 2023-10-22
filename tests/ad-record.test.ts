import { AdRecord } from "../records/ad.record";

const defaultObj = {
  name: "Test Name",
  description: "blah",
  url: "https://www.example.com",
  price: 0,
  lat: 9,
  lon: 9,
};

test("Can build an AdRecord", () => {
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe("Test Name");
  expect(ad.description).toBe("blah");
});

test("Validates invalid price", () => {
  const ad = new AdRecord({ ...defaultObj, price: -3 });

  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        price: -3,
      }),
  ).toThrow("Cena nie może być mniejsza niż 0 lub większa niż 999999999");
});
