import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import './App.css';

export default class Chart extends Component {
  plot(chart, width, height, data) {
    // create scales!
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value))
      .attr('width', (d) => xScale.bandwidth())
      .style('fill', (d, i) => colorScale(i));

    chart
      .selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .classed('bar-label', true)
      .attr('x', (d) => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('dx', 0)
      .attr('y', (d) => yScale(d.value))
      .attr('dy', -6)
      .text((d) => d.value);

    const xAxis = d3.axisBottom().scale(xScale);

    chart.append('g').classed('x axis', true).attr('transform', `translate(0,${height})`).call(xAxis);

    const yGridlines = d3.axisLeft().scale(yScale).ticks(5).tickSize(-width, 0, 0).tickFormat('');

    chart.append('g').call(yGridlines).classed('gridline', true);
  }

  drawChart(data) {
    const width = 800;
    const height = 450;

    const el = new Element('div');
    const svg = d3.select(el).append('svg').attr('id', 'chart').attr('width', width).attr('height', height);

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40,
    };

    const chart = svg.append('g').classed('display', true).attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    this.plot(chart, chartWidth, chartHeight, data);

    return el.toReact();
  }

  render() {
    return this.drawChart(this.props.data);
  }
}
