import React, { memo } from 'react';
import { View, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Object_ } from '../../Services/Objects';
interface Props {
  setModalInformationSelected: (value: boolean) => void;
  loteSelected: Object_.Lotes;
  lote: Object_.Lotes;
  index: number;
  positions: number[][];
  HandleClick(Leads: number[]): void;
}

function PolygonsMap(props: Props) {
  
  return (
    <>
      <MapboxGL.ShapeSource
        onPress={item => {
          let arr = [item.coordinates.longitude, item.coordinates.latitude]
          props.HandleClick(arr)
          props.setModalInformationSelected(true);
        }}
        key={props.index}
        shape={{
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                scalerank: null,
                featureclass: 'WGS84 bounding box',
              },
              geometry: {
                type: 'Polygon',
                coordinates: [props.positions],
              },
            },
          ],
        }}
        id={`${props.index}`}>
        <MapboxGL.FillLayer
          id={`${props.index}`}
          style={{
            fillOpacity: 0.2,
            fillOutlineColor: '#000000',
            fillColor:
              (props.lote?.dadosUau?.status == 0 && 'green') ||
              (props.lote?.dadosUau?.status == 1 && 'red') ||
              (props.lote?.dadosUau?.status == 2 && 'yellow') ||
              (props.lote?.dadosUau?.status == 3 && 'darkorange') ||
              (props.lote?.dadosUau?.status == 4 && '#7757A4') ||
              (props.lote?.dadosUau?.status == 5 && 'gray') ||
              (props.lote?.dadosUau?.status == 6 && 'black') ||
              (props.lote?.dadosUau?.status == 7 && 'darkcyan') ||
              (props.lote?.dadosUau?.status == 8 && 'purple') ||
              (props.lote?.dadosUau?.status == 9 && 'pink') ||
              (props.lote?.dadosUau?.status == 10 && 'darkblue') ||
              'white',
          }}
        />
      </MapboxGL.ShapeSource>
      <MapboxGL.PointAnnotation
        id={`${props.index}`}
        coordinate={[props.lote?.center?.longitude, props.lote?.center?.latitude]}
        children={
          <View
            style={{
              height: 15,
              backgroundColor: '#FFFFFF',
              width: 15,
              borderWidth: 0.5,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 1,
            }}>
            <Text style={{color: '#000000', fontSize: 8}}>{props.lote?.lote}</Text>
          </View>
        }
      />
    </>
  );
}

export const Polygons = memo(PolygonsMap);
