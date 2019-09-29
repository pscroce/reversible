import React, { Component } from 'react';
import Select from 'react-select';
import ReactGA from 'react-ga';
import countryList from 'react-select-country-list';

import Navigation from '../layout/Navigation';
import '../../App.css';

import carbonFootprintsData from '../../data/carbon-footprints.json';
const countryOptions = countryList().getData()

class Calculator extends Component {
  state = {
    countryValue:  {
       "value": "US",
       "label": "United States",
       "carbonFootprint": "16.50283724",
       "countryCodeThreeDigit": "USA"
     },
  }
  // Decided to just put all the data in one file for simplicity instead of doing this.
  // getCountryCarbonFootprint = () => {
  //   let countryCarbonFootprint = carbonFootprintsData.filter(footprint => footprint.countryCode === this.state.countryValue.value);
  //   return countryCarbonFootprint;
  // }
  handlecountryChange = countryValue => {
    this.setState({ countryValue });
  }

  render() {
    ReactGA.initialize('UA-148187805-1');
    ReactGA.pageview('/calculator');
    const { countryValue } = this.state;
    const { countryCarbonFootprint } = this.state;

    // Took this syntax from here: https://react-select.com/styles
    const selectTheme = theme => ({
      ...theme,
      // borderRadius: 0,
      colors: {
      ...theme.colors,
        // primary25: '#e5e5e5',
        // primary: '#c5c5c5',
      },
    });

    return (
      <div className="Calculator">

      <Navigation />

        <div className="main-section">
          {countryValue.label}
          <h1>Your carbon footprint is <b>{parseFloat(countryValue.carbonFootprint).toFixed(2)}</b> tonnes of greenhouse gasses per year.</h1>

          <div className="input-group">
            <Select
              defaultValue= {{"value": "US", "label": "United States"}}
              value={this.state.countryValue}
              onChange={this.handlecountryChange}
              options={carbonFootprintsData}
              theme={selectTheme}
              clearable={false}
              backspaceRemovesValue={false}
              deleteRemoves={false}
            />
          </div>

          <p>If you live in {countryValue.label.indexOf('United') > -1 ? "the " + countryValue.label : countryValue.label}, your carbon footprint is about {parseFloat(countryValue.carbonFootprint).toFixed(2)} tonnes of carbon dioxide equivalent greenhouse gasses per year. This estimate is based on World Bank data which was most recently published in 2014. <a href="https://databank.worldbank.org/reports.aspx?source=2&series=EN.ATM.CO2E.PC&country=#" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>

        </div>

      </div>
    );
  }
}

export default Calculator;
