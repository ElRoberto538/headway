<template>
  <q-card class="bottom-card" ref="bottomCard">
    <q-card-section class="bg-primary text-white">
      <div class="place-card-conditionally-wrap">
        <q-btn
          flat
          round
          class="place-card-close-button"
          color="white"
          icon="close"
          v-on:click="$emit('close')"
        />
        <div class="place-card-section">
          <div class="text-subtitle1">
            {{ $props.poi?.name ? $props.poi?.name : $props.poi?.address }}
          </div>
          <div class="text" v-if="$props.poi?.name && $props.poi?.address">
            {{ $props.poi?.address }}
          </div>
        </div>
        <div class="place-card-section">
          <q-chip
            icon="directions_bus"
            clickable
            v-on:click="
              $router.push(`/multimodal/${canonicalizePoi($props.poi)}/_`)
            "
          >
            Bus there
          </q-chip>
          <q-chip
            icon="directions_car"
            clickable
            v-on:click="
              $router.push(`/directions/car/${canonicalizePoi($props.poi)}/_`)
            "
          >
            Drive there
          </q-chip>
          <q-chip
            icon="directions_bike"
            clickable
            v-on:click="
              $router.push(
                `/directions/bicycle/${canonicalizePoi($props.poi)}/_`
              )
            "
          >
            Bike there
          </q-chip>
          <q-chip
            icon="directions_walk"
            clickable
            v-on:click="
              $router.push(`/directions/walk/${canonicalizePoi($props.poi)}/_`)
            "
          >
            Walk there
          </q-chip>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { setBottomCardAllowance } from './BaseMap.vue';
import { canonicalizePoi } from './models';

export default defineComponent({
  name: 'PlaceCard',
  emits: ['close'],
  props: {
    poi: Object,
  },
  methods: {
    canonicalizePoi,
  },
  watch: {
    poi: function () {
      setTimeout(() => {
        setBottomCardAllowance(this.$refs.bottomCard.$el.offsetHeight);
      });
    },
  },
  mounted: function () {
    setTimeout(() => {
      setBottomCardAllowance(this.$refs.bottomCard.$el.offsetHeight);
    });
  },
  components: {},
});
</script>
