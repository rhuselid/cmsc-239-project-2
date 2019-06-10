import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import Scatter1_selectYAxis from './scatter1_selectYAxis';
import Scatter2_selectCountries from './scatter2_selectCountries';
import HexChart from './hex';
import CountryBars from './country_bar_charts';
import CountryBar2 from './country_bar2';

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const space = `
<br>                                                                              
Space intentionally left blank
<br>
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    Promise.all([
    csv('data/sample-data.csv'),
    csv('data/df_with_country_groups.csv'),
    csv('data/countrys_grouped_by_taste.csv')])
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> Hello Explainable!</h1>

        {/* comment out the example code
        <div>{`The example data was loaded! There are ${data.length} rows`}</div>
        <ExampleChart data={data}/>
        <div>{longBlock}</div>
        <ExampleChart data={data}/>
        */}

        <div>{longBlock}</div>
        <Scatter1_selectYAxis data={data[1]}/>
        <div>{longBlock}</div>
        <Scatter2_selectCountries data={data[1]}/>

        <div>{longBlock}</div>
        <HexChart data={data[1].slice(0, 10000)}/>
        <br />
        <br />
        <br />
        <div>{longBlock}</div>
        <CountryBars data={data[2]}/>
        <CountryBar2 data={data[2]}/>
        
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
