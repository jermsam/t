<template>
  <q-layout view="lhr lpr lfr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" elevated style="position: relative;">
      <!-- drawer content -->

      <div style="position: absolute; bottom: 3em; right: 0; left:0;" class="q-px-md">
        <q-item>
          <q-item-section avatar>
            <account-avatar :account="{name: authUser?.email, ...authUser}"/>
          </q-item-section>
          <q-item-section>
            <logout-button label="sign out" color="secondary"/>
          </q-item-section>

        </q-item>
      </div>
    </q-drawer>

    <q-page-container style="max-width: 100vw">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
  import {ref, watch} from 'vue';
  import useLogin from 'src/composables/useLogin';
 import LogoutButton from 'src/components/atoms/LogoutButton.vue'
 import AccountAvatar from 'src/components/atoms/AccountAvatar.vue'
  import {useQuasar} from 'quasar';
  const leftDrawerOpen = ref(false);
  const {authUser} = useLogin();
  const $q = useQuasar()

  watch(()=>$q.screen.gt.sm, (newVal)=>{
    leftDrawerOpen.value = newVal;
  },{immediate: true})

 function toggleLeftDrawer () {
   leftDrawerOpen.value = !leftDrawerOpen.value
 }
</script>
