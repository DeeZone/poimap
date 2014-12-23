			

      
      alert('Loading external');
			
			eventsLayer.on('mouseover', function(e) {
        e.layer.openPopup();
      });
      eventsLayer.on('mouseout', function(e) {
				setTimeout( function() {
					e.layer.closePopup()
				}, 4000);
      });
			
			
	
			function fetchJSONFile(path, callback) {
				var httpRequest = new XMLHttpRequest();
				httpRequest.onreadystatechange = function() {
					if (httpRequest.readyState === 4) {
						if (httpRequest.status === 200) {
							var data = JSON.parse(httpRequest.responseText);
							if (callback) callback(data);
						}
					}
				};
				httpRequest.open('GET', path);
				httpRequest.send();
			}
	
			fetchJSONFile('workshops.json', function(data){
				eventsLayer.setGeoJSON(data);
			});
			

		  $(document).ready(function() { 
        $("#header-hotspot").mouseenter(function() {
          $("#header-container").animate({ 
            top: 0 
          }, 500);  
        });
				$("#header-hotspot").mouseleave(function() {
          $("#header-container").animate({ 
            top: -150 
          }, 1000);  
        }); 
      }); 