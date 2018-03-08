import React, { Fragment } from 'react';
import colorMap from './colorMap';

const determineWidth = (props, target) => {
  if (props.type === 'TS') {
    // true shooting is a percentage so 100 makes sense
    return `${props[target]['TS'] * 100}%`;
  } else if (props.type === 'PER') {
    // highest PER ever is ~32 by WILT
    return `${props[target]['PER'] * 3}%`;
  } else if (props.type === 'WS') {
    // highest WS is by Kareem at with .339
    return `${props[target]['WS'] / 0.339 * 100}%`;
  }
};

const returnUnit = props => {
  if (props.type === 'TS') {
    return '100%';
  } else if (props.type === 'PER') {
    return 32;
  } else if (props.type === 'WS') {
    return 25;
  }
};

const returnStat = (stat, type) => {
  const rules = {
    TS: `${parseFloat(stat).toFixed(2)}%`,
    PER: parseFloat(stat).toFixed(2),
    WS: stat,
  };
  return rules[type];
};

const Bar = props => {
  const ghost = props.type === 'TS'
    ? props.ghost[props.type] * 100
    : props.ghost[props.type];
  const current = props.type === 'TS'
    ? props.current[props.type] * 100
    : props.current[props.type];

  return (
    <svg height="140" width="100%" version="1.1">
      <rect
        fill={colorMap[props.selected].rectempty}
        x="0"
        y="10"
        width="100%"
        height="42"
        rx="20"
      />
      <rect
        fill={colorMap['ghost'].rect}
        x="0"
        y="10"
        width={determineWidth(props, 'ghost')}
        height="42"
        rx="20"
      />
      <text x="10" y="36" fill={colorMap[props.selected].shapetext}>
        {returnStat(ghost, props.type)}
      </text>
      <rect
        fill={colorMap[props.selected].rectempty}
        x="0"
        y="60"
        width="100%"
        height="42"
        rx="20"
      />
      <rect
        fill={colorMap[props.selected].rect}
        x="0"
        y="60"
        width={determineWidth(props, 'current')}
        height="42"
        rx="20"
      />
      <text x="10" y="86" fill={colorMap[props.selected].shapetext}>
        {returnStat(current, props.type)}
      </text>
      <text x="88%" y="100%" fill="white">
        {returnUnit(props)}
      </text>
    </svg>
  );
};

export default Bar;
