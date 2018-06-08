function drawMap(mapPath, svg, c) {
	var projection = d3.geo.mercator()
					.center([107, 38])
					.scale(width/2-40)
    			.translate([width/4+80, height/2]);
	
	var path = d3.geo.path().projection(projection);
	
	//var color = d3.scale.category20();
	
	d3.json(mapPath, function(error, root) {
		
		var backColor;

		if (error) 
			return console.error(error);
		console.log(root.features);
		
		svg.selectAll(".pathChina")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class", "pathChina")
			.attr("stroke","#000")
			.attr("stroke-width", 0.3)
			.attr("fill", function(d,i){
					return background;
				})
			.attr("d", path )
			.on("mouseover",function(d,i){
				backColor = d3.select(this).attr("fill");
               	var colorPre =  d3.select(this)
                .attr("fill",overColor);
            })
            .on("mouseout",function(d,i){
         		d3.select(this)
              	.attr("fill",backColor);
      		}).on("click",function(d,i){
                var id = d.properties.id;
                clickChina(d, i, "mapdata/geometryProvince/" + id + ".json");
            });

		//获取中心点坐标
		root.features.forEach(function(d, i) {
			var centroid = path.centroid(d);
			centroid.x = centroid[0];
			centroid.y = centroid[1];
			centroid.id = d.properties.id;
			centroid.name = d.properties.name
			centroid.feature = d;
			nodes.push(centroid);
		});

	});//end json


	d3.json("json/data/year.json", function(error, root){
			drawAxisTime("china", svg, width, height+timeheight/2, root.years, nodes);//读取年份数据
			//第一次进来点击第一年的数据
			circlemouseover("china", null, null, root.years[0]);
			//$("#"+root.years[0]).click();
	});

}//end drawMap

function clickChina(d, i, path) {
	d3.selectAll(".pathProvince").remove();
    d3.selectAll(".pathCouty").remove();
	drawPrivenceMap(d, path, svg);
}

function clickProvince(d, i) {
	d3.selectAll(".pathProvince").remove();
    d3.selectAll(".pathCouty").remove();
	drawCoutyMap(d, svg);
}

function clickCouty(d, i, path) {
	d3.selectAll(".pathProvince").remove();
    d3.selectAll(".pathCouty").remove();
	drawPrivenceMap(d, path, svg);
}

function drawPrivenceMap(d, mapPath, svg) {
			
	d3.json(mapPath, function(error, root) {
		
		if (error) 
			return console.error(error);
		console.log(root.features);

		var projection = d3.geo.mercator()
					.center(root.cp)
					.scale(root.size*2.7)
    				.translate([width/4*3, height/2]);
	
		var path = d3.geo.path().projection(projection);
		
		//var color = d3.scale.category20();
		
		svg.selectAll(".pathProvince")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class", "pathProvince")
			.attr("stroke","#000")
			.attr("stroke-width",0.3)
			.attr("fill", function(d,i){
					return background;
				})
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this)
                .attr("fill",overColor);
                
            })
            .on("mouseout",function(d,i){
         		d3.select(this)
              	.attr("fill",background);
      		}).on("click",function(d,i){
                clickProvince(d, i);
            });

		//获取中心点坐标
		root.features.forEach(function(d, i) {
			var centroid = path.centroid(d);
			centroid.x = centroid[0];
			centroid.y = centroid[1];
			centroid.id = d.properties.id;
			centroid.name = d.properties.name
			centroid.feature = d;
			provinceNodes.push(centroid);
		});

	});//end json

	var id = d.properties.id;
	provinceId = id.substr(0, 2);
	coutiesId = null;
	circlemouseover("china", provinceId, coutiesId, globalyear);
	
}//end drawMap


function drawCoutyMap(d,svg) {
	var id = d.properties.id;

	var mapPath = "mapdata/geometryCouties/" + id + "00.json";
	
	d3.json(mapPath, function(error, root) {
		
		if (error) 
			return console.error(error);
		console.log(root.features);

		var zoomScale = getZoomScale(root.features, width, height);

		var centers = getCenters(root.features);

		var projection = d3.geo.mercator()
					//.center(d.properties.cp)
					.center(centers)
					.scale(zoomScale*35)
    				.translate([width/4*3, height/2]);
		var path = d3.geo.path().projection(projection);
		//var color = d3.scale.category20();
		
		svg.selectAll(".pathCouty")
			.data( root.features )
			.enter()
			.append("path")
			.attr("class", "pathCouty")
			.attr("stroke","#000")
			.attr("stroke-width",0.3)
			.attr("fill", function(d,i){
					return background;
				})
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this)
                .attr("fill",overColor);
            })
            .on("mouseout",function(d,i){
         		d3.select(this)
              	.attr("fill",background);
      		}).on("click",function(d,i){
                clickCouty(d, i, "mapdata/geometryProvince/" + id.substr(0,2) + ".json");
            });
		//获取中心点坐标
		root.features.forEach(function(d, i) {
			var centroid = path.centroid(d);
			centroid.x = centroid[0];
			centroid.y = centroid[1];
			centroid.id = d.properties.id;
			centroid.name = d.properties.name
			centroid.feature = d;
			coutiesNodes.push(centroid);
		});
	});//end json
	var cid = d.properties.id;
	coutiesId = cid;
	provinceId = null;
	circlemouseover("china", provinceId, coutiesId, globalyear);
}//end drawMap