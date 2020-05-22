export interface City {
    id: number,
    name: string,
    bestName?: string,
    country: string,
    desc?: string,
    icon?: string,
    main?: {
        temp: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
        windspeed: number
    }
}