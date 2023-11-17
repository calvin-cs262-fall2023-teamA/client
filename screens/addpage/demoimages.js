//used to store hardcoded demo images. require() functions cannot be used dynamically; the uri has to be static. That is why it is written this way.
//it is messy but it is also only meant to be temporary.
export function getImage(uri) {
    if (uri == '../../assets/DemoPlaceholders/charger.jpg') { return require('../../assets/DemoPlaceholders/charger.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/greenbottle.jpg') { return require('../../assets/DemoPlaceholders/greenbottle.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/notebook.jpg') { return require('../../assets/DemoPlaceholders/notebook.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/book.jpg') { return require('../../assets/DemoPlaceholders/book.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/umbrella.jpg') { return require('../../assets/DemoPlaceholders/umbrella.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/hat.jpg') { return require('../../assets/DemoPlaceholders/hat.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/can.jpg') { return require('../../assets/DemoPlaceholders/can.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/phone.jpg') { return require('../../assets/DemoPlaceholders/phone.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/keys.jpg') { return require('../../assets/DemoPlaceholders/keys.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/gloves.jpg') { return require('../../assets/DemoPlaceholders/gloves.jpg') }
    else if (uri == '../../assets/DemoPlaceholders/demobottle.jpg') {return require('../../assets/DemoPlaceholders/demobottle.jpg')}
    else if (uri == '../../assets/placeholder.jpg') {return require('../../assets/placeholder.jpg')}
    else return {uri: uri};//require('../../assets/placeholder.jpg'); //what will be shown when adding an item in the demo.
}