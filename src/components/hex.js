import React, {Component} from 'react';

import {RadialChart, HexbinSeries, ChartLabel, Hint, XYPlot, XAxis, YAxis} from 'react-vis';

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
    const posData = data.filter(row => row.positivity > -0.08 && row.positivity < 0.48);
    const reformatedData = posData.filter(row => row.subjectivity > 0.21 && row.subjectivity < 0.79);
    // getX={d => d.positivity > -0.01 ? d.positivity : d.positivity < 0.41 ? d.positivity : null}
    // getY={d => d.subjectivity > 0.29 ? d.subjectivity : d.subjectivity < 0.71 ? d.subjectivity : null}

    // much of the structure of this code comes from the react vis documentation:
    // https://github.com/uber/react-vis/blob/master/docs/hexbin-series.md
    return (
      <div>
        <XYPlot 
          xDomain={[-0.1, 0.5]}
          yDomain={[0.2, 0.8]}
          width={500}
          height={500}
          margin={{left: 55, right: 0, top: 50, bottom: 50}}
          getX={d => d.positivity}
          getY={d => d.subjectivity}
        >
          <XAxis/>
          <YAxis/>
          <HexbinSeries
            animation
            className="hexbin-example"
            onValueMouseOver={d => this.setState({hoveredNode: {'Number of Wines': d.length, 
                                                            'sample_review':d[0].description.slice(0,120) + '...'}})}
            onSeriesMouseOut={d => this.setState({hoveredNode: null})}
            colorRange={['white', 'blue']}
            radius={13}
            style={{
              stroke: '#125C77',
              strokeLinejoin: 'round',
              strokeOpacity: 0.1
            }}
            data={reformatedData}
          >
          { /* {hoveredNode !== false && <Hint hoveredNode={hoveredNode} />} 
            onValueMouseOut={v => this.setState({hoveredNode: null})}
            onValueMouseOver={d => this.setState({hoveredNode: {'Number of Wines': d.length}})}
            onSeriesMouseOut={v => this.setState({hoveredNode: null})}*/ }
          </HexbinSeries>
          {hoveredNode !== null && <Hint value={hoveredNode}/>}
        <ChartLabel
            text='Subjectivity vs Positivity'
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
            text="Positivity"
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.45}
            yPercent={1.225}
          />
          <ChartLabel
            text="Subjectivity"
            className="alt-y-label"
            includeMargin={false}
            xPercent={-0.09}
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
