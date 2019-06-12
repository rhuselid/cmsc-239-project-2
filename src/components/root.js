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
          subsetData2,
          sampledData,
          sampledData2,
          totalSize,
          sampleSize,
          loading: false
        });
      });
  }

  render() {
    const {loading, data, subsetData2, sampledData, sampledData2, totalSize, sampleSize} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <div className="article-title">
        <h1> How to Choose a Good Wine</h1>
        </div>

        {/* comment out the example code
        <div>{`The example data was loaded! There are ${data.length} rows`}</div>
        <ExampleChart data={data}/>
        <div>{longBlock}</div>
        <ExampleChart data={data}/>
        */}

        <div className="article">
          <p>Choosing a good wine can be a daunting task. There are hundreds of different grape varieties, a plethora of lauded vineyard regions, and all sorts of fancy vocabulary to parse through on a wine label. We set out to determine if we could find any strong indicators that could suggest a good wine and would make a trip to the wine section a quick and simple task. Using a dataset of wine reviews, we evaluated different variables and compared them to their numerical scores, under the assumption that the relevant wine reviewers were reliable sources.</p>
          <p>We started with what we felt was one of the most obvious indicators: price. Connoisseurs are often willing to shell out hundreds or even thousands of dollars for a special bottle, surely there must be a good reason. Could there be a price threshold at which wine is of reliably higher quality? But of course, if we’re going to devote so much cash to a drink, we want to see for ourselves that the data supports our decision.</p>
        </div>
        <Scatter1_selectYAxis sampledData={sampledData} sampleSize={sampleSize} totalSize={totalSize}/>
        <div className="article">
          <p>The above graph plots price as compared to a few different variables: points, subjectivity, and positivity. The points are scores out of 100, and the subjectivity and positivity values come from a text sentiment analysis that we performed on the wine reviews using a python library called WordBlob. If we compare price and points, we see that there seems to be a positive correlation – wines that cost more tend to score higher. However, when comparing price and positivity, we don’t see much of a trend. Perhaps reviewers feel inclined to give more expensive wines a higher score, to justify the money they spent?</p>
          <p>The above results prompt a question: could positivity be a more reliable indicator than a numerical score? From our text sentiment analysis, we decided to investigate the relationship between subjectivity and positivity. We found a reasonably strong correlation: reviewers tended to be more subjective about wines they enjoyed, possibly casting doubt on the usefulness of their reviews.</p>
          <p>For reference, the Natural Language Processing tool we used produced subjectivity scores between 0 and 1 and positivity scores between -1 and 1. We display a portion of those ranges wherein most of the the reviews fall.</p>
          <p>Feel free to explore how the reviews differ in tone along the axes review positivity and subjectivity by mousing over different hexes on the chart.</p>
        </div>
        <HexChart data={sampledData.slice(0, 5000)}/>
        <div className="article">
          <p>We next decided to investigate different wine regions, thinking that some nations might have better climates and resources or might just be more skilled in wine production. Lots of people vacation in the famous vineyards of France and Italy, could their wines be the ultimate gold standard? Below is another scatterplot comparing price and points – we invite you to try out different countries and compare their scores.</p>
        </div>
        <Scatter2_selectCountries sampledData={sampledData} sampleSize={sampleSize} totalSize={totalSize}/>
        <div className="article">
          <p>As you can see, there does not seem to be one country that outshines the others. Moreover, the wines of each country display a fundamental relationship: the more expensive, the better (at least in the wine reviewers’ eyes).</p>
          <p>Something else we were interested in was the types of wines that different countries produce, thinking that a country that produces a lot of fruity wines may be quite good at it. We have another exploratory chart, in which you can compare the outputs of different countries. As you can see, the taste of wine varied greatly between countries. Some countries produce disproportionately dry wines like the United States, while others are disproportionately sweet like those of Israel.</p>
          <p>Feel free to explore how the taste of wine differs between established, well-known wine producing countries like France and Italy as compared to lesser known producers like Moldova or Lebanon.</p>
        </div>
        <GroupedBar data={data[2]} />
        <div className="article">
          <p>Regardless of wine quality, we conclude that there is not a substantial overall difference in the taste of wines between established players in the wine world and those newer to the scene.</p>
          <p>In conclusion, we have failed to find a solid indicator of a wine’s goodness that is easy to quickly discern from a wine label. We still think that wine scores are reasonably trustworthy, but there are just so many good wines out there – how are you to choose? We believe that at the end of the day, the right wine for you is one that is a flavor you enjoy, perhaps one that comes from a region that you are interested in, and definitely one that sits comfortably in your price range. We leave you with our custom wine recommender. You can choose any combination of country, region, or variety that you are interested in and set a price range that you are willing to pay, and we’ll share some of the top-scoring wines that match your criteria. Mouse over for a link to the wine and its description, as well as the price and the score. Hopefully, this will provide you with a small and manageable set of choices that best suit your needs!</p>
        </div>
        <Recommender data={subsetData2}/>
        
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
