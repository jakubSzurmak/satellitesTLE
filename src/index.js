import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/main.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { generateCZML } from "./js/coordCalculation";
import {
  createWorldTerrainAsync,
  Ion,
  Viewer,
  CzmlDataSource
} from "cesium";

import { accessToken } from "./js/CesiumConfig";

Ion.defaultAccessToken = accessToken;

const viewer = new Viewer("cesiumContainer", {
  terrainProvider: await createWorldTerrainAsync(),
  shouldAnimate: true
});

const tleData = {
  "Sentinel-1A": [
    "1 39634U 14016A   25129.48193779  .00000222  00000+0  56871-4 0  9990",
    "2 39634  98.1800 137.8668 0001386  90.8293 269.3066 14.59199646591170"
  ],
  "Sentinel-1C": [
    "1 62261U 24235A   25129.51536752  .00000253  00000+0  63446-4 0  9992",
    "2 62261  98.1829 137.5961 0001392  88.7022 271.4337 14.59198094 22540"
  ],
  "Sentinel-2A": [
    "1 40697U 15028A   25129.50835455  .00000166  00000+0  79966-4 0  9999",
    "2 40697  98.5697 205.1363 0001206 100.2938 259.8381 14.30809859516009"
  ],
  "Sentinel-2B": [
    "1 42063U 17013A   25129.50123545  .00000167  00000+0  80260-4 0  9994",
    "2 42063  98.5640 205.0729 0001224  91.0973 269.0350 14.30820448426924"
  ],
  "Sentinel-2C": [
    "1 60989U 24157A   25128.83710963  .00000169  00000+0  80975-4 0  9994",
    "2 60989  98.5628 204.5014 0001209  99.0707 261.0612 14.30824621 35166"
  ]
};

generateCZML(tleData).then((czml) => {
  viewer.dataSources.add(CzmlDataSource.load(czml));
});




