import React, { Fragment, Component } from 'react';

import Graph from './Graph';
import Bar from './Bar';
import Select from './Select';
import ghost from './ghost';
import current from './current';
import { ghostAvg, currentAvg } from './avg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.selection = this.selection.bind(this);
    this.triggerAnimation = this.triggerAnimation.bind(this);

    this.state = {
      graphType: 'points',
      animateStyles: {},
      scrolled: 0,
    };
  }

  componentDidMount() {
    window.setTimeout(this.triggerAnimation, 300);
  }

  selection(e) {
    this.setState({ graphType: e.target.value });
  }

  triggerAnimation() {
    const currentDistance =
      current.map(x => x.points).filter(x => x !== 'NA').length * 40 -
      document.body.getBoundingClientRect().width / 2;
    // this.setState({
    //   animateStyles: {
    //     transition: 'ease-in-out 1.5s',
    //     transform: `translateX(-${currentDistance}px)`,
    //   },
    // });
  }

  render() {
    const width = 82 * 40;
    const max =
      Math.max(
        ...ghost
          .concat(current)
          .map(x => x[this.state.graphType])
          .filter(x => x !== 'NA')
      ) + 10;

    const VERTSCALE = 5;
    const maxScaled = max * VERTSCALE;
    const segmentScale = 10 * VERTSCALE;
    const segments = [
      ...Array(Math.ceil(maxScaled / segmentScale)).keys(),
    ].map(x =>
      <line
        key={x}
        strokeWidth="1"
        stroke="white"
        x1="2"
        x2={width}
        y1={x === 0 ? maxScaled : maxScaled - x * segmentScale}
        y2={x === 0 ? maxScaled : maxScaled - x * segmentScale}
      />
    );
    const textHeaderStyles = {
      color: '#0068B8',
      fontWeight: '700',
      fontSize: '24px',
      lineHeight: '1',
      margin: '0',
      marginBottom: '0.5rem',
    };
    return (
      <Fragment>
        <div
          ref={ref => (this.scrollable = ref)}
          style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch' }}
        >
          <Select changed={this.selection} />
          <p>{this.state.graphType} Per Game Avg</p>
          <svg
            style={this.state.animateStyles}
            height={max * VERTSCALE + 50}
            width={width}
            version="1.1"
          >
            {segments}
            <line
              strokeWidth="1"
              stroke="white"
              x1="2"
              x2="2"
              y1="0"
              y2={maxScaled}
            />
            <Graph
              max={maxScaled}
              type={this.state.graphType}
              data={ghost}
              ghost={true}
            />
            <Graph
              max={maxScaled}
              type={this.state.graphType}
              data={current}
              ghost={false}
            />
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p style={textHeaderStyles}>TS (True shooting percentage)</p>
            <Bar ghost={ghostAvg} current={currentAvg} type="TS" />
          </div>

          <div>
            <p style={textHeaderStyles}>PER (Player Efficency Rating)</p>
            <Bar ghost={ghostAvg} current={currentAvg} type="PER" />
          </div>

          <div>
            <p style={textHeaderStyles}>WS (Win Shares)</p>
            <Bar ghost={ghostAvg} current={currentAvg} type="WS" />
          </div>
        </div>
      </Fragment>
    );
  }
}
