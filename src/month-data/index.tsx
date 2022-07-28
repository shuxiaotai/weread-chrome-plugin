import React, { useEffect, useRef } from "react";
import { init } from "echarts";
import { useRequest } from "ahooks";
import type { ECharts } from 'echarts'

import { baseApiUrl } from "../../src/constant";
import styles from "./index.module.css";

interface IMonthTimeItem {
  monthTotalReadTime: number;
}

interface IDetailData {
  monthTimeSummary: IMonthTimeItem[];
}

const Index = (): JSX.Element => {
  const echartsDiv = useRef<ECharts | null>(null);
  const { data: detailData } = useRequest(`${baseApiUrl}/readdetail`);

  const renderOption = (detailData: IDetailData) => {
    const data = detailData.monthTimeSummary
      .reverse()
      .map((item: IMonthTimeItem) =>
        (item.monthTotalReadTime / 3600).toFixed(1)
      );
    return {
      title: {
        text: "读书时长",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} 小时",
        },
      },
      series: [
        {
          name: "时长",
          type: "line",
          data,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
      ],
    };
  };

  useEffect(() => {
    echartsDiv.current = init(
      document.getElementById("month-data") as HTMLDivElement
    );
  }, []);

  useEffect(() => {
    if (detailData) {
      echartsDiv.current?.setOption(renderOption(detailData));
    }
  }, [detailData]);

  // 渲染时间图表
  return <div id="month-data" className={styles["month-data"]}></div>;
};

export default Index;
