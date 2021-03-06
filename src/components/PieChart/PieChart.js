import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './PieChart.css'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import chartCss from '../../files/chartCss.json'

class PieChart extends React.PureComponent {
  componentDidMount() {
    this.renderChart()
  }

  componentWillReceiveProps(changes) {
    this.setState({
      data: changes.data,
    })
  }

  componentDidUpdate() {
    this.renderChart()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.myChart.dispose()
    this.myChart = null
  }

  handleResize = () => {
    this.myChart.resize()
  }

  renderChart() {
    const dom = this.chart
    echarts.registerTheme('chongming', chartCss)
    let myChart = echarts.init(dom,'chongming') // eslint-disable-line
    const data = this.props.data
    const option = {
      title: {
        text: data.title || '',
        padding: [4, 0],
        textStyle: {
          fontWeight: 'normal',
          fontSize: 15,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        top: '10%',
        animation: true,
        pageIconSize: [20, 20],
        data: data.legendData || [],
      },
      series: data.sourceData.map(item => ({
        ...item,
        type: 'pie',
        radius: '50%',
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,0.5)',
          },
        },
      })),
    }
    myChart.setOption(option, true)
    this.myChart = myChart
    window.addEventListener('resize', this.handleResize)
  }

  render() {
    return <div styleName="container" ref={el => { this.chart = el }} />
  }
}

export default CSSModules(PieChart, styles)
