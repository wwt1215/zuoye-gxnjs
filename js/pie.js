//为地区画饼图
		function pie(svg, name, r, d, year) {

			var x = d.x;
			var y = d.y;
			var id = d.id;
			var province = d.name;

			var dataset = [ name.industry1, name.industry2, name.industry3];

			var outerRadius = r / 2;
			var innerRadius = 0;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);
			
			var pie = d3.layout.pie();
			
			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category10();

			//Set up groups
			var arcs = svg.selectAll("g.arc" + id)
						  .data(pie(dataset))
						  .enter()
						  .append("g")
						  .attr("id", "pie")
						  .on("mouseover", mouseover)
						  .on("mouseout", mouseout)
						  .attr("class", "arc" + id)
						  .attr("x", x)
						  .attr("y", y)
						  .attr("r", r)
						  .attr("name", province)
						  .attr("industry1", dataset[0])
						  .attr("industry2", dataset[1])
						  .attr("industry3", dataset[2])
						  .attr("year", year)
						  .attr("sum", name.sum)
						  .attr("transform", "translate(" + x + "," + y + ")");
			
			//Draw arc paths
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);
			
			//为每个饼图的扇形添加字符标签
			/*arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			    	return d.value;
			    });*/
		}

		//饼图鼠标事件
		function mouseover(){
			//var desc = d3.select(this).attr("desc");
			var y = d3.select(this).attr("y");
			var r = d3.select(this).attr("r");
			var x = d3.select(this).attr("x")*1+1*r;
			var province = d3.select(this).attr("name");
			var sum = d3.select(this).attr("sum");
			var industry1 = d3.select(this).attr("industry1");
			var industry2 = d3.select(this).attr("industry2");
			var industry3 = d3.select(this).attr("industry3");
			var year = d3.select(this).attr("year");

			var tooltip = d3.select("#tooltip")
			.style("left", x + "px")
			.style("top", y + "px");

			tooltip.select("#province").text(province)
			tooltip.select("#sum").text(sum);
			tooltip.select("#industry1").text(industry1);
			tooltip.select("#industry2").text(industry2);
			tooltip.select("#industry3").text(industry3);
			tooltip.select("#year").text(year);
			//显示提示条
			d3.select("#tooltip").classed("hidden", false);
		}

		//饼图鼠标事件
		function mouseout(){
			d3.select("#tooltip").classed("hidden", true);
		}