<template>
  <div class="q-pa-md" :style="{width: $q.screen.gt.sm ? '20rem': '17rem'}">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="q-py-sm">
        <q-input
          filled
          v-model="email"
          label="Your email *"
          hint="Active  Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something like an email']"
        />
      </div>

      <div class="q-py-sm">
        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something like a password']"
        />

      </div>

      <div class="row q-py-sm q-gutter-sm items-center justify-between" v-if="action==='signup'">
        <q-toggle v-model="accept" class="col-3"/>
        <span class="col-8">Accept the terms and license</span>
      </div>


      <div class="row justify-between">
        <q-btn label="Reset" type="reset" color="primary" outline/>
        <q-btn :label="action" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignupForm',
})
</script>
<script setup>
  import {useQuasar} from 'quasar';
  import {ref} from 'vue';
  import useUsers from 'stores/services/users';
  import {useAuth} from 'stores/auth';
  import {useRouter} from 'vue-router';
  import useLogin from 'src/composables/useLogin';

  const props = defineProps({
    action: {
      type: String,
      default:'signup'
    }
  })

  const $q = useQuasar();
  const userStore = useUsers();
  const authStore = useAuth();
  const router = useRouter();
  const email = ref(null);
  const password = ref(null);
  const accept = ref(false);

  const {onLogin} = useLogin()

  async function onSubmit () {
    try {
      if(props.action === 'signup') {
      if (accept.value !== true) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        await userStore.create({email: email.value, password: password.value});
      }
    }
      await onLogin({user:{email: email.value, password: password.value}});


    } catch (e) {
      $q.notify({
        color: 'bg-red',
        textColor: 'white',
        icon: 'cloud_done',
        message: `${props.action} error:  ${e}`
      })
    }

  }

 function onReset () {
    email.value = null
    password.value = null
    accept.value = false
  }

</script>
