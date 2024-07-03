import { Component } from "react";

import classnames from 'classnames';
import dayjs from "dayjs";

import Thead from "../Thead/thead";
import * as calendar from '../calendar'
import './tbody.css'

export default class Tbody extends Component {
  static defaultProps = {
    date: dayjs(),
    onChange: Function.prototype
  };

  state = {
    date: this.props.date,
    currentDate: dayjs(),
    selectedDates: []
  };

  get year() {
    return dayjs(this.props.date).year();
  }

  get month() {
    return dayjs(this.props.date).month();
  }

  get day() {
    return dayjs(this.props.date).date();
  }

  handleDayClick = date => {
    let selectedDates = [...this.state.selectedDates];
    const index = selectedDates.findIndex(d => calendar.areEqual(d, date));

    if (index === -1) {
      selectedDates.push(date);
    } else {
      selectedDates.splice(index, 1);
    }

    this.setState({ selectedDates });
    this.props.onChange(selectedDates);
  }


  render() {
    const { currentDate, selectedDates } = this.state;

    const mergedSelectedDates = [...selectedDates, ...this.props.selectedDates || []];

    const monthData = calendar.getMonthData(this.year, this.month);

    return (
      <table>
        <Thead />
        <tbody>
          {monthData.filter(week => week.some(date => date)).map((week, index) =>
            <tr key={index} className='week'>
              {week.map((date, index) => date ?
                <td
                  key={index}
                  className={classnames('day', {
                    'today': calendar.areEqual(date, currentDate),
                    'selected': mergedSelectedDates.some(d => calendar.areEqual(d, date))
                  })}
                  onClick={() => this.handleDayClick(date)}
                >
                  {date.date()}
                </td>
                :
                <td key={index}></td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}