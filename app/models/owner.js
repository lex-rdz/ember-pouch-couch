import Model from 'ember-pouch/model';
import DS from 'ember-data';

export default Model.extend({
  fullName: DS.attr('string'),
  age : DS.attr('number'),
  items: DS.hasMany('item')
});
