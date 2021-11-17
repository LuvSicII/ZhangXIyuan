class PieChart {
	constructor(arg) {
		this.colorList = [];
	}
	//生成图表
	initPieChart(data){
		if(data.data==''){
			alert('请先输入数据哦');
			return
		}
		let myChart = echarts.init(document.getElementById('chartBox'))
		let option = {
			backgroundColor: '',
			color: data.color,
			// color: ['#5470c6','#91cc75','#fac858','#ee6666','#73c0de','#3ba272','#fc8452','#9a60b4','#ea7ccc'],
			title:{
				text:'',
				left:'center',
				top:'center',
				textStyle:{
					color:'#00f8ff',
					fontSize:30,
					fontFamily:'overtitle',
					top:12
				},
				subtext:'',
				subtextStyle:{
					color:'#C8E9FF',
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b} : {c} ({d}%)'
			},
			toolbox: {
				feature: {
				  dataView: { show: true, readOnly: false },
				  saveAsImage: { show: true }
				}
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 100,
				top: 'center',
				bottom: 20,
				itemGap:20,
				itemHeight:15,
				itemWidth:15,
				textStyle: {
					color: 'black'
				}
			},
			series: [{
				type: 'pie',
				radius: ['30%', '60%'],
				center: ['50%', '50%'],
				roseType: 'radius',
				itemStyle: {
					normal:{
						borderRadius: 8,
						// label:{
						//     show:false,
						//     textStyle:{color:'#b3c9fe',fontSize:"14"},
						//     formatter:function(val){
						//         return '{a|' + val.name + '}{b| ' + val.value+'%}'
						//     },
						//     rich: {
						//         a: { color: '#b3c9fe',fontSize: 14},
						//         b: {color: '#b3c9fe',fontSize: 14}
						//     }
						// },
						// labelLine:{
						//     show:true,
						//     lineStyle:{color:'#45bcf2'}
						// }
					},
				},
				data:data.data
			}],
		};
		myChart.setOption(option,true);
	}
	//生成数据列表
	addDataList(){
		let length = $('.data-append-box ul').find('li').length;
		let nowNum = length+1;
		let str = `
			<li class="pie-li">
				<div style="top:15px" title="删除本条数据" class="data-delete-btn"></div>
				<p>
					数据值：
					<input class='pie-value-input' value="" />
				</p>
				<p>
					数据名称：
					<input class='pie-name-input' id='pieName' value="" />
				</p>
				<p>
					扇形颜色：
					<input id='colpickPie_${nowNum}' class='pie-color color-input' value="" />
				</p>
			</li>
		`
		// $(`#colpickPie_${nowNum}`).colpick({
		// 	submit: false,
		// 	layout:'rgbhex',
		// 	onChange: function (color, color2,color3) {
		// 		color3.a = 0.5
		// 		$(`#colpickBar_${nowNum}`).css("background", '#' + color2);
		// 		$(`#colpickBar_${nowNum}`).val('#' + color2);
		// 	}
		// });
		return str
	}
	//获取当前列表中的数据
	getListData(){
		let data = [];
		let colorList = [];
		$('.pie-li').each(function(){
			//获取值
			let value = $(this).find('.pie-value-input').val();
			//获取名称
			let name = $(this).find('.pie-name-input').val();
			//获取颜色
			let color = $(this).find('.pie-color').val();
			data.push({
				value:value,
				name:name
			})
			colorList.push(color)
		})
		return {
			data:data,
			color:colorList
		}
	}
}