import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { theme } from "../utils/theme";

interface Props {
  data: any;
  title: string;
  isDarkMode: boolean;
}

export const PieChart: React.FC<Props> = ({
  data,
  title,
  isDarkMode,
}: Props) => {
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const options = {
    chart: {
      type: "pie",
      backgroundColor: currentTheme.backgroundColor,
    },
    title: {
      text: title,
      style: { color: currentTheme.textColor },
    },
    tooltip: {
      valueSuffix: "%",
      formatter: function (this: any) {
        const point = this;
        return `${point.name}: ${point.percentage.toFixed(2)}%`;
      },
      style: { color: currentTheme.tooltipColor },
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            style: {
              fontSize: "1.2em",
              color: currentTheme.textColor,
            },
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              color: currentTheme.textColor,
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 4,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: data,
        groupPadding: 0,
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
