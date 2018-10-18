import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';

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

    delete(record) {
      record.destroyRecord()
    },

    selectItem(item){
      this.set('selectedItem', item);
    },
    selectOwner(owner){
      this.set('selectedOwner', owner);
    }
  }
});
