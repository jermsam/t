<template>
  <div class="q-pa-md" :style="{width: $q.screen.gt.sm ? '20rem': '17rem'}">

    <q-form>
      <div class="q-py-sm">
        <q-skeleton type="QInput"/>
      </div>

      <div class="q-py-sm">
        <q-skeleton type="QInput"/>
      </div>

      <div class="row q-py-sm q-gutter-md items-center justify-between">
        <q-skeleton type="QToggle" class="col-3"/>
        <q-skeleton type="rect" class="col-6"/>
      </div>


      <div class="row justify-between">
        <q-skeleton type="QBtn"/>
        <q-skeleton type="QBtn"/>
      </div>
    </q-form>

  </div>
</template>

<script>

</script>
<script setup>

</script>
