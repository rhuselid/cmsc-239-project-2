import React, {Component} from 'react';
import Select from 'react-select';
import InputRange from 'react-input-range';
import {XYPlot, XAxis, YAxis, MarkSeries, ChartLabel, Hint} from 'react-vis';

export default class Recommender extends Component {
  constructor(props) {
    super(props);

    const countries = Array.from(new Set(this.props.data.map(row => row.country))).map(d => ({value: d, label: d}));
    const regions = Array.from(new Set(this.props.data.map(row => row.province))).map(d => ({value: d, label: d}));
    const varieties = Array.from(new Set(this.props.data.map(row => row.variety))).map(d => ({value: d, label: d}));
 
    this.state = {
      value: { min: 10, max: 100 },
      selectedCountry: null,
      selectedRegion: null,
      selectedVariety: null,
      countries,
      regions,
      varieties,
      tooltipVal: null
    };
  }

  render() {
    const sampledData = this.props.data;
    const filteredWines = sampledData
      .filter(row => this.state.selectedCountry ? row.country === this.state.selectedCountry : true)
      .filter(row => this.state.selectedRegion ? row.province === this.state.selectedRegion : true)
      .filter(row => this.state.selectedVariety ? row.variety === this.state.selectedVariety : true)
      .filter(row => row.price >= this.state.value.min)
      .filter(row => row.price <= this.state.value.max)
      .sort((a, b) => b.points - a.points);
    const topWines = filteredWines.slice(0, 5).map(row => ({x: Number(row.price), y: Number(row.points), color: 'black', d: row}));
    console.log([this.state.value.min > 5 ? this.state.value.min - 5 : 0, this.state.value.max + 5]);
    console.log(topWines);
    return <div>
    <div className='filterContainer'>
    <div className='filters'>
    <Select options={this.state.countries}
      closeMenuOnSelect
      isClearable
      placeholder="Pick a country" 
      onChange={d => this.setState({selectedCountry: d ? d.value : null})}/>
    </div>
    <div className='filters'>
    <Select options={this.state.regions}
      closeMenuOnSelect
      isClearable
      placeholder="Pick a region"
      onChange={d => this.setState({selectedRegion: d ? d.value : null})}/>
    </div>
    <div className='filters'>
    <Select options={this.state.varieties}
      closeMenuOnSelect
      isClearable
      placeholder="Pick a variety"
      onChange={d => this.setState({selectedVariety: d ? d.value : null})}/>
    </div>
    <div className='filters'>
    <InputRange 
      maxValue={500}
      minValue={0}
      step={1}
      formatLabel={(val, t) => `$${val}`}
      value={this.state.value}
      onChange={value => this.setState({ value })} />
    </div>
    </div>
    <div className='recommender-vis'>
    {topWines.length === 0 ? <p>Sorry, no wines match your criteria.</p> : null}
    <XYPlot
      width={500}
      height={500}
      margin={{left: 50, right: 0, top: 50, bottom: 50}}
      size={5}
      xDomain={[this.state.value.min > 5 ? this.state.value.min - 5 : 0, this.state.value.max + 5]}
      yDomain={[80, 100]}
      onMouseLeave={e => e.relatedTarget.classList.contains("winehint") ? null : this.setState({tooltipVal: null})}>
      <MarkSeries
        className="topWines"
        data={topWines}
        onValueMouseOver={val => this.setState({tooltipVal: val})}/>
      {this.state.tooltipVal ? <Hint value={this.state.tooltipVal} className="winehint">
        <a href={`https://www.google.com/search?q=${this.state.tooltipVal.d.title}`}
          rel="noopener noreferrer" target="_blank" style={{color: "yellow"}}>
          {this.state.tooltipVal.d.title}</a>
        <p>Price: ${this.state.tooltipVal.d.price}</p>
        <p>Points: {this.state.tooltipVal.d.points}</p>
        <p>Description: {this.state.tooltipVal.d.description}</p>
        </Hint> : null}
      <XAxis />
      <YAxis />
      <ChartLabel
        text="Price ($)"
        includeMargin={false}
        xPercent={0.45}
        yPercent={1.225}/>
      <ChartLabel
        text="Points"
        includeMargin={false}
        xPercent={-0.09}
        yPercent={0.6}
        style={{
          transform: 'rotate(-90)',
          textAnchor: 'end',
          title: {fontSize: '20px'}
        }}/>
    </XYPlot>
    </div>
    </div>
  }
}


