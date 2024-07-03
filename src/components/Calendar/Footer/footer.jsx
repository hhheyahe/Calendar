import React, { Component } from "react";
import dayjs from "dayjs";

export default class Footer extends Component {
  static defaultProps = {
    date: dayjs(),
    onChange: Function.prototype,
    active: false,
    setActive: () => { }
  };

  state = {
    date: this.props.date,
    currentDate: dayjs(),
    selectedDates: this.props.selectedDates
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

  handleTodayButtonClick = () => {
    const today = dayjs();
    this.setState({
      date: today,
      selectedDates: [today]
    }, () => {
      this.props.onChange([today]);
    });
    
  }

  handleYesterdayButtonClick = () => {
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    this.setState({
      date: yesterday,
      selectedDates: [yesterday]
    }, () => {
      this.props.onChange([yesterday]);
    });
    
  }

  handleWeekButtonClick = () => {
    const selectedDates = [];

    for (let i = 0; i <= 7; i++) {
      selectedDates.push(this.state.date.subtract(i, 'day'));
    }

    this.setState({ selectedDates }, () => {
      this.props.onChange(selectedDates);
    });
  }

  handleMonthButtonClick = () => {
    const selectedDates = [];

    const firstDayOfMonth = this.state.date.startOf('month');

    const lastDayOfMonth = this.state.date.endOf('month');

    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day = day.add(1, 'day')) {
      selectedDates.push(day);
    }

    this.setState({ selectedDates }, () => {
      this.props.onChange(selectedDates);
    });
  }


  render() {
    return (
      <footer>
        <button onClick={this.handleTodayButtonClick}>Сегодня</button>
        <button onClick={this.handleYesterdayButtonClick}>Вчера</button>
        <button onClick={this.handleWeekButtonClick}>Прошлая неделя</button>
        <button onClick={this.handleMonthButtonClick}>Месяц</button>
      </footer>
    )
  }
}