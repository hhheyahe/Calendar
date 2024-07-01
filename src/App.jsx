import React from 'react';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import Calendar from './components/Calendar';

import './index.css'

library.add(faCalendarDays);

class App extends React.Component {
    state = {
        date: null,
        modalActive: true
        // isOpen: false
    };

    handleDateChange = date => this.setState({ date });

    toggleModal = () => {
        this.setState((prevState) => ({
            // isOpen: !prevState.isOpen,
            modalActive: !prevState.modalActive
        }));
    }

    render() {
        const { date } = this.state;

        return (
            // <div>
                // {date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}
            // <div>
            //     {date && <p>Выбранная дата: {dayjs(date).format('YYYY-MM-DD')}</p>}
            <div>
                <FontAwesomeIcon
                    className="calendarIcon"
                    icon={['fas', 'calendar-days']}
                    onClick={this.toggleModal}
                />
                <Calendar 
                    onChange={(selectedDates) => console.log(selectedDates)}
                    // isOpen={this.state.isOpen}
                    active={this.state.modalActive}
                    setActive={this.toggleModal}
                />
            </div>
        );
    }
}

export default App;
