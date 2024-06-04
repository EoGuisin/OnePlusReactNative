interface GeometryPolygons {
    type: string,
    coordinates: number[][],
}

interface GeometryPolygons {
    type: string,
    coordinates: number[][],
}

interface GeometriesPolygons {
    type: string,
    geometries: GeometryPolygons[],
}


interface Properties {
    name: string,
    stroke: string,
    // stroke-opacity: number,
    // stroke-width: number,
}

interface FeaturesPolygons {
    name: string,
    color: string,
    type: string,
    geometry: GeometriesPolygons,
    properties: Properties,
}

interface GeometryCentros {
    type: string,
    coordinates: number[],
}

interface FeaturesCentros {
    type: string,
    geometry: GeometryCentros,
    properties: {
        name: string,
    },
}

interface GeometryRuas {
    type: string,
    coordinates: number[],
}

interface FeaturesRuas {
    type: string,
    rotate: number,
    geometry: GeometryRuas,
    properties: {
        name: string,
    },
}

interface GeometryDelimitacao {
    type: string,
    geometries: [{
        type: string,
        coordinates: number[][],
    }],
}

interface FeaturesDelimitacao {
    type: string,
    geometry: GeometryDelimitacao,
    properties: Properties,
}

interface Polygons {
    type: string,
    features: FeaturesPolygons[],
}
interface Centros {
    type: string,
    features: FeaturesCentros[],
}
interface Ruas {
    type: string,
    features: FeaturesRuas[],
}
interface Delimitacao {
    type: string,
    features: FeaturesDelimitacao[],
}

export default interface MapOthers {
    polygons: Polygons,
    centros: Centros,
    ruas: Ruas,
    delimitacao: Delimitacao,
}