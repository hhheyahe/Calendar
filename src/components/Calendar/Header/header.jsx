import React, { Component } from 'react';
import dayjs from 'dayjs';

import './header.css';

class Header extends Component {
  static defaultProps = {
    date: dayjs(),
    years: Array.from({ length: dayjs().year() - 2000 + 1 }, (_, i) => 2000 + i),
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    onChange: Function.prototype
  }

  state = {
    date: this.props.date
  };

  handlePrevMonthButtonClick = () => {
    const date = this.state.date.subtract(1, 'month');
    this.setState({ date }, () => {
      this.props.onChange(this.state.date);
    });
  };

  handleNextMonthButtonClick = () => {
    const date = this.state.date.add(1, 'month');
    this.setState({ date }, () => {
      this.props.onChange(this.state.date);
    });
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;

    const date = dayjs().year(year).month(month).date(1);

    this.setState({ date }, () => {
      this.props.onChange(this.state.date);
    });
  };


  render() {
    const { years, monthNames } = this.props;

    return (
      <header>
        <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>

        <select
          ref={element => this.monthSelect = element}
          value={this.state.date.month()}
          onChange={this.handleSelectChange}
        >
          {monthNames.map((name, index) =>
            <option key={name} value={index}>{name}</option>
          )}
        </select>

        <select
          ref={element => this.yearSelect = element}
          value={this.state.date.year()}
          onChange={this.handleSelectChange}
        >
          {years.map(year =>
            <option key={year} value={year}>{year}</option>
          )}
        </select>

        <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
      </header>
    )
  }
}

export default Header;