import { twoline2satrec, propagate } from 'satellite.js';


export async function generateCZML(tleData){
    const durationMinutes = 3360;
    const steps = 1200;
    const now = new Date();

    const startTime = new Date(now);
    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    const toIso = (date) => date.toISOString().split('.')[0] + 'Z';



    const czml = [{
        "id": "document",
        "name": "Sentinel Satellites",
        "version": "1.0",
        "clock": {
            "interval": `${toIso(startTime)}/${toIso(endTime)}`,
            "currentTime": toIso(startTime),
            "multiplier": 60
        }
    }];

    for (const [name, tle] of Object.entries(tleData)) {
        const satrec = twoline2satrec(tle[0], tle[1]);
        const cartesian = [];

        for (let i = 0; i < steps; i++) {
            const time = new Date(startTime.getTime() + i * (durationMinutes * 60 * 1000 / steps));
            const positionAndVelocity = propagate(satrec, time);
            const positionEci = positionAndVelocity.position;

            if (positionEci) {
                cartesian.push(
                    i * durationMinutes * 60 / steps,
                    positionEci.x * 1000,
                    positionEci.y * 1000,
                    positionEci.z * 1000
                );
            }
        }
        if(name === "Sentinel-1A"){
            czml.push({
                "id": `Satellite/${name}`,
                "name": name,
                "availability": `${toIso(startTime)}/${toIso(endTime)}`,
                "label": {
                    "fillColor": {
                        "rgba": [255, 255, 255, 255],
                    },
                    "font": "10pt Arial",
                    "horizontalOrigin": "LEFT",
                    "outlineColor": {
                        "rgba": [150, 0, 150, 255],
                    },
                    "outlineWidth": 3,
                    "pixelOffset": {
                        "cartesian2": [20, 0],
                    },
                    "style": "FILL_AND_OUTLINE",
                    "text": `${name}`,
                },
                "point": {
                    "color": {"rgba": [255, 255, 255, 255]},
                    "outlineColor": {"rgba": [255, 0, 0, 255]},
                    "outlineWidth": 4,
                    "pixelSize": 20
                },
                "path": {
                    "material": {
                        "polylineOutline": {
                            "color": {
                                "rgba": [255, 0, 255, 255],
                            },
                            "outlineColor": {
                                "rgba": [0, 255, 255, 255],
                            },
                            "outlineWidth": 4,
                        },
                    },
                    "width": 6,
                    "leadTime": 6000,
                    "trailTime": 0,
                    "resolution": 0,
                },
                "position": {
                    "interpolationAlgorithm": "LAGRANGE",
                    "interpolationDegree": 5,
                    "referenceFrame": "INERTIAL",
                    "epoch": toIso(startTime),
                    "cartesian": cartesian
                }
            });
        }else {
            czml.push({
                "id": `Satellite/${name}`,
                "name": name,
                "availability": `${toIso(startTime)}/${toIso(endTime)}`,
                "label": {
                    "fillColor": {
                        "rgba": [255, 255, 255, 255],
                    },
                    "font": "10pt Arial",
                    "horizontalOrigin": "LEFT",
                    "outlineColor": {
                        "rgba": [150, 0, 150, 255],
                    },
                    "outlineWidth": 3,
                    "pixelOffset": {
                        "cartesian2": [20, 0],
                    },
                    "style": "FILL_AND_OUTLINE",
                    "text": `${name}`,
                },
                "point": {
                    "color": {"rgba": [255, 255, 255, 255]},
                    "outlineColor": {"rgba": [255, 0, 0, 255]},
                    "outlineWidth": 4,
                    "pixelSize": 20
                },
                "path": {
                    "material": {
                        "polylineOutline": {
                            "color": {
                                "rgba": [255, 0, 255, 255],
                            },
                            "outlineColor": {
                                "rgba": [0, 255, 255, 255],
                            },
                            "outlineWidth": 4,
                        },
                    },
                    "width": 6,
                    "leadTime": 6000,
                    "trailTime": 0,
                    "resolution": 0,
                },
                "position": {
                    "interpolationAlgorithm": "LAGRANGE",
                    "interpolationDegree": 5,
                    "referenceFrame": "INERTIAL",
                    "epoch": toIso(startTime),
                    "cartesian": cartesian
                }
            });
        }
    }

    return czml;
}