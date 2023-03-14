<template>
  <q-page class="column items-center">
   <div class="text-h3 text-primary text-center q-my-lg ">
    Micro Services Demo
   </div>


    <q-tabs
      v-model="tab"
      class="text-teal"
    >

      <q-tab name="signup" icon="mail" label="Signup" />


      <q-tab name="login" icon="lock" label="Login" />
    </q-tabs>


    <signup-form :action="tab" v-if="tab" />



    <signup-form-skeleton v-else/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
<script setup>
import SignupForm from 'components/molecules/SignupForm.vue';
import SignupFormSkeleton from 'components/skeletons/SingupFormSkeleton.vue';
import {ref} from 'vue';
const tab =ref('signup');
</script>
