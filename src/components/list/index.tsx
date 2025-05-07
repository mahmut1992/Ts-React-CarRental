import React, { useEffect, useRef, useState } from "react";
import { fetchCars } from "../../utils/service";
import { ICar } from "../../types";
import Warning from "../warning";
import Card from "../hero/Card";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../loader";

const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<ICar[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const firstCard = useRef<HTMLDivElement | null>(null);

  const make: string = searchParams.get("make") || "";
  const model: string = searchParams.get("model") || "";
  const year: string = searchParams.get("year") || "";
  const page: string = searchParams.get("page") || "1";

  useEffect(() => {
    setIsLoading(true);
    fetchCars(make, model, year, page)
      .then((data) => {
        setCars(data.results);
        setTotal(data.total_count);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [make, model, year, page]);

  if (isLoading)
    return (
      <Warning>
        <Loader />
      </Warning>
    );
  if (error) return <Warning>{error} </Warning>;
  if (!cars || cars.length < 0) return <Warning>Veri Bulunamadı</Warning>;

  return (
    <div className="padding-x max-width">
      <div className="absolute" ref={firstCard} />
      <section className="home-cars-wrapper">
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </section>
      {total && (
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          initialPage={Number(page) - 1}
          onPageChange={(e) => {
            searchParams.set("page", String(e.selected + 1));
            setSearchParams(searchParams);
            firstCard.current?.scrollIntoView();
          }}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(total / 10)}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default List;
