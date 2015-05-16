/**
 * Initalize map
 */
  L.mapbox.accessToken = 'pk.eyJ1IjoiZGVlem9uZSIsImEiOiJ3bmdJcVlnIn0.AfQscey5bQGEwZIcsvaUBQ';
  var map = L.mapbox.map('map', 'deezone.i95knkdl');			
  map.setView([39.26,18], 3);
  var eventsLayer = L.mapbox.featureLayer().addTo(map);

  // Kickoff on document ready event
  $(document).ready(function() {

    var sourceURL = '/api/v1/map_layers';
    $.ajax({
      url: sourceURL,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        generatePins(data);
      },
      error: function(){
        alert("Crap, can't get data");
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

    // Header / navigation bar

    // UI elements
    $( "#slider" ).slider({
      min: 0,
      max: 365
    });
    // Events
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
   * Generate pin/markers on map
   */
  function generatePins(mapObjects) {

    var features = [];
    for (var eventCount in mapObjects) {
			
      var title = '<h1>' + mapObjects[eventCount].title + '</h1>';
      var city = mapObjects[eventCount].field_city;
      var country = mapObjects[eventCount].field_country;
      var festivalImage = mapObjects[eventCount].field_festival_image;
      var longitude = mapObjects[eventCount].field_longitude;
      var latitude = mapObjects[eventCount].field_latitude;

      var startDate = mapObjects[eventCount].field_event_start_date;
      startDate = new Date(startDate).toLocaleDateString("en-US");
      var endDate = mapObjects[eventCount].field_event_end_date;
      endDate = new Date(endDate).toLocaleDateString("en-US");

      var path = mapObjects[eventCount].path;
      var detailsLink = "<a href=\"http://deezone.ca" + path + "\" target=\"_new\">Event Details</a> >>";
      var body = festivalImage + "<br />" + startDate + ' - ' + endDate + "<br />" + city + ', ' + country + "<br />" + detailsLink;

      features[eventCount] = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
           "coordinates": [longitude, latitude]
        },
        "properties" : {
          "title": title,
          "description": body,
          "marker-color" : "#f86767",
          "marker-size" : "large",
          "marker-color" : "#BE9A6B",
          "marker-symbol" : "circle-stroked"
				}
			}
		}

    var geoEventData = {
      "type" : "FeatureCollection",
      "features" : features
    }

    eventsLayer.setGeoJSON(geoEventData);
	}
