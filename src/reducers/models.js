import { attr, Model } from 'redux-orm';

class Wrestler extends Model {
    toString() {
        return `Wrestler: ${this.name}`;
    }
}
Wrestler.modelName = 'Wrestler';

// Declare your related fields.
Wrestler.fields = {
    id: attr(),
    name: attr(),
};

export  { Wrestler, }
