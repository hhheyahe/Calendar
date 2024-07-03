import React from 'react';
import classnames from 'classnames'
import dayjs from 'dayjs'

import * as calendar from './calendar'

import './index.css';

import Header from './Header/header';
import Tbody from '../Tbody/tbody';
import Footer from './Footer/footer';

export default class Calendar extends React.Component {
  static defaultProps = {
    date: dayjs(),
    onChange: Function.prototype,
    active: false,
    setActive: () => { }
  };

  state = {
    date: this.props.date,
    currentDate: dayjs(),
    selectedDates: []
  };

  get year() {
    return this.state.date.year();
  }

  get month() {
    return this.state.date.month();
  }

  get day() {
    return this.state.date.date();
  }

  handleDateChange = (date, selectedDates) => {
    this.setState({ date, selectedDates });
  }

  handleFooterChange = (dates) => {
    this.setState({ selectedDates: dates });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) {
      this.setState({
        selectedDates: []
      })
    }
  }

  render() {
    return (
      <div
        className={this.props.active ? 'modal active' : 'modal'}
        onClick={() => this.props.setActive(false)}
      >
        <div
          className={this.props.active ? 'calendar active' : 'calendar'}
          onClick={(e) => e.stopPropagation()}
        >
          <Header onChange={this.handleDateChange} />
          <Tbody
            date={this.state.date}
            selectedDates={this.state.selectedDates}
            onChange={this.handleFooterChange}
          />
          <Footer
            date={this.state.date}
            onChange={this.handleFooterChange}
            selectedDates={this.state.selectedDates}
          />
        </div>
      </div>
    );
  }
}