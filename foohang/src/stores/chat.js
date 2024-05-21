import { ref } from "vue";
import { defineStore } from "pinia";

export const useChatStore = defineStore(
  "chat",
  () => {

    const findAttraciton = ref('');

    const searched = function(attractionName){
        findAttraciton.value = attractionName;
    }

    return { findAttraciton, searched };
  },
);
