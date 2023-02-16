<template>
  <q-avatar color="dark">
    <q-img v-if="account?.avatar" :src="account?.avatar" crossorigin="anonymous"/>
    <span class="text-white" v-else>{{ account?.name ? getInitials(account?.name) : 'A' }}</span>
  </q-avatar>
</template>

<script>
  export default {
    name: 'AccountAvatar',
  };
</script>

<script setup>
  defineProps({
    account: {
      type: Object,
      required: true
    }
  });
  import {getInitials} from 'src/utils';
</script>

<style scoped>

</style>
