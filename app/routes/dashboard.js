import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(){
    return hash({
      owners: this.store.findAll('owner'),
      items: this.store.findAll('item')
    })
  },
});
