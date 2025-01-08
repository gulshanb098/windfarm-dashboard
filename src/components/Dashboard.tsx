import React, { useEffect, useState } from "react";
import { IFault } from "../types/types";
import {
  calculateSummaryTiles,
  getAlarmsByCategory,
  getFilteredFaultsByDevice,
  getFilteredFaultsByWindfarm,
  getTop10AlarmCodes,
  getUniqueDevices,
} from "../utils/dataUtils";
import { BarChart } from "./BarChart";
import "./DashBoard.css";
import { DataTable } from "./DataTable";
import { HeatMap } from "./HeatMap";
import { PieChart } from "./PieChart";
import { Tiles } from "./Tiles";
import { ToggleFilters } from "./ToggleFilters";
import { WindFilter } from "./WindFilter";

export const Dashboard: React.FC = () => {
  const [windfarmType, setWindfarmType] = useState("");
  const [filteredFaults, setFilteredFaults] = useState<IFault[]>();
  const [summaryData, setSummaryData] = useState({});
  const [byFilter, setByFilter] = useState("code");
  const [midFilter, setMidFilter] = useState("duration");
  const [chartType, setChartType] = useState("column");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const uniqueDevices = getUniqueDevices();
  const [device, setDevice] = useState(uniqueDevices[0]);

  console.log('device: ', device);

  useEffect(() => {
    const faults = getFilteredFaultsByWindfarm(windfarmType);
    const filtered = getFilteredFaultsByDevice(faults, device);
    setFilteredFaults(filtered);
    setSummaryData(calculateSummaryTiles(filtered));
  }, [windfarmType, device]);

  if (!filteredFaults) {
    return <>No Data</>;
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const renderGetChart = () => {
    let title = "";
    if (chartType === "pie") {
      title = `Alarms by Category (${midFilter})`;
      return (
        <PieChart
          data={getAlarmsByCategory(
            filteredFaults,
            midFilter === "count" ? "count" : "duration"
          )}
          title={title}
          isDarkMode={isDarkMode}
        />
      );
    }
    if (chartType === "heatmap") {
      title = `HeatMap - Top 10 Alarm`;
      return (
        <HeatMap
          data={getTop10AlarmCodes(
            filteredFaults,
            midFilter === "count" ? "count" : "duration"
          )}
          title={title}
          isDarkMode={isDarkMode}
        />
      );
    }
    return (
      <BarChart
        data={getTop10AlarmCodes(
          filteredFaults,
          midFilter === "count" ? "count" : "duration"
        )}
        title={title}
        filterBy={midFilter}
        isDarkMode={isDarkMode}
      />
    );
  };

  return (
    <div className={`container-fluid ${isDarkMode ? "dark" : ""}`}>
      <div className="row content">
        <div className="col-sm-12">
          <WindFilter
            onChange={setWindfarmType}
            onToggleTheme={toggleTheme}
            setDevice={setDevice}
            allDevices={uniqueDevices}
            isDarkMode={isDarkMode}
          />
          <Tiles summaryData={summaryData} />
          <div className="well">
            <ToggleFilters
              byFilter={byFilter}
              midFilter={midFilter}
              chartType={chartType}
              setByFilter={setByFilter}
              setMidFilter={setMidFilter}
              setChartType={setChartType}
            />
            {renderGetChart()}
          </div>
          <div className="well">
            <DataTable isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};
