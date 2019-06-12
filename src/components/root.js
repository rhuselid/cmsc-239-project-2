import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import Scatter1_selectYAxis from './scatter1_selectYAxis';
import Scatter2_selectCountries from './scatter2_selectCountries';
import HexChart from './hex';
import Recommender from './recommender';
import GroupedBar from './grouped_bar';

import {shuffle} from '../utils'

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
    csv('data/countrys_grouped_by_taste.csv'),
    csv('data/df_with_titles.csv')])
      .then(data => {

        // data manipulations here
        const totalSize = data[1].length;
        const sampleSize = 5000;
        // randomly sample data df_with_country_groups, according to the value above and remove those prices are 0, can't has 0 in log scale, or either use padding
        const subsetData = data[1].filter(row => row.price > 0);
        const sampledData = shuffle(subsetData).slice(0, sampleSize);
        const subsetData2 = data[3].filter(row => row.price > 0);
        const sampledData2 = shuffle(subsetData2).slice(0, sampleSize);

        this.setState({
          data,
          sampledData,
          sampledData2,
          totalSize,
          sampleSize,
          loading: false
        });
      });
  }

  render() {
    const {loading, data, sampledData, sampledData2, totalSize, sampleSize} = this.state;
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
        <Scatter1_selectYAxis sampledData={sampledData} sampleSize={sampleSize} totalSize={totalSize}/>
        <div>{longBlock}</div>
        <Scatter2_selectCountries sampledData={sampledData} sampleSize={sampleSize} totalSize={totalSize}/>

        <div>{longBlock}</div>
        <HexChart data={sampledData.slice(0, 5000)}/>
        <br />
        <br />
        <br />
        <div>{longBlock}</div>
        <div>{longBlock}</div>
        <GroupedBar data={data[2]} />
        <Recommender data={sampledData2}/>
        
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
