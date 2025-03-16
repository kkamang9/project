	function Progressbar(progressBarId, progressBarLabelId, value, speed, step) {

		var progressBar = $("#" + progressBarId);
		var progressBarLabel = $("#" + progressBarLabelId);
		var value = value;
		var speed = speed;
		var step = step;

		progressBar.progressbar({
			max    : 100,
			value  : 0,
			change : function() {
				if( "" != progressBarLabelId ) {
					progressBarLabel.text(progressBar.progressbar("value") + "%");
				}
			}
		});

		var color = "#000";
		if( value > 66 ) {
			color = "#0d83de";
		} else if( value > 33 ) {
			color = "#38a32a";
		} else {
			color = "#c22929";
		}

		progressBar.find(".ui-progressbar-value").css("background-color", color);
		if( "" == progressBarLabelId ) {
			progressBar.css("height", "10px");
		}

		progress();

		function progress() {
			var val = progressBar.progressbar("value") || 0;
			progressBar.progressbar("value", val + step);
			if( val < value ) {
				setTimeout(progress, speed);
			} else {
				progressBar.progressbar("value", value);
			}
		}

	}