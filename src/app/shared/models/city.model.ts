export interface City {
    id?: number,
    name: string,
    bestName?: string,
    country?: string,
    countryCode: string,
    desc?: string,
    icon?: string,
    slug?: string,
    imgUrl?: string,
    main?: {
        temp: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
        windspeed: number
    }
}