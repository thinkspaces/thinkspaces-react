const baseColors = {
  red: {
    1: "#fff1f0",
    2: "#ffccc7",
    3: "#ffa39e",
    4: "#ff7875",
    5: "#ff4d4f",
    6: "#f5222d",
    7: "#cf1322",
    8: "#a8071a",
    9: "#820014",
    10: "#5c0011",
  },
  blue: {
    1: "#e6f7ff",
    2: "#bae7ff",
    3: "#91d5ff",
    4: "#69c0ff",
    5: "#40a9ff",
    6: "#1890ff",
    7: "#096dd9",
    8: "#0050b3",
    9: "#003a8c",
    10: "#002766",
  },
  green: {
    1: "#f6ffed",
    2: "#d9f7be",
    3: "#b7eb8f",
    4: "#95de64",
    5: "#73d13d",
    6: "#52c41a",
    7: "#389e0d",
    8: "#237804",
    9: "#135200",
    10: "#092b00",
  },
  gold: {
    1: "#fffbe6",
    2: "#fff1b8",
    3: "#ffe58f",
    4: "#ffd666",
    5: "#ffc53d",
    6: "#faad14",
    7: "#d48806",
    8: "#ad6800",
    9: "#874d00",
    10: "#613400",
  },
};

const neutralColors = {
  gray: {
    1: "#ffffff",
    2: "#fafafa",
    3: "#f5f5f5",
    4: "#f0f0f0",
    5: "#d9d9d9",
    6: "#bfbfbf",
    7: "#8c8c8c",
    8: "#595959",
    9: "#434343",
    10: "#262626",
    11: "#1f1f1f",
    12: "#141414",
    13: "#000000",
  },
};

const colors = {
  baseColors,
  neutralColors,
  brandColors: {
    brand: baseColors.blue[6],
    background: baseColors.blue[1],
    hover: baseColors.blue[5],
    normal: baseColors.blue[6],
    click: baseColors.blue[7],
  },
  functionalColors: {
    link: baseColors.blue[6],
    success: baseColors.green[6],
    warning: baseColors.gold[6],
    error: baseColors.red[5],
  },
};

export default colors;
