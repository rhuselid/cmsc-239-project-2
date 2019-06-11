import React, {Component} from 'react';

import {RadialChart, VerticalBarSeries, ChartLabel, Hint, XYPlot, XAxis, YAxis} from 'react-vis';

export default class CountryBar2 extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: null,
      country: 'Israel'
    };
  }

  render() {
    const {country} = this.state;
    const {data} = this.props;
    const reformatedRow = data.filter(row => row.country === country);
    const reformatedData = [];
    const vals = ['sweet', 'spicy', 'dry', 'fruity', 'tannins']
    vals.forEach(val => {
      const rv = {};
      rv['x'] = val;
      rv['y'] = Number(reformatedRow[0][val]) * 100;
      reformatedData.push(rv);
      // turns it from proportion into a percent
    });
    const validCountries = ['US', 'Italy', 'France', 'Moldova', 'Lebanon', 'Israel', 'Portugal', 'Argentina'];
    // help on how to structure this aspect of code:
    // https://codepulse.blog/how-to-create-a-bar-chart-with-react/
    const title = `Wines of ${country}`
    return (
      <div>
        {validCountries.map(key => {
        return (<button
          key={key}
          onClick={() => this.setState({country: key})}
          >{key}</button>);
        })}
        <XYPlot
          xType="ordinal"
          width={500}
          height={500}
          yDomain={[0, 35]}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          barWidth={0.8}
          fill={'blue'}
          >
          <XAxis
            style={{text:{stroke: 'none', fill: '#6b6b76', fontWeight: 900}}}/>
          <YAxis
            position='middle'/>
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
          <ChartLabel
            text="Wine Taste"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.45}
            yPercent={1.225}
          />
          <ChartLabel
            text="Percent of Wines"
            className="alt-y-label"
            includeMargin={false}
            xPercent={-0.075}
            yPercent={0.5}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end',
              title: {fontSize: '20px'}
            }}
          />
          <VerticalBarSeries
            animation
            className="bar2"
            data={reformatedData}
          />
        </XYPlot>
      </div>
    );
  }
}
