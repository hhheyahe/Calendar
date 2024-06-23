import React from 'react';
import dayjs from 'dayjs';

import Calendar from './components/Calendar';

class App extends React.Component {
    state = {
        date: null
    };

    handleDateChange = date => this.setState({ date });

    render() {
        const { date } = this.state;

        return (
            // <div>
                // {date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}
            // <div>
            //     {date && <p>Выбранная дата: {dayjs(date).format('YYYY-MM-DD')}</p>}
            <div>
                {/* <Calendar
                    onChange={this.handleDateChange}
                /> */ <Calendar onChange={(selectedDates) => console.log(selectedDates)} />}
            </div>
        );
    }
}

export default App;
