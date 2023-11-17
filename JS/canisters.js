function copperCanisterVolume(height, thickness, diameter) {
    const radiusOuter = (diameter / 2)
    const radiusInner = (diameter / 2) - thickness
    const volumeOuter = Math.PI * Math.pow(radiusOuter, 2) * height;
    const volumeInner = Math.PI * Math.pow(radiusInner, 2) * height;
    const volumeCopper = volumeOuter - volumeInner;
    return volumeCopper
}

const height = 4.835;  // in meters
const thickness = 0.1;  // in meters 
const diameter = 1.05;  // in meters

const volumeOfCopperCaniste = copperCanisterVolume(height,thickness,diameter)

console.log(volumeOfCopperCaniste); //1.443 m^3