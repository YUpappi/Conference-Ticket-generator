import { useEffect, useState } from "react";
import { genRandBarCode } from "../Pages/utils";

function Barcode() {
  const barCount = 33;
  const [firstDigit, setFirstDigit] = useState(null);
  const [barCodeOne, setBarCodeOne] = useState("");
  const [barCodeTwo, setBarCodeTwo] = useState("");

  useEffect(() => {
    setFirstDigit(genRandBarCode(1));
    setBarCodeOne(genRandBarCode());
    setBarCodeTwo(genRandBarCode());
  }, []);
  return (
    <div className="barcode-container">
      <div className="barcode-lines">
        {Array.from({ length: barCount }).map((_, index) => {
          let height;
          if (
            index < 2 ||
            index >= barCount - 2 ||
            index === Math.floor(barCount / 2) ||
            index === Math.floor(barCount / 2) - 1
          ) {
            height = 70;
          } else {
            height = 60;
          }

          if (index % 8 === 0) {
            return (
              <div key={`space-${index}`} className="barcode-line space"></div>
            );
          }

          let widthClass = "";
          if (index % 4 === 0) {
            widthClass = "wide";
          } else if (index % 5 === 0) {
            widthClass = "extra-wide";
          }

          return (
            <div
              key={index}
              className={`barcode-line ${widthClass}`}
              style={{ height: `${height}px` }}
            ></div>
          );
        })}
      </div>
      <div className="barcode-text">
        <p>{firstDigit}</p>
        <p>{barCodeOne}</p>
        <p>{barCodeTwo}</p>
      </div>
    </div>
  );
}

export default Barcode;
