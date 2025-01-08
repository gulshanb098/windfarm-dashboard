import devices from "../assets/device.json";
import faults from "../assets/fault.json";
import { IDataTable, IFault } from "../types/types";

const formatDuration = (totalSeconds: number): string => {
  const hours = Math.round(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);

  return `${hours ? `${hours} hrs, ` : ""}${
    minutes ? `${minutes} min, ` : ""
  }${seconds} sec`;
};

export const getFilteredFaultsByWindfarm = (windfarm: string) => {
  if (windfarm === "") {
    return faults;
  }
  const assetId = devices.find((d) => d.asset === windfarm)?.asset_id;
  return faults.filter((f) => f.asset_id === assetId);
};

export const getFilteredFaultsByDevice = (faults: IFault[], device: string) => {
  // if (device === "") {
  //   return faults;
  // }
  const deviceId = devices.find((d) => d.device_name === device)?.id;
  console.log('deviceId: ', deviceId);
  console.log('faults: ', faults.length);
  const newFaults = faults.filter((f) => f.device_id == deviceId)
  console.log('faults#1: ', newFaults.length);
  return newFaults;
};

export const calculateSummaryTiles = (filteredFaults: IFault[]) => {
  const totalAlarmDuration = filteredFaults.reduce(
    (sum, fault) => sum + fault.duration_seconds,
    0
  );
  const totalAlarms = filteredFaults.length;
  const maxDurationAlarm = Math.max(
    ...filteredFaults.map((fault) => fault.duration_seconds)
  );
  const maxDurationDeviceId = filteredFaults.find(
    (fault) => fault.duration_seconds === maxDurationAlarm
  )?.device_id;
  const maxDurationDeviceName = devices.find(
    (d) => d.id === maxDurationDeviceId
  )?.device_name;

  return {
    totalAlarmDuration: formatDuration(totalAlarmDuration),
    totalAlarms,
    maxDurationDeviceName,
    maxDurationAlarm: formatDuration(maxDurationAlarm),
  };
};

export const getTop10AlarmCodes = (
  filteredFaults: IFault[],
  type: "count" | "duration"
) => {
  const alarmCodeMap: {
    [key: number]: { duration: number; count: number; desc: string };
  } = {};

  filteredFaults.forEach((fault) => {
    alarmCodeMap[fault.code] = alarmCodeMap[fault.code] || {
      duration: 0,
      count: 0,
      desc: "",
    };
    alarmCodeMap[fault.code].duration += fault.duration_seconds;
    alarmCodeMap[fault.code].count += 1;
    alarmCodeMap[fault.code].desc = fault.description;
  });

  const sortedCodes = Object.entries(alarmCodeMap)
    .sort((a, b) => (b[1][type] as number) - (a[1][type] as number))
    .slice(0, 10);

  return sortedCodes.map(([code, data]) => ({ code: Number(code), ...data }));
};

export const getAlarmsByCategory = (
  filteredFaults: IFault[],
  type: "count" | "duration"
) => {
  const categoryMap: { [key: string]: { duration: number; count: number } } =
    {};

  filteredFaults.forEach((fault) => {
    if (fault.category) {
      categoryMap[fault.category] = categoryMap[fault.category] || {
        duration: 0,
        count: 0,
      };
      categoryMap[fault.category].duration += fault.duration_seconds;
      categoryMap[fault.category].count += 1;
    }
  });

  const total = Object.values(categoryMap).reduce(
    (sum, data) => sum + data[type],
    0
  );

  if (total === 0) {
    return [];
  }

  return Object.entries(categoryMap).map(([category, data]) => ({
    name: category,
    y: (data[type] / total) * 100,
  }));
};

export const formattedTableData = () => {
  const data: IDataTable[] = faults
    .map((f) => {
      return {
        device: devices.find((d) => d.id === f.device_id)?.device_name,
        start_time: new Date(f.time_stamp),
        resolution_time: new Date(f.resolution_time_stamp),
        duration: f.duration_seconds,
        category: f.category,
        alarm_code: f.code,
        description: f.description,
      };
    })
    .filter((f) => f.category);
  return data;
};

export const getUniqueDevices = () => {
  const dev = [...new Set(devices.map((d) => d.device_name))];
  return dev.sort();
}
