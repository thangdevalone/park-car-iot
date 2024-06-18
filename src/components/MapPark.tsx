/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {};

function MapPark({}: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full text-2xl text-center py-3 bg-green-300">
        Bãi đỗ xe 2d
      </div>
      <img className="w-[90%] my-3" src="/map.svg" alt="map" />
    </div>
  );
}

export default MapPark;
