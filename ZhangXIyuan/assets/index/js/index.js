 class ChartFunc {
 	constructor(arg) {
		//扇形图
 		this.pieChart = new PieChart();
		//盒须图
		this.boxplotChart = new BoxplotChart();
		//折线柱状图
		this.lineBarChart = new LineBarChart();
 	}
	//专属函数
 	identity(){
		console.log('张熹元的系统')
	}
	//轴元素颜色赋值
	initAxisDomColor(){
		let axisColorObj = {
			xAxisLineColor: $('#colpickXaxis').val(),
			xAxisLabelColor: $('#colpickXaxis').val(),
			yAxisLineColor: $('#colpickXaxis').val(),
			yAxisLabelColor: $('#colpickXaxis').val()
		}
		return axisColorObj
	}
	// 颜色输入框函数
	clickColorInput(that){
		let id = $(that).attr('id');
		$(`#${id}`).colpick({
			submit: false,
			layout:'rgbhex',
			onChange: function (color, color2,color3) {
				color3.a = 0.5
				$(`#${id}`).css("background", '#' + color2);
				$(`#${id}`).val('#' + color2);
			}
		});
	}
	/*
	*
	*柱状折线图方法群
	*
	*/
	//柱状折线图添加新数据列表
	addLineBarDataList(){
		let str = this.lineBarChart.addDataList()
		$('.data-append-box ul').removeClass('no-data')
		$('.data-append-box ul').append(str)
	}
	//生成柱状折线图
	initLineBarChart(){
		//获取柱状颜色
		let axisColorObj = this.initAxisDomColor()
		//初始化柱状颜色
		this.lineBarChart.initAxisColor(axisColorObj)
		//获取所需数据
		let getData = this.lineBarChart.getListData()
		//生成图表
		this.lineBarChart.initLineBarChart(getData)
	}
	/*
	*
	*扇形图方法群
	*
	*/
   //柱状折线图添加新数据列表
	addPieDataList(){
		let str = this.pieChart.addDataList()
		$('.data-append-box ul').removeClass('no-data')
		$('.data-append-box ul').append(str)
	}
	initPieChart(){
		//获取所需数据
		let data = this.pieChart.getListData();
		//生成图表
		this.pieChart.initPieChart(data)
	}
	/*
	*
	*盒须图方法群
	*
	*/
   addBoxplotDataList(){
		let str = this.boxplotChart.addDataList()
		$('.data-append-box ul').removeClass('no-data')
		$('.data-append-box ul').append(str)
   }
   initBoxplotChart(){
		//获取所需数据
		let data = this.boxplotChart.getListData();
		//生成图表
		this.boxplotChart.initBoxplotChart(data)
   }
 }