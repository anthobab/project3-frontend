import L from 'leaflet';

import img from '/boltPin.png';

const originWidth = 113;
const originHeith = 180;
const ratio = originWidth / originHeith;
const heigth = 80;
const anchorX = 42;
const anchorY = 180;

const iconLogo = new L.Icon({
  iconUrl: img,
  iconRetinaUrl: img,
  //   shadowUrl: img,

  //   iconAnchor: null,
  //   popupAnchor: null,
  iconSize: [heigth * ratio, heigth], // size of the icon
  //   iconSize: [38, 95], // size of the icon
  //   shadowSize: [20, 20], // size of the shadow
  iconAnchor: [(anchorX / originWidth) * heigth * ratio, (anchorY / originHeith) * heigth], // point of the icon which will correspond to marker's location
  //   shadowAnchor: [0, 0], // the same for the shadow
  popupAnchor: [0, -heigth], // point from which the popup should open relative to the iconAnchor
  //   iconSize: new L.Point(60, 75),
  //   className: 'leaflet-div-icon',
});

export { iconLogo };
