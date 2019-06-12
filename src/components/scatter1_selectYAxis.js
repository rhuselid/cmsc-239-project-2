import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, ChartLabel, MarkSeries} from 'react-vis';

import {randomG} from '../utils'

export default class Scatter1_selectYAxis extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: null,
      yVar: 'subjectivity'
    };
  }

  render() {
    // references
    // https://github.com/uber/react-vis/blob/master/docs/xy-plot.md
    // https://github.com/uber/react-vis/blob/master/docs/mark-series.md

    const {yVar} = this.state;

    const {sampledData, sampleSize, totalSize} = this.props;
    const reformatedData = sampledData
      // jitter the points using randomG function and
      .map(row => ({x: Number(row.price), 
        y: (yVar === 'points') ? Number(row[yVar]) + randomG(5) : Number(row[yVar])}));
    
    const validYVvar = ['points', 'subjectivity', 'positivity'];

    const title = `${yVar} vs. price (randomly sample ${sampleSize} data from ${totalSize})`

    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
        <div className="buttons">
          {validYVvar.map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({yVar: key})}
            >{key}</button>);
          })}
        </div>
        <XYPlot
          width={600}
          height={600}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          xType='log'
          color='darkblue'
          size={3}
          opacity={0.1}>
          <MarkSeries
            className="scatter1"
            data={reformatedData}/>
          <XAxis tickFormat={v => v} tickValues={[10,20,30,40,50,100,200,300,400]}/>
          <YAxis/>
          <ChartLabel
            text={title}
            className="title"
            includeMargin={false}
            xPercent={0.5}
            yPercent={0.1}
            style={{
              textAnchor: 'middle',
              fontWeight: 10000
            }}/>
          <ChartLabel
            text="Price ($)"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.45}
            yPercent={1.225}/>
          <ChartLabel
            text={(yVar === 'points') ? 'points (jittered integer)' : yVar}
            className="alt-y-label"
            includeMargin={false}
            xPercent={-0.09}
            yPercent={0.5}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end',
              title: {fontSize: '20px'}
            }}/>
        </XYPlot>
      </div>
    );
  }
}
