var dropmodule = (function () {
	var allfiles = [];
	
	function createZones() {
		var temp = document.getElementsByClassName("dropzone"),
		dropzones = Array.prototype.slice.call(document.querySelectorAll('.dropzone'));
			
		dropzones.forEach(function(zone, index) {
			//create drop zones
			createDropZone(zone);
			zone.addEventListener("dragover", function(e) { dragOver(zone, index, e); }, true);
			zone.addEventListener("drop", function(e) { drop(zone, index, e); }, true);
			zone.addEventListener("dragleave", function(e) { dragLeave(zone, index, e); }, true);
		});	
	}			

	function createDropZone(zone) {
		zone.style.display = "inline-block";
		zone.style.position = "relative";
		zone.style.textAlign = "center";
		zone.style.padding = "50px";
		zone.style.border = "1px solid gray";
		zone.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji"';
		zone.style.fontSize = "1rem";
		zone.style.fontWeight = 400;
		zone.style.lineHeight = 1.5;
		zone.style.color = "#212529";
	
		zone.innerHTML = `<div>Drag or Drop Files Here</div><br>
		<div>
		<img style="height: 35px;" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJDbG91ZF94NUZfdXBsb2FkIj4KCQk8Zz4KCQkJPHBhdGggZD0iTTMzNC4wOCwyNTkuOTJjLTQuODc4LTQuODk2LTExLjYyOC03LjkyLTE5LjA4LTcuOTJzLTE0LjIwMiwzLjAyNC0xOS4wOCw3LjkybC03Miw3MiAgICAgYy00Ljg5Niw0Ljg3OC03LjkyLDExLjYyOC03LjkyLDE5LjA4YzAsMTQuOTA0LDEyLjA5NiwyNywyNywyN2M3LjQ1MiwwLDE0LjIwMi0zLjAyNCwxOS4wOC03LjkyTDI4OCwzNDQuMTc4djE2OS4wMzggICAgIGMtMTAuODU0LDguMjA4LTE4LDIxLjEzMi0xOCwzNS43ODRjMCwyNC44NTgsMjAuMTQyLDQ1LDQ1LDQ1YzI0Ljg1OCwwLDQ1LTIwLjE0Miw0NS00NWMwLTE0LjY1Mi03LjEyOC0yNy41NzYtMTgtMzUuNzg0VjM0NC4xNzggICAgIGwyNS45MiwyNS45MDJjNC44NzgsNC44OTYsMTEuNjI4LDcuOTIsMTkuMDgsNy45MmMxNC45MjIsMCwyNy0xMi4wOTYsMjctMjdjMC03LjQ1Mi0zLjAyNC0xNC4yMDItNy45MDItMTkuMDhMMzM0LjA4LDI1OS45MnogICAgICBNNTQwLDIyNWMwLTczLjA4LTU4LjA4Ni0xMzIuNDI2LTEzMC41NzItMTM0Ljc2NkMzNzQuODE0LDQ2LjI5NiwzMjEuMjgyLDE4LDI2MSwxOEMxNjAuNTQyLDE4LDc4LjYyNCw5Ni40MjYsNzIuNTc2LDE5NS4zNzIgICAgIEMyOS40NjYsMjE3LjkwOCwwLDI2Mi45NjIsMCwzMTVjMCw3NC41NzQsNjAuNDI2LDEzNSwxMzUsMTM1aDM2YzE0LjkwNCwwLDI3LTEyLjA5NiwyNy0yN3MtMTIuMDk2LTI3LTI3LTI3aC0zNiAgICAgYy00NC42NTgsMC04MS0zNi4zNDItODEtODFjMC0zMC4yMjIsMTYuNzA0LTU3LjcyNiw0My41OTYtNzEuNzY2bDI3LjAxOC0xNC4xM2wxLjg3Mi0zMC40MzhDMTMwLjgyNCwxMjcuNjM4LDE4OS45MTgsNzIsMjYxLDcyICAgICBjNDEuNTI2LDAsODAuMTU0LDE4LjgyOCwxMDYuMDIsNTEuNjQybDE1LjU1MywxOS43NDZsMjUuMTI4LDAuODFDNDUxLjYwMiwxNDUuNjIsNDg2LDE4MS4xMTYsNDg2LDIyNXYzNS45ODJsMzMuMjI5LDEzLjg2ICAgICBDNTQyLjc3MSwyODQuNjcsNTU4LDMwNy40OTQsNTU4LDMzM2MwLDM0Ljc0LTI4LjI2LDYzLTYzLDYzaC0zNmMtMTQuOTA0LDAtMjcsMTIuMDk2LTI3LDI3czEyLjA5NiwyNywyNywyN2gzNiAgICAgYzY0LjYyLDAsMTE3LTUyLjM4LDExNy0xMTdDNjEyLDI4NC4zMjgsNTgyLjI4MiwyNDIuNjQsNTQwLDIyNXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
		</div>
		<div>Or</div><br><br>
		<div><input id="_file190784" multiple style="position: absolute; top: 0px; left: 0px; right: 0px; 
				bottom: 0px; width: 100%; height: 100%; 
				cursor: pointer; opacity: 0;" type="file">
				<button style="display: inline-block; font-weight: 400; text-align: center;
					white-space: nowrap; vertical-align: 
					middle; -webkit-user-select: none; 
					-moz-user-select: none; -ms-user-select: none;
					user-select: none; border: 1px solid transparent; 
					padding: .375rem .75rem; font-size: 1rem; line-height: 1.5; 
					border-radius: .25rem;
					transition: color .15s ease-in-out,
					background-color .15s ease-in-out, 
					border-color .15s ease-in-out,
					box-shadow .15s ease-in-out;">Click to Upload</button></div>`
	}

	document.addEventListener('change', onFileInput, true);

	function dragOver(zone, index, e) {
		return function() {
			zone.style.border = "1px dashed gray";
		}.bind(this)();
	}
	
	function onFileInput(e) {
		var ele = e.target.closest('.dropzone');
		removeSiblings(ele);
		allfiles[ele.getAttribute('name') || 
			ele.getAttribute('id')] = e.srcElement.files;
		addAdjacentFiles(ele, e.srcElement.files, ele.getAttribute('name'));
	}
	
	function addAdjacentFiles(ele, files, name) {
		files = Array.prototype.slice.call(files).map(function(file) { return "-- " +file.name; });
		var fileStr = files.join("<br>");
		ele.innerHTML += `<div style="font-weight: 500; margin-top:10px;margin-left: -30px" class=${name}> Files attached is / are :</div><div style=" text-align: left !important" class=${name}>${fileStr}</div>`;
	}
	
	function removeSiblings(ele) {
		var name = ele.getAttribute('name');
		var elems = ele.querySelectorAll("."+name);
		elems && elems.forEach(function(node){ node.remove(); });
	}

	function drop(zone, index, e) {
		return function() {
			removeSiblings(zone);
			zone.style.border = "1px solid gray";
			var files = e.dataTransfer.files;
			files = Array.prototype.slice.call(files).map(function(file) { return "-- " +file.name; });
			var fileStr = files.join("<br>");
			allfiles[zone.getAttribute('name') || zone.getAttribute('id')] = e.dataTransfer.files;
			addAdjacentFiles(zone, e.dataTransfer.files, zone.getAttribute('name'));
			e.preventDefault();
		}.bind(this)();
	}

	function dragLeave(zone, index, e) {
		return function() {	
			zone.style.border = "1px solid gray";
		}.bind(this)();
	}
	
	return {
		files: allfiles,
		createZones: createZones
	}
	
})();

