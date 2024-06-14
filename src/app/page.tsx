/* eslint-disable @next/next/no-img-element */
"use client";
import mainApi from "@/api/main";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ResponseApi } from "@/models";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import io from 'socket.io-client';

export default function Home() {
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
        description:"Lúc "+ format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
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
        description: "Lúc "+ format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
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
        description:"Lúc "+ format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
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
        description: "Lúc "+ format(new Date(), "EEEE, MMMM d, yyyy 'at' h:mm a", {
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
    <main className="grid  h-[calc(100vh_-_59px)] grid-cols-2 gap-2">
      <div className="grid grid-cols-2">
        <div></div>
        <div className="border-l-[1px] flex flex-col py-2 border-r-[1px] border-black">
          <div className="flex-1"></div>
          <div className="border-t-[1px] h-[150px] flex flex-col gap-2 p-2 border-black ">
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
        </div>
      </div>
      <div className="grid grid-cols-2 py-2 gap-2">
        <div>
          <span className="bg-black text-white">CAM_IN</span>
          {/* <img src={process.env.CAM_URL + ":81/stream" || ""} alt="camin" /> */}
        </div>
        <div>
          <span className="bg-black text-white">CAM_OUT</span>
          {/* <img src={process.env.CAM_URL + ":81/stream" || ""} alt="camin" /> */}
        </div>
        <div>
          <span className="bg-black text-white">IMAGE_IN</span>
          {/* <img src={process.env.CAM_URL + "/capture" || ""} alt="camin" /> */}
        </div>
        <div>
          <span className="bg-black text-white">IMAGE_OUT</span>
          {/* <img src={process.env.CAM_URL + "/capture" || ""} alt="camin" /> */}
        </div>
      </div>
    </main>
  );
}
