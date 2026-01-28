import {v4 as uuid4} from 'uuid';

export abstract class Entity<T>{

    protected _id: string;
    public props: T;

    constructor(props: T, id? : string){
        this._id = id ?? uuid4();
        this.props = props;
    }

    get id(){
        return this._id;
    }

    public equals(object?: Entity<T>): boolean {

        if(object === null || object === undefined){
            return false;
        }

        if(this === object){
            return true;
        }

        if(!(object instanceof Entity)){
            return false;
        }

        return this._id === object._id;
    }
}