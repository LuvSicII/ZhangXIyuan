class LineBarChart {
	constructor(arg) {
		//x轴颜色
		this.xAxisLineColor = 'black';
		//y轴颜色
		this.yAxisLineColor = 'black';
		//x轴文字颜色
		this.xAxisLabelColor = 'black';
		//y轴文字颜色
		this.yAxisLabelColor = 'black';
		//x轴数据
		this.xAxisData = ''
	}
	//生成图表
	initLineBarChart(data){
		let chartData = []
		if(data){
			data.forEach(function(item){
				if(item.type == 'bar'){
					if(item.barBorderRadius == ''){ item.barBorderRadius = 0 }
					let param = {
						type: item.type,
						name: item.name,
						itemStyle: {
							normal: {
								color: item.color,
								barBorderRadius: item.barBorderRadius,            // 柱条边线圆角，单位px，默认为0
								label: {
									show: false
								}
							},
						},
						data: item.data.split(',')
					}
					chartData.push(param)
				}else{
					if(item.barBorderRadius == ''){ item.barBorderRadius = 0 }
					let param = {
						type: item.type,
						name: item.name,
						itemStyle: {
							normal: {
								color: item.color,
								label: {
									show: false
								}
							},
						},
						data: item.data.split(',')
					}
					chartData.push(param)
				}
			})
		}
		let myChart = echarts.init(document.getElementById('chartBox'))
		    let option = {
		        tooltip: {
		            trigger: 'axis',
		        },
		        grid: {
		            top: '80px',
		            left: '3%',
		            right: '4%',
		            bottom: '3%',
		            containLabel: true
		        },
				toolbox: {
				    feature: {
				      dataView: { show: true, readOnly: false },
				      magicType: { show: true, type: ['line', 'bar'] },
				      restore: { show: true },
				      saveAsImage: { show: true }
				    }
				  },
				legend: {
				    orient: 'horizontal',          // 布局方式，默认为水平布局，可选为：
				                       // 'horizontal' ¦ 'vertical'
				    x: 'center',                // 水平安放位置，默认为全图居中，可选为：
				                              // 'center' ¦ 'left' ¦ 'right'
				                       // ¦ {number}（x坐标，单位px）
				    y: 'top',              // 垂直安放位置，默认为全图顶端，可选为：
				                       // 'top' ¦ 'bottom' ¦ 'center'
				                       // ¦ {number}（y坐标，单位px）
				    textStyle: {
				        color: '#333'                              // 图例文字颜色
				    }
				},
		        xAxis: [
		            {
		                type: 'category',
		                boundaryGap: true,
		                axisLine: {
		                    lineStyle: {
		                        color: this.xAxisLineColor,
		                        width: 1,
		                    },
		                },
		                axisTick: {            // 坐标轴小标记
		                    show: false,
		                },
		                axisLabel: {
		                    show: true,
		                    textStyle: {
		                        color: this.xAxisLabelColor
		                    }
		                },
		                splitLine: {
		                    show: false,
		                    lineStyle:{
		                        color:this.yaxisLabelColor,
		                        width: 1
		                    }
		
		                },
		                data: this.xAxisData
		            }
		        ],
		        yAxis: [
		            {
		                nameTextStyle: {
		                    color: '#fff',
		                },
		                type: 'value',
		                axisTick: {            // 坐标轴小标记
		                    show: false,
		                },
		                axisLine: {
		                    lineStyle: {
		                        color: this.yAxisLineColor,
		                        width: 1,
		                    },
		                },
		                axisLabel: {
		                    show: false,
		                    textStyle: {
		                        color: '#b0b1bf'
		                    }
		                },
		                splitLine: {
		                    show: true,
		                    lineStyle:{
		                        color:'#353b72',
		                        width: 1
		                    }
		
		                },
		            }
		        ],
		        series: chartData
		    }
		    myChart.setOption(option,true);
	}
	//初始化轴颜色
	initAxisColor(data){
		//x轴颜色
		if(data.xAxisLineColor!=''){this.xAxisLineColor = data.xAxisLineColor};
		//y轴颜色
		if(data.yAxisLineColor!=''){this.yAxisLineColor = data.yAxisLineColor;}
		//x轴文字颜色
		if(data.xAxisLabelColor!=''){this.xAxisLabelColor = data.xAxisLabelColor;}
		//y轴文字颜色
		if(data.yAxisLabelColor!=''){this.yaxisLabelColor = data.yAxisLabelColor;}
	}
	addDataList(){
		let length = $('.data-append-box ul').find('li').length;
		let nowNum = length+1;
		let barStr = `
			<div class="lb-data-content bar-data-content">
				<p>
					柱体颜色：
					<input id='colpickBar_${nowNum}' class='bar-color color-input' value="" />
				</p>
				<p>
					数据名称：
					<input id='yBarName' value="" />
				</p>
				<p>
					圆角大小(可不填写)：
					<input class='rudis-size' value="" />
				</p>
				<p id="yData">
					数据列表(数据之间请用','隔开)：
					<input id='dataBarList' value="" />
				</p>
			</div>
		`
		let lineStr = `
			<div class="lb-data-content line-data-content" hidden>
				<p>
					折线颜色：
					<input id='colpickLine_${nowNum}' class='line-color color-input' value="" />
				</p>
				<p>
					数据名称：
					<input id='yLineName' value="" />
				</p>
				<p id="yData">
					数据列表(数据之间请用','隔开)：
					<input id='dataLineList' value="" />
				</p>
			</div>
		`
		let str = `
			<li>
				<div class="lb-select-type">
					<p><span title='是否展示' class="show-span active"></span>是否展示</p>
					<p><span id='lineChart' class='chart-span'></span>折线图</p>
					<p><span id='barChart' class="chart-span active"></span>柱状图</p>
					<div title="删除本条数据" class="data-delete-btn"></div>
				</div>
				${barStr}
				${lineStr}
			</li>
		`
		return str
	}
	//获取当前列表中的数据
	getListData(){
		this.xAxisData = $('#xData input').val().split(',');
		//定义数据列表
		let data = [];
		if($('.data-append-box ul').find('li').length>0){//有数据则进行遍历
			$('.data-append-box ul').find('li').each(function(){
				let dataExample = {
					name : '',
					type : '',
					color : '',
					data : '',
					barBorderRadius : ''
				}
				if($(this).find('#lineChart').hasClass('active')){//获取折线图所需数据
					//折线颜色
					dataExample.color = $(this).find('.line-color').val()
					//数据名称
					dataExample.name = $(this).find('#yLineName').val()
					//数据列表
					dataExample.data = $(this).find('#dataLineList').val()
					//数据类型
					dataExample.type = 'line'
				}else{//获取柱状图所需数据
					//柱体颜色
					dataExample.color = $(this).find('.bar-color').val()
					//数据名称
					dataExample.name = $(this).find('#yBarName').val()
					//圆角大小
					dataExample.barBorderRadius = $(this).find('.rudis-size').val()
					//数据列表
					dataExample.data = $(this).find('#dataBarList').val()
					//数据类型
					dataExample.type = 'bar'
				}
				data.push(dataExample)
			})
		}else{
			alert('得先输入数据哦')
		}
		return data
	}
}