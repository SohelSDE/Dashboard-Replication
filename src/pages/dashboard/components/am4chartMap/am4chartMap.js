import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import cities from './mock';
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";
import s from './am4chartMap.module.scss';
import AnimatedNumber from 'react-animated-numbers';

const Am4chartMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // ComponentDidMount logic
    let mapInstance = am4core.create("map", am4maps.MapChart);
    mapInstance.geodata = am4geodata_usaHigh;
    mapInstance.percentHeight = 90;
    mapInstance.dy = 10;
    mapInstance.projection = new am4maps.projections.AlbersUsa();
    let polygonSeries = mapInstance.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    mapInstance.homeZoomLevel = 1.2;
    mapInstance.zoomControl = new am4maps.ZoomControl();
    mapInstance.zoomControl.layout = 'horizontal';
    mapInstance.zoomControl.align = 'left';
    mapInstance.zoomControl.valign = 'bottom';
    mapInstance.zoomControl.dy = -10;
    mapInstance.zoomControl.contentHeight = 20;
    mapInstance.zoomControl.minusButton.background.fill = am4core.color("#C7D0FF");
    mapInstance.zoomControl.minusButton.background.stroke = am4core.color("#6979C9");
    mapInstance.zoomControl.minusButton.label.fontWeight = 600;
    mapInstance.zoomControl.minusButton.label.fontSize = 22;
    mapInstance.zoomControl.minusButton.scale = .75;
    mapInstance.zoomControl.minusButton.label.scale = .75;
    mapInstance.zoomControl.plusButton.background.fill = am4core.color("#C7D0FF");
    mapInstance.zoomControl.plusButton.background.stroke = am4core.color("#6979C9");
    mapInstance.zoomControl.plusButton.label.fontWeight = 600;
    mapInstance.zoomControl.plusButton.label.fontSize = 22;
    mapInstance.zoomControl.plusButton.label.align = "center";
    mapInstance.zoomControl.plusButton.scale = .75;
    mapInstance.zoomControl.plusButton.label.scale = .75;
    mapInstance.zoomControl.plusButton.dx = 5;
    let plusButtonHoverState = mapInstance.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#354D84");
    let minusButtonHoverState = mapInstance.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#354D84");
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#474D84");
    polygonTemplate.stroke = am4core.color("#6979C9")
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#354D84");
    let citySeries = mapInstance.series.push(new am4maps.MapImageSeries());
    citySeries.data = cities;
    citySeries.dataFields.value = "size";
    let city = citySeries.mapImages.template;
    city.nonScaling = true;
    city.propertyFields.latitude = "latitude";
    city.propertyFields.longitude = "longitude";
    let circle = city.createChild(am4core.Circle);
    circle.fill = am4core.color("#C7D0FF");
    circle.strokeWidth = 0;
    let circleHoverState = circle.states.create("hover");
    circleHoverState.properties.strokeWidth = 1;
    circle.tooltipText = '{tooltip}';
    circle.propertyFields.radius = 'size';
    //this.map = map;
    // ... (rest of your component's logic)

    setMap(map);

    // ComponentWillUnmount logic
    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div className={s.mapChart}>
      <div className={s.stats}>
        <h6 className="mt-1">GEO-LOCATIONS</h6>
        <p className="h3 m-0">
          <span className="mr-xs fw-normal">
            <AnimatedNumber
              value={1656843}
              initialValue={0}
              duration={1000}
              stepPrecision={0}
              formatValue={(n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            />
          </span>
          <i className="fa fa-map-marker" />
        </p>
      </div>
      <div className={s.map} id="map">
        <span>Alternative content for the map</span>
      </div>
    </div>
  );
};

export default Am4chartMap;
