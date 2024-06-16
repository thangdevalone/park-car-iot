"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ParkingLog = {
  id: string;
  parking_card: string;
  entry_time: string;
  exit_time?: string | null;
  money?: number | null;
  entry_image: string;
  exit_image?: string | null;
};
 
export const columns: ColumnDef<ParkingLog>[] = [
  {
    accessorKey: "parking_card",
    header: "Mã số thẻ",
  },
  {
    accessorKey: "entry_time",
    header: "Thời gian vào",
  },
  {
    accessorKey: "exit_time",
    header: "Thời gian ra",
  },
  {
    accessorKey: "money",
    header: "Phí gửi xe",
  },
]