export interface IDevice {
  id: number;
  device_name: string;
  asset: Asset;
  asset_id: number;
}

export enum Asset {
  COLORADO = "Colorado",
  MINNEAPOLIS = "Minneapolis",
}

export interface IFault {
  time_stamp: string;
  resolution_time_stamp: string;
  code: number;
  duration_seconds: number;
  device_id: number;
  asset_id: number;
  category: string;
  description: string;
  fault_type: string;
}

export interface IDataTable {
  device?: string;
  start_time: Date;
  resolution_time: Date;
  duration: number;
  category: string;
  alarm_code: number;
  description: string;
}
