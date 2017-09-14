//切换图标类型脚本
export class ChangeChartTypeService{
  public fOption(date,data,_echarts){//分时图配置
    return{
      tooltip: {
        show:false,
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date,
      },
      yAxis: {
        show:false,
        type: 'value',
        boundaryGap: [0, '100%']
      },
      grid:{
        //show:true,
        x:20,
        y:5,
        x2:'8.25%',
        y2:26,
      },
      series: [
        {
          name:'模拟数据',
          type:'line',
          smooth:true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: 'rgb(255, 70, 131)'
            }
          },
          data: data
        }
      ]
    }
  }

  public kOption(dates,data){//k线图配置
    return{
      backgroundColor: '#FFF6D8',//图表背景色
      tooltip: {
        show:false,
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1
          }
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
        scale: true,
        axisTick:{
          inside:true,
        },
        axisLabel:{
          //margin:-38,
        },
        splitLine:{//分割线
          show:true,
          lineStyle:{
            color: ['#f4f4f4'],
            width: 1,
            type: 'solid'
          }
        },
        //axisLine: { lineStyle: { color: '#aaa' } },
        textStyle:{
          fontSize:10
        }
      },
      yAxis: {
        show:false,
        scale: true,
        axisLine: { lineStyle: { color: '#aaa' } },
        axisTick:{
          inside:true,
        },
        splitLine:{//分割线
            show:true,
          lineStyle:{
            color: ['#f4f4f4'],
            width: 1,
            type: 'solid'
          }
        },
        axisLabel:{
          //rotate:30,
          //margin:-38,
        },
      },
      grid:{
        //show:true,
        x:20,
        y:5,
        x2:'8.25%',
        y2:26,
        height:'auto'
      },
      animation: true,
      series: [
        {
          type: 'candlestick',
          name: '日K',
          data: data,
          itemStyle: {
            normal: {
              color: '#FD1050',
              color0: '#0CF49B',
              borderColor: '#FD1050',
              borderColor0: '#0CF49B'
            }
          }
        },
      ]
    }
  }
}
