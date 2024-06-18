/* eslint-disable @next/next/no-img-element */
"use client";
import mainApi from "@/api/main";
import { useToast } from "@/components/ui/use-toast";
import { ResponseApi } from "@/models";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect, useState } from "react";

import GroupDoor from "@/components/GroupDoor";
import MapPark from "@/components/MapPark";
import { ParkingLog, columns } from "./columns";
import { DataTable } from "./data-table";

// const data: ParkingLog[] = [
//   {
//     id: "1",
//     parking_card: "1",
//     entry_time: "10h",
//     entry_image: "images",
//   },
//   {
//     id: "1",
//     parking_card: "1",
//     entry_time: "10h",
//     entry_image: "images",
//   },
// ];

export default function Home() {
  const [socket, setSocket] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState<any>(null);
  const [imageInUrl, setImageInUrl] = useState<string>("");
  const [imageOutUrl, setImageOutUrl] = useState<string>("");
  const [cardLog, setCardLog] = useState<ParkingLog[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.13:80/ws");

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      ws.send("getId");
      handleGetCardLog();
    };

    ws.onmessage = async (event) => {
      const newData = event.data;
      console.log(JSON.parse(newData));
      const cardId = JSON.parse(newData).id;

      setImageInUrl("http://192.168.1.15/capture");
      setImageOutUrl("http://192.168.1.15/capture");
      if (cardId && cardId.trim() !== "") {
        setCardNumber(cardId);
        await handleCardLog(
          cardId,
          "http://192.168.1.15/capture",
          "http://192.168.1.15/capture"
        );
        handleGetCardLog();
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from the WebSocket server");
    };

    setSocket(ws);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const { toast } = useToast();

  const handleGetCardLog = async () => {
    try {
      const res = (await mainApi.getCardLog()) as unknown as ParkingLog[];
      console.log(res);
      setCardLog(res);
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

  const handleCardLog = async (
    card_number: string,
    imageInUrl: string,
    imageOutUrl: string
  ) => {
    try {
      const backendBaseUrl = "http://localhost:8000";
      const res = (await mainApi.cardLog(
        card_number,
        imageInUrl,
        imageOutUrl
      )) as unknown as ResponseApi;
      console.log(res);
      setImageInUrl(`${backendBaseUrl}${res.entry_image}`);
      setImageOutUrl(`${backendBaseUrl}${res.entry_image}`);
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

  return (
    <main className="grid  h-[calc(100vh_-_59px)] grid-cols-2 gap-2">
      <div className="grid grid-cols-2">
        <MapPark />
        <div className="border-l-[1px] flex flex-col border-r-[1px] border-black">
          <div className="flex-1">
            <div>
              <div className="flex items-center justify-center text-2xl bg-[#86efac] py-3">
                Lịch sử gửi xe
              </div>
              <div className="h-96 overflow-y-auto">
                <DataTable columns={columns} data={cardLog} />
              </div>
            </div>
          </div>
          <GroupDoor />
        </div>
      </div>
      <div className="grid grid-cols-2 py-2 gap-2">
        <div>
          <span className="bg-black text-white">CAM_IN</span>
          <img src={"http://192.168.1.15:81/stream"} alt="camin" />
        </div>
        <div>
          <span className="bg-black text-white">CAM_OUT</span>
          {/* <img src={"http://192.168.1.13:81/stream"} alt="camin" /> */}
        </div>
        <div>
          <span className="bg-black text-white">IMAGE_IN</span>
          <img src={imageInUrl} alt="camin" />
        </div>
        <div>
          <span className="bg-black text-white">IMAGE_OUT</span>
          <img src={imageOutUrl} alt="camout" />
        </div>
      </div>
    </main>
  );
}
