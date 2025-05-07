import { FC } from "react";
import { ICar } from "../../types";
import generateImage from "../../utils/generateImage";

type Props = {
  car: ICar;
};

const Images: FC<Props> = ({ car }) => {
  return (
    <div className="flex-1 flex-col gap-3">
      <div className="w-full  h-50">
        <img
          className="w-full h-full mx-auto object-cover rounded-md"
          src={generateImage(car, undefined, true)}
          alt=""
        />
      </div>
      <div className="flex gap-3 my-3">
        <div className="rounded flex-1 flex relative h-30 bg-primary-blue-100">
          <img
            src={generateImage(car, "29")}
            className="mx-auto object-contain  "
            alt=""
          />
        </div>
        <div className="rounded flex-1 flex relative h-30 bg-primary-blue-100">
          <img
            src={generateImage(car, "33")}
            className="mx-auto object-contain  "
            alt=""
          />
        </div>
        <div className="rounded flex-1 flex relative h-30 bg-primary-blue-100">
          <img
            src={generateImage(car, "13")}
            className="mx-auto object-contain  "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
