import {boot} from 'quasar/wrappers';

const modules = import.meta.glob('../stores/services/*.js');

export default  boot(async()=>{
  for (const path in modules) {
    const {default: useStore} = await  modules[path]();
    if(useStore) {
      await useStore();
    }
  }
})
