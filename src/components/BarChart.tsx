import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { theme } from "../utils/theme";

interface Props {
  data: any;
  title: string;
  filterBy: string;
  isDarkMode: boolean;
}

export const BarChart: React.FC<Props> = ({ data, title, filterBy, isDarkMode }: Props) => {
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const options = {
    chart: {
      type: "column",
      backgroundColor: currentTheme.backgroundColor,
    },
    title: {
      text: title,
      style: { color: currentTheme.textColor },
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: data.map((item: { code: number; desc: string }) => `${item.desc} - (${item.code})`),
      labels: {
        style: {
          color: currentTheme.textColor,
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Hours",
        style: {
          color: currentTheme.textColor,
        },
      },
      labels: {
        style: {
          color: currentTheme.textColor,
        },
      },
    },
    tooltip: {
      pointFormat: "Duration: <b>{point.y:.1f} seconds</b>",
      style: {
        color: currentTheme.tooltipColor,
      },
    },
    series: [
      {
        data: data.map((item: { duration: number; count: number }) =>
          filterBy === "count" ? item.count : item.duration
        ),
        colors: [
          "#9b20d9", "#9215ac", "#861ec9", "#7a17e6", "#7010f9", "#691af3", "#6225ed", "#5b30e7", 
          "#533be1", "#4c46db", "#4551d5", "#3e5ccf", "#3667c9", "#2f72c3", "#277dbd", "#1f88b7", 
          "#1693b1", "#0a9eaa", "#03c69b", "#00f194",
        ],
        colorByPoint: true,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: currentTheme.textColor,
          inside: true,
          verticalAlign: "top",
          format: "{point.y:.1f}",
          y: 10,
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
