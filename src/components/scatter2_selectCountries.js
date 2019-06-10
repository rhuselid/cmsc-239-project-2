import React, {Component} from 'react';
import {shuffle} from '../utils'
import {XYPlot, XAxis, YAxis, ChartLabel, MarkSeries} from 'react-vis';

// this is resulting from the commented lines under render(), which select countries with >1000 samples, should have a more elegant way doing it
const validCountries = ["Italy", "US", "Australia", "Argentina", "France", "Spain", "Chile", "New Zealand", "Austria", "South Africa", "Portugal", "Germany"]
const selectedCountries = validCountries.reduce((acc, cur) => {
  acc[cur] = true;
  return acc
}, {})

// edited from colorBrewer, not ideal http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=12
const colorPalatte = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#dcd304','#b15928']

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

    const {selectedCountries} = this.state;

    const {data, onClick} = this.props;
    const totalSize = data.length;
    const subsetData = data
      // remove those prices are 0, can't has 0 in log scale, or either use padding
      .filter(row => row.price > 0)
      // uncomment below lines to filter the same way as Robbie's
      // .filter(row => row.positivity > -0.075 && row.positivity < 0.475)
      // .filter(row => row.subjectivity > 0.225 && row.subjectivity < 0.775)
    // randomly sample data, change the value below or pass data directly to reformatedData
    // I set scatter plot 1 samples size = 10000 with opacity = 0.1, but use 1000 and 0.5 here because there are 12 categories (countries), a little confusing
    const sampleSize = 1000;
    const sampledData = shuffle(subsetData).slice(0, sampleSize);
    const reformatedData = sampledData
      .filter(row => selectedCountries[row.country])
      .map(row => ({x: Number(row.price), y: Number(row.points), color: row.country}));
    const countrySize = reformatedData.length;

    // only shows contries with more than 1000 samples, or just the below line
    // const validCountries = [...new Set(sampledData.map(row => row.country))];
    // const countrySizesCount = subsetData.reduce((acc, cur) => {
    //   acc[cur.country] = acc[cur.country] ? acc[cur.country] + 1 : 1
    //   return acc
    // }, {})
    // const validCountries = Object.keys(countrySizesCount).filter(key => countrySizesCount[key] > 1000)

    const title = `points vs. price (${countrySize} data within ${sampleSize} randomly sample data from ${totalSize})`

    return (
      <div>
        <div className="checkbox">
          {Object.keys(selectedCountries).map((key, idx) => {
            return (
              <div key={key} className="countries checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  onClick={() => {
                    selectedCountries[key] = !selectedCountries[key];
                    this.setState({selectedCountries});
                  }}/>
                <span style={{borderBottom: `3px solid ${colorPalatte[idx]}`}}>{key}</span>
              </div>);
          })}
        </div>
        <XYPlot
          width={500}
          height={500}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          xType='log'
          colorType="category"
          colorDomain={validCountries}
          colorRange={colorPalatte}
          size={3}
          opacity={0.5}>
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
