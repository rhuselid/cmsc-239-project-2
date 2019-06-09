import React, {Component} from 'react';
import {shuffle} from '../utils'
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

    // const {hoveredNode} = this.state;
    const {yVar} = this.state;
    // console.log(yVar)

    const {data} = this.props;
    const totalSize = data.length;
    const subsetData = data
      // remove those prices are 0, can't has 0 in log scale, or either use padding
      .filter(row => row.price > 0)
      // uncomment below two lines to filter the same way as Robbie's
      // .filter(row => row.positivity > -0.075 && row.positivity < 0.475)
      // .filter(row => row.subjectivity > 0.225 && row.subjectivity < 0.775)
    // randomly sample data, change the value below or pass data directly to reformatedData
    const sampleSize = 10000;
    const sampledData = shuffle(subsetData).slice(0, sampleSize);
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
          <XAxis 
            title="Price"/>
          <YAxis title={yVar}/>
          <ChartLabel
            text={title}
            className="title"
            includeMargin={false}
            xPercent={0.5}
            yPercent={0.1}
            style={{
              textAnchor: 'middle',
              fontWeight: 10000
            }}
            />
        </XYPlot>
      </div>
    );
  }
}
