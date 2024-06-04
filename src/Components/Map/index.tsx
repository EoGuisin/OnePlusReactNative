import React, {memo, Dispatch, SetStateAction} from 'react';
import MapboxGL from '@rnmapbox/maps';
import { Polygons, PointAnnotation } from '../';
import {Object_} from '../../Services/Objects';
import * as turf from '@turf/turf';

//#region Interface
interface Props {
  getPositionCenter: number[];
  getMapList: Object_.Lotes[];
  getMapOriginalList: Object_.Map | undefined ;
  setModalInformationSelected: (value: boolean) => void;
  getVisualizationMap: string;
  handleRegionDidChange?(value: number[][]): void;
  getVisiblePolygons: Object_.Lotes[];
  setVisiblePolygons: (value: Object_.Lotes[]) => void;
  setRegionVisible: (value: number[][]) => void;
  setSelectedLotes: Dispatch<SetStateAction<Object_.Lotes | undefined>>;
}
//#endregion

function Map(props: Props) {

  

  function HandleClick(pointClick: number[]) {
    try {
      props.getVisiblePolygons.forEach(item => {
        let coords = item.coordinates.map(Item => [Item.latitude, Item.longitude]);   
        let first = [item.coordinates[0].latitude, item.coordinates[0].longitude];
        coords.push(first);
        const point = turf.point([pointClick[0], pointClick[1]]);
        const polygon = turf.polygon([coords]);
        const isInside = turf.booleanPointInPolygon(point, polygon);
        console.log(isInside);
        if(isInside) {
          props.setSelectedLotes(item);
          console.log(item);
          props.setModalInformationSelected(true);
        }
      });
    } catch(e) {console.log(e)}
  };

  return (
    <MapboxGL.MapView
      // onRegionDidChange={region => {
      //   props.handleRegionDidChange(region.properties.visibleBounds)
      //   props.setRegionVisible(region.properties.visibleBounds)
      // }}
      onPress={item => HandleClick(item.geometry.coordinates)}
      rotateEnabled={false}
      pitchEnabled={false}
      logoEnabled={false}
      attributionEnabled={false}
      style={{flex: 1, borderRadius: 10}}
      styleURL={props.getVisualizationMap}
      zoomEnabled={true}>
      <>
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={props.getPositionCenter}
        />
        {props.getVisiblePolygons?.map((lote, index) => {
          const positions: number[][] = [];
          lote.coordinates?.map(array =>
            positions?.push([array?.latitude, array?.longitude]),
          );
          let loteSelected = lote;
          return (
            <Polygons
              HandleClick={HandleClick}
              loteSelected={loteSelected}
              lote={lote}
              index={index}
              positions={positions}
              setModalInformationSelected={props.setModalInformationSelected}
            />
          );
        })}
        {/* {props.getMapOriginalList?.others?.delimitacao?.features?.map((area, index) => {
          const positions: number[][] = [];
          area?.geometry?.geometries?.map(array =>
            positions.push([array.coordinates[0][0], array.coordinates[0][1]]),
          );
          return <ShapeSource index={index} positions={positions} />;
        })} */}
        {props.getMapOriginalList?.lista?.map((quadra, index) => {
          return <PointAnnotation quadra={quadra} index={index} />;
        })}
      </>
    </MapboxGL.MapView>
  );
}

export const MapBox = memo(Map);