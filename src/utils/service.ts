import { IFetchCarsReturn } from "../types";

export const fetchCars = async (
  make: string,
  model: string,
  year: string,
  page: string
): Promise<IFetchCarsReturn> => {
  let url = `${import.meta.env.VITE_API_URL}/all-vehicles-model/records?`;

  // eğer marka filtresi varsa istek attığımız url e ekle
  if (make) {
    url += `refine=make:'${make}'`;
  }
  if (model) {
    url += `&refine=model:'${model}'`;
  }
  if (year) {
    url += `&refine=year:'${year}'`;
  }

  // page   1   2   3   4   5
  // limit 10  10  10  10   10
  // offset  0  10  20  30   40  kaç eleman atlayıp hangi aralığı almalıyız
  const limit = 10;
  const offset = (Number(page) - 1) * limit;

  url += `&limit=${limit}`;
  url += `&offset=${offset}`;

  const res = await fetch(url);
  const data = await res.json();
  return data;
};
