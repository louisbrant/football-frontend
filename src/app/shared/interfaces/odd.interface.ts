import { StateInterface } from "./match.interface";

export interface OddInterface {
    home: number,
    draw: number,
    away: number
}

export interface Odds {
    id: number,
    bookmakerimg: string,
    bookmakername: string,
    isopen: boolean,
    showtype: string,
    hrtype: string,
    odd: OddInterface,
    openodd: OddInterface
}
