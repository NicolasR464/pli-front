import React, { useEffect, useRef } from 'react'

import mapboxgl from 'mapbox-gl'

type MapProps = {
    latitude: number
    longitude: number
    zoom?: number
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom = 11 }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!mapContainerRef.current) return

        // Initialise la carte Mapbox
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom,
            interactive: false,
            attributionControl: false,
        })

        // Fonction de nettoyage pour supprimer la carte lors du démontage du composant
        // eslint-disable-next-line @typescript-eslint/consistent-return, @typescript-eslint/explicit-function-return-type
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (map) {
                map.remove()
            }
        }
    }, [latitude, longitude, zoom])

    return <div ref={mapContainerRef} />
}

export default Map
