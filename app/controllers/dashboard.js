import Controller from '@ember/controller';

export default Controller.extend({
  selectedOwner: null,

  actions: {
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

    editOwner(owner){
      owner.save().then(()=>{
        this.set('selectedOwner', null);
      })
    },

    delete(owner) {
      owner.destroyRecord()
    },

    select(owner){
      this.set('selectedOwner', owner);
    }
  }
});
