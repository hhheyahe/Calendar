import React from 'react';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import Calendar from './components/Calendar';

library.add(faCalendarDays);

class App extends React.Component {
    state = {
        date: null,
        isOpen: false
    };

    handleDateChange = date => this.setState({ date });

    toggleModal = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
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
                    style={{ color: '#107c82' }}
                />
                <Calendar 
                    onChange={(selectedDates) => console.log(selectedDates)}
                    isOpen={this.state.isOpen}
                />
            </div>
        );
    }
}

export default App;
