/* eslint-disable react/react-in-jsx-scope */
import MapView, { Marker } from 'react-native-maps';


/* A list of Markers for Calvin's campus */
// setLocation is a function from the useState for "location" in addpage
export default function MarkerList(setLocation) {
  const titles =  // a hardcoded list of locations, because getting the title prop out of a marker was a pain.
  ["Science Building", // key 0
  "North Hall", // key 1
  "Commons", // key 2
  "Hekman Library" // key 3
]
  return (<>
  <Marker
    key={0} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.93107760891151, -85.58893946700456
      latitude: 42.93107760891151,
      longitude: -85.58893946700456,
    }}
    title={titles[0]}
    onPress={e => setLocation(titles[0])} // contents of e (event info) don't matter. It just acts as a trigger
  />
   <Marker
    key={1} // each marker in a map must have a unique key
    coordinate={{
      // NH: 42.931645391618126, -85.5888143897278
      latitude: 42.931645391618126,
      longitude: -85.5888143897278,
    }}
    title={titles[1]}
    onPress={e => setLocation(titles[1])}
   />
   <Marker
    key={2} // each marker in a map must have a unique key
    coordinate={{
      // Commons: 42.93105581120554, -85.58725210052256
      latitude: 42.93105581120554,
      longitude: -85.58725210052256,
    }}
    title={titles[2]}
    onPress={e => setLocation(titles[2])}
   />
   <Marker
    key={3} // each marker in a map must have a unique key
    coordinate={{
      // Library: 42.929871969093156, -85.58744064026993
      latitude: 42.929871969093156,
      longitude: -85.58744064026993,
    }}
    title={titles[3]}
    onPress={e => setLocation(titles[3])}
   />
    
  </>)
}