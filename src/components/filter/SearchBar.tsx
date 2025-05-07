import React, { FC, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import { makes } from "../../utils/constants";
import { SelectOption } from "../../types";

const SearchBar: FC = () => {
  const [searchParams, setSearcParams] = useSearchParams();

  const [make, setMake] = useState<string | null>(
    searchParams.get("make") || null
  );
  const [model, setModel] = useState<string | null>(
    searchParams.get("model") || null
  );

  // makes array ini react selecte uygun hale getir

  const options: SelectOption[] = makes.map((make) => ({
    label: make,
    value: make,
  }));
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("make");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
    searchParams.set("page", "1");
    setSearcParams(searchParams);
  };
  useEffect(() => {
    const paramMake = searchParams.get("make");
    const paramModel = searchParams.get("model");

    setMake(paramMake || null);
    setModel(paramModel || null);
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar flex gap-3 items-center justify-center"
    >
      <div className="searchbar-item items-end">
        <div className="w-full flex flex-col">
          <label>Marka</label>
          <ReactSelect
            value={make ? { label: make, value: make } : null}
            onChange={(option) => setMake(option?.value as string)}
            options={options}
            placeholder="Marka Seçiniz..."
            className="w-full text-black"
          />
        </div>
        <button type="submit" className="ml-3 sm:hidden cursor-pointer">
          <img src="/search.svg" alt="" className="size-[40px] " />
        </button>
      </div>
      <div className="searchbar-item flex flex-col items-start">
        <label>Model</label>
        <div className="w-full flex">
          <div className="absolute ml-3 mt-1">
            <img src="/model-icon.png" alt="" className="size-[25px] " />
          </div>
          <input
            value={model || ""}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model Yazınız..."
            type="text"
            className="searchbar-input rounded text-black bg-white"
          />
          <button type="submit" className="ml-3  cursor-pointer">
            <img src="/search.svg" alt="" className="size-[40px] " />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
