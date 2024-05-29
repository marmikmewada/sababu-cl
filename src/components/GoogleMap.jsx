import { useEffect } from "react";

function GoogleMap() {
  useEffect(() => {
    // Function to initialize the map
    function initMap(coordinates) {
      // const map = new window.google.maps.Map(document.getElementById("map"), {
      //   center: coordinates,
      //   zoom: 14,
      // });
      // Add a marker to the map
      // const marker = new window.google.maps.Marker({
      //   position: coordinates,
      //   map: map,
      //   title: "42344 Winsbury West Pl, Sterling VA. 20166",
      // });
    }

    // Function to geocode an address and initialize the map
    function geocodeAddress(address) {
      const apiKey = "AIzaSyBTCXGXg5N - VOxAoswE3UYJE3yGnuvGkL8"; // Replace with your Google Maps API key

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const results = data.results;
          if (results.length > 0) {
            const location = results[0].geometry.location;
            const coordinates = {
              lat: location.lat,
              lng: location.lng,
            };
            initMap(coordinates);
          }
        })
        .catch((error) => {
          console.error("Error geocoding address:", error);
        });
    }

    // Call the geocodeAddress function with your desired address
    geocodeAddress("43244 Winsbury West Pl, Sterling VA. 20166");

    // Load the Google Maps JavaScript API by adding a script tag to the HTML document
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBTCXGXg5N - VOxAoswE3UYJE3yGnuvGkL8&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    script.onerror = () => {
      console.error("Error loading Google Maps API.");
    };

    // Append the script to the document
    document.head.appendChild(script);

    // Clean up the script tag when the component unmounts
    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);
  return <div id="map" style={{ height: "400px" }}></div>;
}

export default GoogleMap;
