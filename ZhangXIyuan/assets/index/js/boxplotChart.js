class BoxplotChart {
	constructor(arg) {
		// this.dataList = [];
	}
	//生成图表
	initBoxplotChart(data){
		if(data.length==0){
			alert('请先输入数据哦');
			return
		}
		let myChart = echarts.init(document.getElementById('chartBox'))
		let option = {
		toolbox: {
			feature: {
			  dataView: { show: true, readOnly: false },
			  saveAsImage: { show: true }
			}
		  },
		  dataset: [
			{
			  // prettier-ignore
			  source: data
			},
			{
			  transform: {
				type: 'boxplot',
				config: { itemNameFormatter: `expr {value}` }
			  }
			},
			{
			  fromDatasetIndex: 1,
			  fromTransformResult: 1
			}
		  ],
		  tooltip: {
			trigger: 'item',
			axisPointer: {
			  type: 'shadow'
			}
		  },
		  grid: {
			left: '10%',
			right: '10%',
			bottom: '15%'
		  },
		  xAxis: {
			type: 'category',
			boundaryGap: true,
			nameGap: 30,
			splitArea: {
			  show: false
			},
			splitLine: {
			  show: false
			}
		  },
		  yAxis: {
			type: 'value',
			// name: 'km/s minus 299,000',
			splitArea: {
			  show: true
			}
		  },
		  series: [
			{
			  name: 'boxplot',
			  type: 'boxplot',
			  datasetIndex: 1
			},
			{
			  name: 'outlier',
			  type: 'scatter',
			  datasetIndex: 2
			}
		  ]
		};
		myChart.setOption(option,true);
	}
	//生成数据列表
	addDataList(){
		let str = `
			<li class="boxplot-li">
				<div style="top:7px" title="删除本条数据" class="data-delete-btn"></div>
				<p>
					数据值(请用','隔开)：
					<input />
				</p>
			</li>
		`
		return str
	}
	//获取当前列表中的数据
	getListData(){
		let dataList = [];
		$('.boxplot-li').each(function(){
			let data = $(this).find('input').val().split(',');
			dataList.push(data)
		})
		return dataList
	}
}