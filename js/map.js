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
        alert(JSON.stringify(data));
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
