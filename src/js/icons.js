const markerShape = "M12.8,6.4c0,3.5-6.4,14-6.4,14S0,9.9,0,6.4S2.9,0,6.4,0S12.8,2.9,12.8,6.4z";
const strokeColor = '#ffffff';
const opacity = .9;
const anchor = new google.maps.Point(6.7,21);
const strokeWeight = 1;
const scale = 1.5;

export default {
    selected: {
        path: markerShape,
        fillColor:'#00ff00',
        strokeColor: strokeColor,
        fillOpacity: opacity,
        anchor: anchor,
        strokeWeight: strokeWeight,
        scale: scale
    },
    normal: {
        path: markerShape,
        fillColor:'#ff0000',
        strokeColor: strokeColor,
        fillOpacity: opacity,
        anchor: anchor,
        strokeWeight: strokeWeight,
        scale: scale
    }
}