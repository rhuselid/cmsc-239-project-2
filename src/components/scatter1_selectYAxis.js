import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, ChartLabel, MarkSeries} from 'react-vis';

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
      .map(row => ({x: Number(row.price), y: Number(row[yVar])}));
    
    const validYVvar = ['points', 'subjectivity', 'positivity'];

    const title = `${yVar} vs. price (randomly sample ${sampleSize} data from ${totalSize})`

    return (
      <div>
        {validYVvar.map(key => {
        return (<button
          key={key}
          onClick={() => this.setState({yVar: key})}
          >{key}</button>);
        })}
        <XYPlot
          width={500}
          height={500}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          xType='log'
          color='darkblue'
          size={3}
          opacity={0.1}>
          <MarkSeries
            className="scatter1"
            data={reformatedData}/>
          <XAxis/>
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
            text="Price"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.45}
            yPercent={1.225}/>
          <ChartLabel
            text={yVar}
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
