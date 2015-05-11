/**
 * Initalize map
 */
  L.mapbox.accessToken = 'pk.eyJ1IjoiZGVlem9uZSIsImEiOiJ3bmdJcVlnIn0.AfQscey5bQGEwZIcsvaUBQ';
  var map = L.mapbox.map('map', 'deezone.i95knkdl');			
  map.setView([39.26,18], 3);
  var eventsLayer = L.mapbox.featureLayer().addTo(map);

  // Kickoff on document ready event
  $(document).ready(function() {

    $.ajax({
      url: "http://deezone.ca/api/v1/map",
//      url: "http://playpoi.local:9888/api/v1/map",
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
				generatePins(data);
      },
      error: function(){
        alert("Cannot get data");
      }
    });

    // Map "eventsLayer" layer UI events
    eventsLayer.on('mouseover', function(e) {
      e.layer.openPopup();
    });
    eventsLayer.on('mouseout', function(e) {
      setTimeout( function() {
        e.layer.closePopup()
      }, 4000);
    });

    // Navigation bar events
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
		$("#add-event a").click(function() {
      $('#event-form').fadeIn("slow");
    });

  });

  /**
   * Gather map data from JSON file
   *
   * To be removed when .ajax functionality to use endpoints is complete.
   */
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
	
	 /**
   * Gather map data from returned JSON endpoint call to /api/v1/map
   */
  function generatePins(data) {
		
		var geoEventData = {
			"type" : "FeatureCollection"
		}
		var mapObjects = $.parseJSON(data);
		// alert(JSON.stringify(mapObjects));

    for (var eventCount in mapObjects) {
			
			var body = mapObjects[eventCount].body;
			
			geoEventData.features[eventCount] = {
			  "type": "Feature",
			  "geometry": {
				  "type": "Point",
				  "coordinates": [-89.689286, 39.770890]
			  },
			  "properties" : {
				  "title": "",
					"description": body,
				  "marker-color" : "#f86767",
				  "marker-size" : "large",
				  "marker-color" : "#BE9A6B",
				  "marker-symbol" : "circle-stroked"
				}
			}
			

		}

		
		// eventsLayer.setGeoJSON(data);
	}
	
/*	
	{
	"type" : "FeatureCollection",
	"features" : [
		{
			"type" : "Feature",
			"geometry" : {
				"type" : "Point",
				"coordinates" : [-89.689286, 39.770890]
			},
			"properties" : {
				"title" : "Andrew Knight",
				"description" : "Springfield, Montania<br />United States of America<br /><ul><li><a href=\"https://www.facebook.com/groups/778264118879720/\" target=\"_new\">Beginner</a> (Facebook)</li><li><a href=\"https://www.facebook.com/groups/720578081345414/\" target=\"_new\">Beyond-the-Basics</a> (Facebook)</li></ul>",
				"marker-color" : "#f86767",
				"marker-size" : "large",
				"marker-color" : "#BE9A6B",
				"marker-symbol" : "circle-stroked"
			}
		},

			  
*/
