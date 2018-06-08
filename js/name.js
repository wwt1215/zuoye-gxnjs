var show=0;
var isNameShow = function(){
	if(show==1){
		d3.selectAll(".province_name").attr("fill-opacity",0.0);
		d3.selectAll(".city_name").attr("fill-opacity",0.0);
		d3.selectAll(".county_name").attr("fill-opacity",0.0);
		show=0;
	}else{
		d3.selectAll(".province_name").attr("fill-opacity",1.0);
		d3.selectAll(".city_name").attr("fill-opacity",1.0);
		d3.selectAll(".county_name").attr("fill-opacity",1.0);
		show=1;
		}
	}
	
	/*var changeBackground = function(selectMin,selectMax, totalMin, totalMax, provinceData){
			
		var scale1 = d3.scale.linear()
			.domain([0, provinceData.length])
			.range([255, 0])
			.nice();
		 d3.selectAll(".pathChina").attr("fill",function(d,i){
		 //	return "rgb(0,"+i+",0)";
		 	var name = provinceDataYear[d.properties.id];
		 	if(name==undefined) return "rgb(0,0,0)";
		 	if(name.sum>=selectMin&&name.sum<=selectMax){
			 return "rgb(255,255,"+Math.floor(scale1(provinceData.indexOf(name.sum)))+")";
			}else{
				return background;
			}
		
		});
	}*/

	var changeBackground = function(selectMin,selectMax, totalMin, totalMax, provinceData){
			

		var min = getRangeMin(selectMin, provinceData);
		var max = getRangeMax(selectMax, provinceData);

		var scale1 = d3.scale.linear()
			.domain([min, max])
			.range([255, 0])
			.nice();
		 d3.selectAll(".pathChina").attr("fill",function(d,i){
		 //	return "rgb(0,"+i+",0)";
		 	var name = provinceDataYear[d.properties.id];
		 	if(name==undefined) return "#FFE4C4";
		 	if(name.sum>=selectMin&&name.sum<=selectMax){
		 	var colorvalue = Math.floor(scale1(provinceData.indexOf(name.sum)));
			 return "rgb(256,256,"+colorvalue+")";
			}else{
				return background;
			}
		
		});
	}

	function getRangeMin(selectMin, provinceData) {
		for(var i=0; i<provinceData.length; i++) {
			if(provinceData[i] > selectMin) {
				return i - 1;
			}
		}
	}

	function getRangeMax(selectMax, provinceData) {
		for(var i=0; i<provinceData.length; i++) {
			if(provinceData[i] >= selectMax) {
				return i;
			}
		}
	}

