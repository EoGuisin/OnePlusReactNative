import React, {memo} from 'react';
import {View, Text} from 'react-native'
import MapboxGL from '@rnmapbox/maps';

interface LatLong {
    latitude: number,
    longitude: number
}

interface Lotes {
    lote: string,
    coordinates: LatLong[],
    center: LatLong,
    dadosUau: DadosUau,
}

interface DadosUau {
    status: number,
    area: number,
    valorAVista: number,
    descricao: string,
    FRACAO_IDEAL: null,
    Categoria_de_preco: string,
    statusDaInadimplencia: string,
    valorInadimplente: number,
    valorAdimplente: number,
    qtDeParcelasInadimplente: number,
    statusDaVistoria: string,
    colorInadimplencia: string,
}

interface Lista {
    quadra: string,
    center: LatLong,
    lotes: Lotes[],
}

interface Props {
    index: number;
    quadra: Lista;
}

function PointAnnotationMap(props: Props) {
  return (
    <MapboxGL.PointAnnotation
      id={`${props.index}`}
      coordinate={[props.quadra.center.longitude, props.quadra.center.latitude]}
      children={
        <View
          style={{
            height: 15,
            backgroundColor: '#edff00',
            width: 15,
            borderWidth: 0.5,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}>
          <Text style={{color: '#000000', fontSize: 8}}>{props.quadra.quadra}</Text>
        </View>
      }
    />
  );
}

export const PointAnnotation = memo(PointAnnotationMap);
