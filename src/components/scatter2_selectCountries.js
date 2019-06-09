import React, {Component} from 'react';
import {shuffle} from '../utils'
import {XYPlot, XAxis, YAxis, ChartLabel, MarkSeries} from 'react-vis';

const validCountries = ["Italy", "US", "Australia", "Argentina", "France", "Spain", "Chile", "New Zealand", "Austria", "South Africa", "Portugal", "Germany"]
const selectedCountries = validCountries.reduce((acc, cur) => {
  acc[cur] = true;
  return acc
}, {})

export default class Scatter1_selectYAxis extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: null,
      selectedCountries: selectedCountries
    };
  }

  render() {
    // references
    // https://github.com/uber/react-vis/blob/master/docs/xy-plot.md
    // https://github.com/uber/react-vis/blob/master/docs/mark-series.md

    // const {hoveredNode} = this.state;
    const {selectedCountries} = this.state;
    console.log(selectedCountries)

    const {data, onClick} = this.props;
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
      .filter(row => selectedCountries[row.country])
      .map(row => ({x: Number(row.price), y: Number(row.points)}));
    const countrySize = reformatedData.length;

    // only shows contries with more than 1000 samples, or just the below line
    // const validCountries = [...new Set(sampledData.map(row => row.country))];
    // const countrySizesCount = subsetData.reduce((acc, cur) => {
    //   acc[cur.country] = acc[cur.country] ? acc[cur.country] + 1 : 1
    //   return acc
    // }, {})
    // const validCountries = Object.keys(countrySizesCount).filter(key => countrySizesCount[key] > 1000)
    // console.log(validCountries)

    const title = `points vs. price (${countrySize} data within ${sampleSize} randomly sample data from ${totalSize})`

    return (
      <div>
        {Object.keys(selectedCountries).map(key => {
        return (
          <div key={key} className="countries checkbox">
            <input
              type="checkbox"
              value={selectedCountries[key]}
              onClick={() => {
                selectedCountries[key] = !selectedCountries[key];
                this.setState({selectedCountries});
              }}/>
            {key}
          </div>);
        })}
        <XYPlot
          width={500}
          height={500}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          xType='log'
          color='darkgreen'
          size={3}
          opacity={0.1}>
          <MarkSeries
            className="scatter1"
            data={reformatedData}/>
          <XAxis 
            title="Price"/>
          <YAxis title="points"/>
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
