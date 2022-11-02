import { Moment } from 'moment';

export interface ILocation {
  id?: number;
  name?: string;
  code?: string;
  address?: string;
  isActive?: boolean;
  remarks?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  createdByLogin?: string;
  createdById?: number;
  updatedByLogin?: string;
  updatedById?: number;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public address?: string,
    public isActive?: boolean,
    public remarks?: string,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public createdByLogin?: string,
    public createdById?: number,
    public updatedByLogin?: string,
    public updatedById?: number
  ) {
    this.isActive = this.isActive || false;
  }
}