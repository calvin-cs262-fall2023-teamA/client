/* eslint-disable react/react-in-jsx-scope */
import MapView, { Marker } from 'react-native-maps';


/* A list of Markers for Calvin's campus */
// setLocation is a function from the useState for "location" in addpage
export default function MarkerList(setLocation) {
  const titles =  // a hardcoded list of locations, because getting the title prop out of a marker was a pain.
  ["Science Building", // key 0
  "North Hall", // key 1
  "Commons", // key 2
  "Hekman Library", // key 3
  "KE Apartments", // key 4
  "Devos Communication Center", // key 5
  "Calvin Chapel", // key 6
  "Covenant Fine Art Center", // key 7
  "Spoelhof Fieldhouse Complex", // key 8
  "Knollcrest Dining Hall", // key 9
  "Calvin University Campus Safety", // key 10
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
   <Marker
    key={4} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.92811233512641, -85.5827374137777
      latitude: 42.92811233512641,
      longitude: -85.5827374137777,
    }}
    title={titles[4]}
    onPress={e => setLocation(titles[4])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  <Marker
    key={5} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.9301705345184, -85.5835321806555
      latitude: 42.9301705345184,
      longitude: -85.5835321806555,
    }}
    title={titles[5]}
    onPress={e => setLocation(titles[5])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  <Marker
    key={6} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.92915643520804, -85.58838369956436
      latitude: 42.92915643520804,
      longitude: -85.58838369956436,
    }}
    title={titles[6]}
    onPress={e => setLocation(titles[6])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  <Marker
    key={7} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.93085888694246, -85.58592461942112
      latitude: 42.93085888694246,
      longitude: -85.58592461942112,
    }}
    title={titles[7]}
    onPress={e => setLocation(titles[7])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  <Marker
    key={8} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.93347253105608, -85.5896169412172
      latitude: 42.93347253105608,
      longitude: -85.5896169412172,
    }}
    title={titles[8]}
    onPress={e => setLocation(titles[8])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  <Marker
    key={9} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.9334149530474, -85.58627461988982
      latitude: 42.9334149530474,
      longitude: -85.58627461988982,
    }}
    title={titles[9]}
    onPress={e => setLocation(titles[9])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  <Marker
    key={10} // each marker in a map must have a unique key
    coordinate={{
      // SB: 42.937474070836714, -85.58788679846941
      latitude: 42.937474070836714,
      longitude: -85.58788679846941,
    }}
    title={titles[10]}
    onPress={e => setLocation(titles[10])} // contents of e (event info) don't matter. It just acts as a trigger
  />
  </>)
}