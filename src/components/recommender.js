import React, {Component} from 'react';
import Select from 'react-select';
import InputRange from 'react-input-range';
import {XYPlot, XAxis, YAxis, MarkSeries, Hint} from 'react-vis';

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
    const topWines = filteredWines.slice(0, 3).map(row => ({x: Number(row.price), y: Number(row.points), color: 'black', d: row}));
    console.log([this.state.value.min > 5 ? this.state.value.min - 5 : 0, this.state.value.max + 5]);
    console.log(topWines);
    return <div>
    <div className='filterContainer'>
    <div className='filters'>
    <Select options={this.state.countries}
      closeMenuOnSelect
      placeholder="Pick a country" 
      onChange={d => this.setState({selectedCountry: d.value})}/>
    </div>
    <div className='filters'>
    <Select options={this.state.regions}
      closeMenuOnSelect
      placeholder="Pick a region"
      onChange={d => this.setState({selectedRegion: d.value})}/>
    </div>
    <div className='filters'>
    <Select options={this.state.varieties}
      closeMenuOnSelect
      placeholder="Pick a variety"
      onChange={d => this.setState({selectedVariety: d.value})}/>
    </div>
    <div className='filters'>
    <InputRange 
      maxValue={350}
      minValue={0}
      step={1}
      value={this.state.value}
      onChange={value => this.setState({ value })} />
    </div>
    </div>
    <XYPlot
      width={500}
      height={500}
      margin={{left: 50, right: 0, top: 50, bottom: 50}}
      size={5}
      xDomain={[this.state.value.min > 5 ? this.state.value.min - 5 : 0, this.state.value.max + 5]}
      yDomain={[0, 100]}>
      <MarkSeries
        className="topWines"
        data={topWines}
        onValueMouseOver={val => this.setState({tooltipVal: val})}
        onValueMouseOut={() => this.setState({tooltipVal: null})}/>
      {this.state.tooltipVal ? <Hint value={this.state.tooltipVal}>
        <a href={`https://www.google.com/search?q=${this.state.tooltipVal.d.title}`}
          rel="noopener noreferrer" target="_blank">
          {this.state.tooltipVal.d.title}</a>
        <p>Price: ${this.state.tooltipVal.d.price}</p>
        <p>Points: {this.state.tooltipVal.d.points}</p>
        <p>Description: {this.state.tooltipVal.d.description}</p>
        </Hint> : null}
      <XAxis />
      <YAxis />
    </XYPlot>
    </div>
  }
}


