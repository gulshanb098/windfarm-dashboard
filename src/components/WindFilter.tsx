import React from "react";
import "./WindFilter.css";

interface Props {
  onChange: (value: string) => void;
  onToggleTheme: () => void;
  setDevice: (value: string) => void;
  allDevices: string[];
  isDarkMode: boolean;
}

export const WindFilter: React.FC<Props> = ({
  onChange,
  onToggleTheme,
  setDevice,
  allDevices,
  isDarkMode,
}: Props) => {
  return (
    <div className="row align-items-center py-2">
      <div className="col-sm-9">
        <select
          className="form-control form-control-sm"
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select Windfarm</option>
          <option value="Minneapolis">Minneapolis</option>
          <option value="Colorado">Colorado</option>
        </select>
      </div>
      <div className="col-sm-6">
        <select
          className="form-control form-control-sm"
          onChange={(e) => setDevice(e.target.value)}
        >
          {/* <option value="">Select Device</option> */}
          {allDevices.map((a) => {
            return <option value={a}>{a}</option>
          })}
        </select>
      </div>
      <div className="col-sm-3 text-right">
        <div className="theme-switch">
          <input
            type="checkbox"
            id="theme-switch-checkbox"
            checked={isDarkMode}
            onChange={onToggleTheme}
          />
          <label htmlFor="theme-switch-checkbox" className="slider">
            <i className={`fa ${isDarkMode ? "fa-moon-o" : "fa-sun-o"}`}></i>
          </label>
        </div>
      </div>
    </div>
  );
};
