/* eslint-disable @next/next/no-img-element */

import mainApi from "@/api/main";
import { ResponseApi } from "@/models";
import React from "react";
import { useToast } from "./ui/use-toast";
import { vi } from "date-fns/locale/vi";
import { format } from "date-fns";
import { Button } from "./ui/button";

type Props = {};

function GroupDoor({}: Props) {
  const { toast } = useToast();
  const handleOpenDoorIn = async () => {
    try {
      const res = (await mainApi.openDoorIn()) as unknown as ResponseApi;
      console.log(res);
      toast({
        title: res.mess,
        description: format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
          locale: vi,
        }),
      });
    } catch (error) {
      toast({
        title: (error as unknown as ResponseApi).mess,
        description:
          "Lúc " +
          format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
            locale: vi,
          }),
        variant: "destructive",
      });
    }
  };
  const handleCloseDoorIn = async () => {
    try {
      const res = (await mainApi.closeDoorIn()) as unknown as ResponseApi;
      toast({
        title: res.mess,
        description:
          "Lúc " +
          format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
            locale: vi,
          }),
      });
    } catch (error) {
      toast({
        title: (error as unknown as ResponseApi).mess,
        description: format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
          locale: vi,
        }),
        variant: "destructive",
      });
    }
  };
  const handleOpenDoorOut = async () => {
    try {
      const res = (await mainApi.openDoorOut()) as unknown as ResponseApi;
      console.log(res);
      toast({
        title: res.mess,
        description: format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
          locale: vi,
        }),
      });
    } catch (error) {
      toast({
        title: (error as unknown as ResponseApi).mess,
        description:
          "Lúc " +
          format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
            locale: vi,
          }),
        variant: "destructive",
      });
    }
  };
  const handleCloseDoorOut = async () => {
    try {
      const res = (await mainApi.closeDoorOut()) as unknown as ResponseApi;
      toast({
        title: res.mess,
        description:
          "Lúc " +
          format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
            locale: vi,
          }),
      });
    } catch (error) {
      toast({
        title: (error as unknown as ResponseApi).mess,
        description: format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
          locale: vi,
        }),
        variant: "destructive",
      });
    }
  };
  return (
    <div  className="border-t-[1px] h-[160px] flex flex-col gap-2 p-2 border-black ">
      <div>
        <label className="font-bold">Cổng vào</label>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => handleCloseDoorIn()}
            className="flex h-10 flex-row gap-3 items-center px-3 w-full border-black "
            variant="outline"
          >
            <img className="h-[120%]" src="/car.gif" alt="car" />
            <span className="block mt-1">Đóng cổng vào</span>
          </Button>
          <Button
            onClick={() => handleOpenDoorIn()}
            className="flex h-10 hover:bg-green-400 flex-row gap-3 items-center px-3 w-full border-black bg-green-300"
            variant="outline"
          >
            <img className="h-[120%]" src="/car.gif" alt="car" />
            <span className="block mt-1">Mở cổng vào</span>
          </Button>
        </div>
      </div>
      <div>
        <label className="font-bold">Cổng ra</label>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => handleCloseDoorOut()}
            className="flex h-10 flex-row gap-3 items-center px-3 w-full border-black"
            variant="outline"
          >
            <img className="h-[120%]" src="/car.gif" alt="car" />
            <span className="block mt-1">Đóng cổng ra</span>
          </Button>
          <Button
            onClick={() => handleOpenDoorOut()}
            className="flex h-10  hover:bg-green-400 flex-row gap-3 items-center px-3 w-full border-black bg-green-300"
            variant="outline"
          >
            <img className="h-[120%]" src="/car.gif" alt="car" />
            <span className="block mt-1">Mở cổng ra</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GroupDoor;
