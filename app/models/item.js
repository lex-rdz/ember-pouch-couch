import Model from 'ember-pouch/model';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr('string'),
  description : DS.attr('string'),
  owner: DS.belongsTo('owner'),
  photos: DS.attr('attachments', {
   defaultValue: function() {
     return [];
   }
 })
});
