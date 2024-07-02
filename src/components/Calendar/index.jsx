import React from 'react';
import classnames from 'classnames'
import * as dayjs from 'dayjs'

import * as calendar from './calendar'

import './index.css';

export default class Calendar extends React.Component {
    static defaultProps = {
        // date: new Date(),
        date: dayjs(),
        years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        onChange: Function.prototype,
        active: false,
        setActive: () => {}
        // isOpen: false
    };

    state = {
        date: this.props.date,
        // currentDate: new Date(),
        currentDate: dayjs(),
        // selectedDate: null
        selectedDates: []
    };

    get year() {
        // return this.state.date.getFullYear();
        return this.state.date.year();
    }

    get month() {
        // return this.state.date.getMonth();
        return this.state.date.month();
    }

    get day() {
        // return this.state.date.getDate();
        return this.state.date.date();
    }

    handlePrevMonthButtonClick = () => {
        // const date = new Date(this.year, this.month - 1);
        const date = this.state.date.subtract(1, 'month');
        this.setState({ date });
    };

    handleNextMonthButtonClick = () => {
        // const date = new Date(this.year, this.month + 1);
        const date = this.state.date.add(1, 'month');
        this.setState({ date });
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;

        // const date = new Date(year, month);
        const date = dayjs().year(year).month(month).date(1);

        this.setState({ date });
    };

    handleDayClick = date => {
        // this.setState({ selectedDate: date});

        // this.props.onChange(date);

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

    handleTodayButtonClick = () => {
        // this.setState({
        //     date: this.state.date,
        //     selectedDates: [this.state.date]
        // });
        // this.props.onChange([this.state.date]);

        this.setState({
            date: dayjs(),
            selectedDates: [dayjs()]
        });
        this.props.onChange([dayjs()]);
    }

    handleYesterdayButtonClick = () => {
        const today = dayjs();
        const yesterday = today.subtract(1, 'day');

        this.setState({
            date: yesterday,
            selectedDates: [yesterday]
        });
        this.props.onChange([yesterday]);
    }

    handleWeekButtonClick = () => {
        const selectedDates = [];

        for (let i = 0; i <= 7; i++) {
            selectedDates.push(this.state.date.subtract(i, 'day'));
        }
        this.setState({ selectedDates });
        this.props.onChange(selectedDates);
    }

    handleMonthButtonClick = () => {
        // const selectedDates = [];

        // selectedDates.push(this.state.date('month'));

        // this.setState({ selectedDates });
        // this.props.onChange(selectedDates);

        const selectedDates = [];

        const firstDayOfMonth = this.state.date.startOf('month');

        const lastDayOfMonth = this.state.date.endOf('month');

        for (let day = firstDayOfMonth; day <= lastDayOfMonth; day = day.add(1, 'day')) {
            selectedDates.push(day);
        }

        this.setState({ selectedDates });
        this.props.onChange(selectedDates);
    }

    render() {
        const { years, monthNames, weekDayNames } = this.props;
        const { currentDate, selectedDate } = this.state;

        const monthData = calendar.getMonthData(this.year, this.month);

        // const { active, setActive } = this.props;

        return (
            <div 
                // className={active ? 'modal active' : 'modal'}
                // onClick={() => setActive(false)}
                className={this.props.active ? 'modal active' : 'modal'}
                onClick={() => this.props.setActive(false)}
            >
                <div
                    className={this.props.active ? 'calendar active' : 'calendar'}

                    onClick={(e) => e.stopPropagation()}
                >
                    <header>
                        <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>

                        <select
                            ref={element => this.monthSelect = element}
                            value={this.month}
                            onChange={this.handleSelectChange}
                        >
                            {monthNames.map((name, index) =>
                                <option key={name} value={index}>{name}</option>
                            )}
                        </select>

                        <select
                            ref={element => this.yearSelect = element}
                            value={this.year}
                            onChange={this.handleSelectChange}
                        >
                            {years.map(year =>
                                <option key={year} value={year}>{year}</option>
                            )}
                        </select>

                        <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                    </header>

                    <table>
                        <thead>
                            <tr>
                                {weekDayNames.map(name =>
                                    <th key={name}>{name}</th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {monthData.filter(week => week.some(date => date)).map((week, index) =>
                                <tr key={index} className='week'>
                                    {week.map((date, index) => date ?
                                        // <td 
                                        //     key={index} 
                                        //     className={classnames('day', {
                                        //         'today': calendar.areEqual(date, currentDate),
                                        //         'selected': calendar.areEqual(date, selectedDate)
                                        //     })}
                                        //     onClick={() => this.handleDayClick(date)}
                                        // // >{date.getDate()}</td>
                                        // // >{date.format('D')}</td>
                                        // >{date.date()}</td>
                                        // :
                                        // <td key={index}></td>
                                        <td
                                            key={index}
                                            className={classnames('day', {
                                                'today': calendar.areEqual(date, currentDate),
                                                'selected': this.state.selectedDates.some(d => calendar.areEqual(d, date))
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
                    <footer>
                        <button onClick={this.handleTodayButtonClick}>Сегодня</button>
                        <button onClick={this.handleYesterdayButtonClick}>Вчера</button>
                        <button onClick={this.handleWeekButtonClick}>Прошлая неделя</button>
                        <button onClick={this.handleMonthButtonClick}>Месяц</button>
                    </footer>
                </div>
            </div>
        );
    }
}