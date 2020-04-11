import React, {Component} from 'react';
import {View} from 'react-native';
import Echarts from 'native-echarts';

class EchartDemo extends Component {
  render() {
    const option = {
      title: {
        text: 'ECharts demo',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Echarts option={option} height={300} />
      </View>
    );
  }
}

export default EchartDemo;
