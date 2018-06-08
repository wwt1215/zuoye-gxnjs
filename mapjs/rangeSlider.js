	var selectMin =0;
	var selectMax =0;
	var totalMin =0;
	var totalMax =0;
	var provinceData = [];
	
	function drawRange(max, min){
		totalMin = min;
		totalMax = max;
		

		$("#range_1").ionRangeSlider({
			min: min,
			max: max,
			from:min,
			to: min,
			type: 'double',//设置类型
			step: 1,
			prefix: "",//设置数值前缀
			postfix: "",//设置数值后缀
			prettify: true,
			hasGrid: true
		});
	
	
	}
	$("#selectStyle").change(function(){
		$("#styleSrc").attr("href",$(this).val());
		selectMin = $(".irs-from").text();
		selectMax = $(".irs-to").text();
	});
	
	
	function drawRangeFinal(max, min, pData) {
		
		//添加范围控制条
		var rangeSlidery=520;
		var rangeSliderx=30;
		var rangeSlider = d3.select("#rangeSlider")
				.style("left", rangeSliderx + "px")
				.style("top", rangeSlidery-50 + "px");
				
		provinceData = pData;
		provinceData.sort(compare);
		drawRange(max, min);
	}

	//数组排序
	function compare(a, b){
	    return parseFloat(a) - parseFloat(b);
	}