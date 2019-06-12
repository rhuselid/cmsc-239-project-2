import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, ChartLabel, MarkSeries} from 'react-vis';

import {randomG} from '../utils'

// this is resulting from the commented lines under render(), which select countries with >1000 samples, should have a more elegant way doing it
const validCountries = ["Italy", "US", "Australia", "Argentina", "France", "Spain", "Chile", "New Zealand", "Austria", "South Africa", "Portugal", "Germany"]
const defaultCheckedCountries = ['Italy', 'France']
const defaultSelectedCountries = validCountries.reduce((acc, cur) => {
  acc[cur] = (defaultCheckedCountries.indexOf(cur) !== -1) ? true : false;
  return acc
}, {})

// edited from colorBrewer, not super ideal http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=12
const colorPalatte = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#dcd304','#b15928']

export default class Scatter1_selectYAxis extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: null,
      selectedCountries: defaultSelectedCountries
    };
  }

  render() {
    // references
    // https://github.com/uber/react-vis/blob/master/docs/xy-plot.md
    // https://github.com/uber/react-vis/blob/master/docs/mark-series.md

    const {selectedCountries} = this.state;

    const {sampledData, sampleSize, totalSize, onClick} = this.props;
    const reformatedData = sampledData
      .filter(row => selectedCountries[row.country])
      // jitter the points using randomG function and
      .map(row => ({x: Number(row.price), y: Number(row.points)+ randomG(5), color: row.country}));
    // countrySize is smaller than sampleSize cuz some countries is not in the list due to their size is too small
    const countrySize = reformatedData.length;

    // fix axis range
    const xDomainRange = [Math.min(...sampledData.map(row => row.price)), Math.max(...sampledData.map(row => row.price))]
    const yDomainRange = [Math.min(...reformatedData.map(row => row.y)), Math.max(...reformatedData.map(row => row.y))]

    // only shows contries with more than 1000 samples, or just the below line
    // const validCountries = [...new Set(sampledData.map(row => row.country))];
    // const countrySizesCount = subsetData.reduce((acc, cur) => {
    //   acc[cur.country] = acc[cur.country] ? acc[cur.country] + 1 : 1
    //   return acc
    // }, {})
    // const validCountries = Object.keys(countrySizesCount).filter(key => countrySizesCount[key] > 1000)

    const title = `points vs. price (${countrySize} data within ${sampleSize} randomly sample data from ${totalSize})`

    return (
      <div class="flex-container" style={{display: "flex", alignItems: "center"}}>
        <XYPlot
          width={500}
          height={500}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          xType='log'
          colorType="category"
          colorDomain={validCountries}
          colorRange={colorPalatte}
          size={3}
          opacity={0.5}
          xDomain={xDomainRange}
          yDomain={yDomainRange}>
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
            text='points (jittered integer)'
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
        <div className="checkbox">
          {Object.keys(selectedCountries).map((key, idx) => {
            return (
              <div key={key} className="countries checkbox">
                <input
                  type="checkbox"
                  checked={selectedCountries[key] ? "true" : ""}
                  onClick={() => {
                    selectedCountries[key] = !selectedCountries[key];
                    this.setState({selectedCountries});
                  }}/>
                <label style={{borderBottom: `3px solid ${colorPalatte[idx]}`}}>{key}</label>
              </div>);
          })}
        </div>
      </div>
    );
  }
}
