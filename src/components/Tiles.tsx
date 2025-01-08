import React from "react";

interface Props {
  summaryData: any;
}

export const Tiles: React.FC<Props> = ({ summaryData }: Props) => {
  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="well">
          <h4>{summaryData.totalAlarmDuration}</h4>
          <p>Total Alarm Duration</p>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="well">
          <h4>{summaryData.totalAlarms}</h4>
          <p>Total Count of Alarms</p>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="well">
          <h4>{summaryData.maxDurationDeviceName}</h4>
          <p>Device with Max Duration Alarm</p>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="well">
          <h4>{summaryData.maxDurationAlarm}</h4>
          <p>Max Duration Alarm Time</p>
        </div>
      </div>
    </div>
  );
};
