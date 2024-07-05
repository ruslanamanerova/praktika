<script lang="ts" setup>
import { ref } from "vue";
import moment from 'moment';

const props = defineProps<{
  title: string
  time: string
  card_step: number
  id: number
}>()
const emits = defineEmits(['update_step', 'delete_card'])

const card_time = moment(props.time).format('HH:mm')

const arrow_click = () => {
  const new_step = ref(props.card_step)
  emits('update_step', props.id, (new_step.value+1))
}

</script>

<template>
  <div class="card" :class="{first_step: card_step===0, sec_step: card_step===1, third_step: card_step===2}">
    <div class="text_block">
      <div class="title">{{ title }}</div>
      <div class="date">{{ props.time }}</div>
    </div>
    <div class="icons">
      <svg
        class="cross"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="emits('delete_card', props.id)"
      >
        <path d="M1 1L9 9M9 9L1 16M9 9L17 1M9 9L17 16" stroke="black" />
      </svg>
      <svg
        v-if="card_step !== 2"
        class="arrow"
        width="33"
        height="12"
        viewBox="0 0 33 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="arrow_click()"
      >
        <path
          d="M32.5303 6.53033C32.8232 6.23744 32.8232 5.76256 32.5303 5.46967L27.7574 0.696699C27.4645 0.403806 26.9896 0.403806 26.6967 0.696699C26.4038 0.989593 26.4038 1.46447 26.6967 1.75736L30.9393 6L26.6967 10.2426C26.4038 10.5355 26.4038 11.0104 26.6967 11.3033C26.9896 11.5962 27.4645 11.5962 27.7574 11.3033L32.5303 6.53033ZM0 6.75L32 6.75V5.25L0 5.25L0 6.75Z"
          fill="black"
          fill-opacity="0.6"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  min-width: 330px;
  height: 120px;
  border-radius: 20px;
  display: flex;
  padding: 1em;
  cursor: pointer;
  justify-content: space-between;
  transition: all 0.5s;
  .text_block {
    width: 80%;
    height: 100%;
  }
  .icons{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .cross{
        display: flex;
    }
  }
}
.first_step{
  background-color: rgba(223, 182, 185, 1);
}
.sec_step{
  background-color: rgba(240, 208, 145, 1);
}
.third_step{
  background-color: rgba(193, 208, 174, 1);
}
</style>
