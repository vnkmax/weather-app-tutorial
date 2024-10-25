<script setup lang="ts">
import Icons from "~/assets/icons";

const icons: any = Icons;

defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

/**
 * Get icon raw SVG.
 *
 * @param iconName string
 *
 * @returns string
 */
const getIcon = (iconName: string): string => {
  if (icons[iconName]?.default) {
    return icons[iconName].default;
  } else {
    return "";
  }
};
</script>

<template>
  <svg v-html="getIcon(iconName)" v-inline-svg />
</template>
