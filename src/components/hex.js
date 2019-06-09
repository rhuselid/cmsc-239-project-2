import React, {Component} from 'react';

import {RadialChart, HexbinSeries, Hint, XYPlot, XAxis, YAxis} from 'react-vis';

export default class HexChart extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: null,
    };
  }

  render() {
    const {hoveredNode} = this.state;
    const {data} = this.props;
    // much of the structure of this code comes from the react vis documentation:
    // https://github.com/uber/react-vis/blob/master/docs/hexbin-series.md
    return (
      <XYPlot 
        xDomain={[-0.05, 0.45]}
        yDomain={[0.25, 0.75]}
        width={500}
        height={500}
        margin={{left: 20, right: 0, top: 0, bottom: 20}}
        getX={d => d.positivity}
        getY={d => d.subjectivity}
        onMouseLeave={() => this.setState({hoveredNode: null})}>
        <XAxis title='Positivity' />
        <YAxis title='Subjectivity' />
        <HexbinSeries
          animation
          className="hexbin-example"
          onValueMouseOver={d => this.setState({hoveredNode: d})}
          colorRange={['white', 'blue']}
          radius={13}
          data={data}
        />
        { /* {hoveredNode !== false && <Hint hoveredNode={hoveredNode} />} */ }
      </XYPlot>
    );
  }
}
