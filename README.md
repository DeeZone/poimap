poimap
======

An interactive map that provides event information that's maintained by the community.

**Development**:
http://darrendouglaslee.com

**Production**:
http://maps.playpoi.com

####0.1.1
- Separation of functionality (HTML, CSS and JS) into their own files
- Static map data in JSON file
- Info bubbles that display pin details onHover
- timed mouseOut event that closes info bubbles
- Header navigation bar that sides into view when mouse is at the top of the map
- Header contains PlayPoi logo and test links for user name and pin creation

Update
------------
**Development**:
- Drupal 8 site: http://deezone.ca
- JSON endpoint: http://deezone.ca/api/v1/map
- Map: http://deezone.ca/poimap


####0.2.0
- Festival content type on Drupal 8 site
- Enabled JSON endpoint to load "festival" data: api/v1/map
- Generate pins on map based on JSON data gathered from /api/v1/map


**Up next**...
[ ] Gather via API call to ?? for latitude / longitude values of map content type entries based on address field value


Future functionality
---------------
[ ] Add parameters to end point (/api/v1/map) requests to filter content types
[ ] Add map UI elements to hide / display "layers"
