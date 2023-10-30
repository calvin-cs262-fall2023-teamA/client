import MapView, { Marker } from 'react-native-maps';
/* A list of Markers for Calvin's campus */
export default function MarkerList() {
  return (<>
    <Marker
    key={0} //each marker in a map must have a unique key
    coordinate={{
      //SB: 42.93107760891151, -85.58893946700456
      latitude: 42.93107760891151,
      longitude: -85.58893946700456,
    }}
    title={"Science Building"}
   />
   <Marker
    key={1} //each marker in a map must have a unique key
    coordinate={{
      //NH: 42.931645391618126, -85.5888143897278
      latitude: 42.931645391618126,
      longitude: -85.5888143897278,
    }}
    title={"North Hall"}
   />
  </>)
}