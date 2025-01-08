import React from "react";

interface Props {
  byFilter: string;
  midFilter: string;
  chartType: string;
  setByFilter: (byFilter: string) => void;
  setMidFilter: (midFilter: string) => void;
  setChartType: (chartType: string) => void;
}

export const ToggleFilters: React.FC<Props> = ({
  byFilter,
  midFilter,
  chartType,
  setByFilter,
  setMidFilter,
  setChartType,
}: Props) => {
  return (
    <div
      className="sticky-top"
      style={{
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid #ccc",
      }}
    >
      <div className="container">
        <div className="row">
          {/* Filter Buttons for "By Alarm Code", "By Category" */}
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="btn-group" role="group" aria-label="Filter by">
              <button
                onClick={() => {
                  setByFilter("code");
                  setChartType("column");
                }}
                className={`btn btn-sm ${
                  byFilter === "code" ? "btn-primary" : "btn-default"
                }`}
              >
                By Alarm Code
              </button>
              <button
                onClick={() => {
                  setByFilter("category");
                  setChartType("pie");
                }}
                className={`btn btn-sm ${
                  byFilter === "category" ? "btn-primary" : "btn-default"
                }`}
              >
                By Category
              </button>
            </div>
          </div>

          {/* Filter Buttons for "By Duration" and "By Count" */}
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="btn-group" role="group" aria-label="Mid Filter">
              <button
                onClick={() => setMidFilter("duration")}
                className={`btn btn-sm ${
                  midFilter === "duration" ? "btn-primary" : "btn-default"
                }`}
              >
                By Duration
              </button>
              <button
                onClick={() => setMidFilter("count")}
                className={`btn btn-sm ${
                  midFilter === "count" ? "btn-primary" : "btn-default"
                }`}
              >
                By Count
              </button>
            </div>
          </div>

          {/* Filter Buttons for "By Column", "By Pie", and "By Heatmap" */}
          <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="btn-group" role="group" aria-label="Chart Type">
              <button
                onClick={() => {
                  setChartType("column");
                  setByFilter("code");
                }}
                className={`btn btn-sm ${
                  chartType === "column" ? "btn-primary" : "btn-default"
                }`}
              >
                <i className="fa fa-bar-chart"></i>
              </button>
              <button
                onClick={() => {
                  setChartType("pie");
                  setByFilter("category");
                }}
                className={`btn btn-sm ${
                  chartType === "pie" ? "btn-primary" : "btn-default"
                }`}
              >
                <i className="fa fa-pie-chart"></i>
              </button>
              <button
                onClick={() => setChartType("heatmap")}
                className={`btn btn-sm ${
                  chartType === "heatmap" ? "btn-primary" : "btn-default"
                }`}
              >
                <i className="fa fa-th"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
