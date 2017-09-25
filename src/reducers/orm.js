import { ORM } from 'redux-orm';
import { Wrestler } from './models';

const orm = new ORM();
orm.register(Wrestler);

export default orm;
