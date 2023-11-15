import MapView, { Marker } from 'react-native-maps';

// class MarkerLocation {
//   /** A class that stores a marker component along with information about that marker that can be easily
//    * retrieved using getters for this class. Makes up for the inability to easily get information out of
//    * the Marker component itself.
//    */
//   constructor(key, title, lat, long) {
//     this.title = title;
//     this.lat = lat;
//     this.long = long;
//     this.key = key;
//     this.marker = <Marker
//     key={key} //each marker in a map must have a unique key. User of this class is responsible for making sure they are unique.
//     coordinate={{
//       latitude: lat,
//       longitude: long,
//     }}
//     title={title}
//     onPress={this.title} //return title
//   />
//   }

//   get marker() {
//     return this.marker;
//   }

//   get title() {
//     return this.title;
//   }
// }


/* A list of Markers for Calvin's campus */
export default function MarkerList() {
  // const SB = new MarkerLocation(0, "Science Building", 42.93107760891151, -85.58893946700456);
  // const NH = new MarkerLocation(1, "North Hall", 42.931645391618126, -85.5888143897278)
  // const Commons = new MarkerLocation(2, "Commons", 42.93105581120554, -85.58725210052256)
  // const Library = new MarkerLocation(3, "Hekman", 42.929871969093156, -85.58744064026993);
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
    {/* {SB.marker}
    {NH.marker}
    {Commons.marker}
    {Library.marker} */}
  </>)
}