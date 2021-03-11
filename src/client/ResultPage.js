import React, { Component } from 'react';
import Chart from './Chart';
import axios from 'axios';

export default class ResultPage extends Component {
  state = {
    data: [],
    question: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props);
    if (id) {
      axios
        .get(`/api/${id}`)
        .then((res) => {
          const output = res.data;

          const graphData = output.result.map((data) => {
            return { name: data.label, value: data.score[0] };
          });

          this.setState({ data: graphData, question: output.question });
        })
        .catch((e) => {
          this.setState({ message: e.response.data });
          console.log(e.response.data);
        });
    }
  }

  render() {
    const { data, question, message } = this.state;
    return (
      <div>
        {question !== '' ? (
          <div>
            <h3>{question}</h3>
            <Chart data={data} />{' '}
          </div>
        ) : (
          <div>{message && message.status ? <h3>{message.message}</h3> : <h3>Loading....</h3>}</div>
        )}
      </div>
    );
  }
}
