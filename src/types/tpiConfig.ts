import { LastChangeType } from './lastChange';

export type TpiConfig = {
    description: string;
    height: number;
    id: number;
    name: string;
    pageDurationMax: number;
    pageDurationMin: number;
    width: number;
    lastChange?: LastChangeType;
}
