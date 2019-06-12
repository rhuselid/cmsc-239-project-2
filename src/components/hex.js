import React, {Component} from 'react';

import {RadialChart, HexbinSeries, ChartLabel, Hint, XYPlot, XAxis, YAxis} from 'react-vis';

export default class HexChart extends Component {
  constructor(props) {
    super(props);
    const posData = props.data.filter(row => row.positivity > -0.08 && row.positivity < 0.48);
    const realData = posData.filter(row => row.subjectivity > 0.22 && row.subjectivity < 0.79);
    this.state = {
      hoveredNode: null,
      essay: false,
      reformatedData: realData
    };
  }

  render() {
    const {hoveredNode, essay, reformatedData} = this.state;

    // much of the structure of this code comes from the react vis documentation:
    // https://github.com/uber/react-vis/blob/master/docs/hexbin-series.md
    return (
      <div style={{display: 'flex',  flexDirection: 'column', 
                    justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <XYPlot 
          xDomain={[-0.1, 0.5]}
          yDomain={[0.2, 0.8]}
          width={600}
          height={600}
          margin={{left: 70, right: 0, top: 60, bottom: 70}}
          getX={d => d.positivity}
          getY={d => d.subjectivity}
          onMouseLeave={event => {
            this.setState({essay: false})
            this.setState({hoveredNode: null})
          }}
        >
          <XAxis/>
          <YAxis/>
          <HexbinSeries
            animation
            className="hexbin-example"
            onValueMouseOver={v => {
              this.setState({hoveredNode: v})
              this.setState({essay: '"' + v[0].description + '"'})
            }}

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
            yPercent={1.2}
          />
          <ChartLabel
            text="Subjectivity"
            className="alt-y-label"
            includeMargin={false}
            xPercent={-0.085}
            yPercent={0.5}
            style={{
              transform: 'rotate(-90)',
              textAnchor: 'end',
              title: {fontSize: '20px'}
            }}
          />
        {/* help on this from: https://github.com/uber/react-vis/blob/master/showcase/plot/hex-heatmap.js*/}
          {hoveredNode && <Hint
            xType="literal"
            yType="literal"
            getX={d => d.x}
            getY={d => d.y}
            value={{
              x: hoveredNode.x,
              y: hoveredNode.y,
              value: hoveredNode.length
            }}>
            <div style={{background: 'black'}}>
              <b>{'Number of Wines'}</b>
              <p>{hoveredNode.length}</p>
            </div>
          </Hint>}
        </XYPlot>
        <h3>Sample Review</h3>
        <p style={{color:"blue"}}>{essay !== false ? essay : ''}</p>
      </div>
    );
  }
}
