import { CoreSignals } from './controller';

export interface Signals extends CoreSignals {

}

export interface ISignals<T> {
  signals?: T
}

interface PropSignals extends ISignals<Signals>{
  
}

export default PropSignals;
