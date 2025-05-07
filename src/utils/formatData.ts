import { ICar } from "../types";

const formatData = (car: ICar) => {
  // nesene içinden ekrana basmayı istediğimiz alanları belirle

  const accepted = [
    "make",
    "model",
    "cylinders",
    "drive",
    "fueltype",
    "transy",
    "vclass",
    "year",
    "tcharger",
    "startstop",
    "co2",
    "displ",
    "atvtype",
  ];
  const arr = Object.entries(car).filter((item) => accepted.includes(item[0]));
  return arr;
};
export default formatData;
