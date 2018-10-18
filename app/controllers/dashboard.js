import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { all } from 'rsvp';

export default Controller.extend({
  ownerOfItem: null,
  selectedItem: null,
  selectedOwner: null,

  actions: {
    createItem(){
      let name = this.get('itemName');
      let description = this.get('description');
      let owner = this.get('ownerOfItem');

      let newItem = this.store.createRecord('item', {
        name: name,
        description: description,
        owner: owner
      });

      owner.get('items').pushObject(newItem);
      owner.save().then(()=>{
        newItem.save().then(()=>{
          this.set('itemName', null);
          this.set('description', null);
          this.set('ownerOfItem', null);
        })
      });
    },
    createOwner(){
      let name = this.get('fullName');
      let age = this.get('age');
      let newOwner = this.store.createRecord('owner', {
        fullName: name,
        age: age
      });

      newOwner.save().then(()=>{
        this.set('fullName', null);
        this.set('age', null);
      })
    },

    editItem(item){
      item.get('owner').then((owner)=>{
        owner.get('items').pushObject(item);
        owner.save().then(()=>{
          item.save().then(()=>{
            this.set('selectedItem', null);
          })
        })
      })
    },
    editOwner(owner){
      owner.save().then(()=>{
        this.set('selectedOwner', null);
      })
    },

    deleteItem(item) {
      item.destroyRecord()
    },
    deleteOwner(owner) {
      let deletedItems = [];

      owner.get('items').then((items) => {
        items.map((item) => {
          deletedItems.push(item.destroyRecord());
        });
      });

      all(deletedItems).then(() => {
        owner.destroyRecord();
      });
    },

    insertImage(owner, files) {
      let photo = files[0];
       if (photo.type.match('image.*')) {
         let length = owner.get('photos.length');
         let fileType = photo.type.split("/")[1];
         owner.get('photos').addObject(Ember.Object.create({
          'name': 'Photo_' + length + '.' + fileType,
          'content_type': photo.type,
          'data': photo
        }));
       }
    },

    selectItem(item){
      this.set('selectedItem', item);
    },
    selectOwner(owner){
      this.set('selectedOwner', owner);
    }
  }
});
