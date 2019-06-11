import React, {Component} from 'react';

import {RadialChart, VerticalBarSeries, ChartLabel, Hint, XYPlot, XAxis, YAxis, DiscreteColorLegend} from 'react-vis';

export default class GroupedBar extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: null,
      country1: 'US',
      country2: 'Israel'
    };
  }

  render() {
    const {country1, country2, hoveredNode} = this.state;
    const {data} = this.props;
    const reformatedRow1 = data.filter(row => row.country === country1);
    const reformatedRow2 = data.filter(row => row.country === country2);
    const reformatedData1 = [];
    const reformatedData2 = [];
    const vals = ['sweet', 'spicy', 'dry', 'fruity', 'tannins']
    var yMax = 0;
    vals.forEach(val => {
      const rv1 = {};
      rv1['x'] = val;
      rv1['y'] = Number(reformatedRow1[0][val]) * 100;
      yMax = Math.max(rv1['y'], yMax)
      reformatedData1.push(rv1);
      // turns it from proportion into a percent
      const rv2 = {};
      rv2['x'] = val;
      rv2['y'] = Number(reformatedRow2[0][val]) * 100;
      yMax = Math.max(rv2['y'], yMax)
      reformatedData2.push(rv2);
    });
    const title = `Wines of ${country1} vs ${country2}`
    const establishedCountries = ['US', 'Italy', 'France', 'Portugal', 'Spain', 'Austria'];
    const randomCountries = ['Moldova', 'Lebanon', 'Israel', 'Argentina', 'Slovenia', 'Croatia'];
    // help on how to structure this aspect of code:
    // https://codepulse.blog/how-to-create-a-bar-chart-with-react/

    return (
      <div>
        <br />
        <i>Choice of Established Wine Producing Country</i>
        <br />
        {establishedCountries.map(key => {
        return (<button
          key={key}
          onClick={() => this.setState({country1: key})}
          >{key}</button>);
        })}
        <br />
        <br />
        <i>Choice of Unknown Wine Producing Country</i>
        <br />
        {randomCountries.map(key => {
        return (<button
          key={key}
          onClick={() => this.setState({country2: key})}
          >{key}</button>);
        })}
        <XYPlot
          xType="ordinal"
          width={500}
          height={500}
          yDomain={[0, Math.ceil(yMax/5)*5]}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          barWidth={0.8}
          fill={'purple'}
          onValueMouseOver={d => this.setState({hoveredNode: {'Percent of Wines': d.y}})}
        >
          <XAxis 
            style={{text:{stroke: 'none', fill: '#6b6b76', fontWeight: 900}}}
          />
          <YAxis
            position='middle' 
          />
          <VerticalBarSeries
            animation
            className="bar1"
            data={reformatedData1}
          />
          <VerticalBarSeries
            animation
            className="bar1"
            data={reformatedData2}
            fill={'blue'}
          />
          <DiscreteColorLegend
            title={['Legend']}
            items={[{title: `${country1}`, strokeWidth: 15}, {title: `${country2}`, strokeWidth: 15}]}
            colors={['purple', 'blue']}
            orientation='horizontal'
            width={100}
            height={60}
            />
          {hoveredNode !== null && <Hint value={hoveredNode} align={{vertical: 'top', horizontal: 'right'}}/>}

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
        </XYPlot>
      </div>
    );
  }
}
