import React, {useState} from 'react';
import moment from 'moment';

function ModifyAge(input) {
    const dateOfCreation = moment(input, 'YYYY-MM-DD HH:mm:ss');
    const nowDate = moment();
    const elementAge = nowDate - dateOfCreation;
    if (elementAge < 3600000) {
        const passedTime = moment().diff(input, 'minutes');
        return `${passedTime} минут назад`
    } else if (elementAge > 3600000 && elementAge < 86400000) {
        const passedTime = moment().diff(input, 'hours');
        return `${passedTime} часов назад`
    } else {
        const passedTime = moment().diff(input, 'days');
        return `${passedTime} дней назад`
    }
}

const DateModification = changeDateFunction => Component => class extends React.Component {
    render() {
        let modifiedDate;
        if (typeof changeDateFunction === 'function') {
            modifiedDate = changeDateFunction(this.props.date);
        } else {
            modifiedDate = this.props.date;
        }    
        return <Component {...this.props} date={modifiedDate}/>
    }
};

const DateTimePretty = DateModification(ModifyAge)(DateTime);

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}