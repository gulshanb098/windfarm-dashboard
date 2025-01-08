import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsHeatmap from "highcharts/modules/heatmap";
import React from "react";
import { theme } from "../utils/theme";

highchartsHeatmap(Highcharts);

interface Props {
  data: any;
  title: string;
  isDarkMode: boolean;
}

export const HeatMap: React.FC<Props> = ({
  data,
  title,
  isDarkMode,
}: Props) => {
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const formattedData = data.flatMap(
    (item: { count: any; duration: any }, index: any) => [
      [index, 0, item.count],
      [index, 1, item.duration],
    ]
  );

  const options = {
    chart: {
      type: "heatmap",
      backgroundColor: currentTheme.backgroundColor,
    },
    title: {
      text: title,
      style: { color: currentTheme.textColor },
    },
    xAxis: {
      categories: data.map((item: { code: any }) => item.code),
    },
    yAxis: {
      title: {
        text: "Count",
        style: { color: currentTheme.textColor },
      },
      categories: ["Alarm Frequency"],
    },
    colorAxis: {
      min: 0,
      minColor: currentTheme.textColor,
      maxColor: "#FF0000",
    },
    series: [
      {
        name: "Alarm Frequency",
        data: formattedData,
        dataLabels: {
          enabled: true,
          color: currentTheme.textColor,
        },
      },
    ],
    tooltip: {
      pointFormat:
        "{point.xCategory}: {point.yCategory}<br>Count: {point.value}",
      style: { color: currentTheme.tooltipColor },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
