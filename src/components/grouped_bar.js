import React, {Component} from 'react';

import {RadialChart, VerticalBarSeries, ChartLabel, Hint, XYPlot, XAxis, YAxis, DiscreteColorLegend} from 'react-vis';

export default class GroupedBar extends Component {
  constructor() {
    super();
    this.state = {
      hoveredNode: false,
      country1: 'US',
      country2: 'Israel',
      choosen: false
    };
  }

  render() {
    const {country1, country2, hoveredNode, choosen} = this.state;
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
    const title = `Wines of ${country1} vs Wines of ${country2}`
    const establishedCountries = ['US', 'Italy', 'France', 'Portugal', 'Spain', 'Austria'];
    const randomCountries = ['Moldova', 'Lebanon', 'Israel', 'Argentina', 'Slovenia', 'Croatia'];
    const mouse = {x: null, y: null};
    // help on how to structure this aspect of code:
    // https://codepulse.blog/how-to-create-a-bar-chart-with-react/
    return (
      <div>
        {/* help from: https://stackoverflow.com/questions/42125775/reactjs-react-router-how-to-center-div
        style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '500vh'}} */}
        <br />
        <div style={{display: 'flex',  flexDirection: 'row', 
                    justifyContent:'center', alignItems:'center', height: '1vh'}}>
          <i>Choice of Established Wine Producing Country</i>
        </div>
        <br />
        <div style={{display: 'flex',  flexDirection: 'row', 
                    justifyContent:'center', alignItems:'center', height: '1vh'}}>
          {establishedCountries.map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({country1: key})}
            >{key}</button>);
          })}
        </div>
        <br />
        <br />
        <div style={{display: 'flex',  flexDirection: 'row', 
                    justifyContent:'center', alignItems:'center', height: '1vh'}}>
          <i>Choice of Unknown Wine Producing Country</i>
        </div>
        <br />
        <div style={{display: 'flex',  flexDirection: 'row', 
                    justifyContent:'center', alignItems:'center', height: '1vh'}}>
        {randomCountries.map(key => {
        return (<button
          key={key}
          onClick={() => this.setState({country2: key})}
          >{key}</button>);
        })}
        </div>
        <br />
        <div style={{display: 'flex',  flexDirection: 'column', 
                    justifyContent:'center', alignItems:'center', height: '79vh'}}>
        <DiscreteColorLegend
          className='center'
          title={['Legend']}
          items={[{title: `${country1}`, strokeWidth: 12}, {title: `${country2}`, strokeWidth: 12}]}
          colors={['purple', 'blue']}
          orientation='horizontal'
          width={(country1.length + country2.length) * 6 + 40}
          height={50}
        />
      {/*<h2 style={{"textAlign":"center"}}> Title </h2>*/}
        <XYPlot
          xType="ordinal"
          width={550}
          height={550}
          yDomain={[0, Math.ceil(yMax/5)*5]}
          margin={{left: 50, right: 0, top: 50, bottom: 50}}
          barWidth={0.8}
          fill={'purple'}
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
            onValueMouseOver={v => {
              this.setState({choosen: 1})
              this.setState({hoveredNode: v})}}
            onSeriesMouseOut={v => this.setState({hoveredNode: false})}
            // onValueMouseOver={event => {
            //     // const i = {'taste': `Percent of ${event.x} Wines`}
            //     this.setState({hoveredNode: {'Choosen Country': country1,
            //                                   'Percent of Wines': `${event.y.toFixed(1)}%`}})}}
            // onValueMouseOver={v => event => {
            //   const rv = v;
            //   rv['Choosen Country'] = country1
            //   choosen = 1;
            //   this.setState({hoveredNode: rv})}}
            // onSeriesMouseOut={v => this.setState({hoveredNode: false})}
          />
          <VerticalBarSeries
            animation
            className="bar1"
            data={reformatedData2}
            fill={'blue'}
            // onValueMouseOver={event => {
            //   this.setState({hoveredNode: {'Choosen Country': country2,
            //                                 'Percent of Wines': `${event.y.toFixed(1)}%`}})
            // }}
            onValueMouseOver={v => {
              this.setState({choosen: 2})
              this.setState({hoveredNode: v})}}
            onSeriesMouseOut={v => this.setState({hoveredNode: false})}
          />
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
            yPercent={1.2}
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
          {hoveredNode !== false && <Hint value={hoveredNode}>
            <div style={{background: 'black'}}>
              <h3>{choosen === 1 ? country1 : country2}</h3>
              <p>{`Percent of Wines: ${hoveredNode.y.toFixed(1)}%`}</p>
            </div>
          </Hint>}
        </XYPlot>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
