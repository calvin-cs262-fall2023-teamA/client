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
   <Marker
    key={2} //each marker in a map must have a unique key
    coordinate={{
      //Commons: 42.93105581120554, -85.58725210052256
      latitude: 42.93105581120554,
      longitude: -85.58725210052256,
    }}
    title={"Commons"}
   />
   <Marker
    key={3} //each marker in a map must have a unique key
    coordinate={{
      //Library: 42.929871969093156, -85.58744064026993
      latitude: 42.929871969093156,
      longitude: -85.58744064026993,
    }}
    title={"Hekman Library"}
   />
  </>)
}