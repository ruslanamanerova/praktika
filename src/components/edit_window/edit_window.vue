<script lang="ts" setup>
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import moment from "moment";
import { ref } from "vue";
import { CARD } from "../storages/local_storage";

const props = defineProps<{
  whatCardEdited: CARD
}>()

const emits = defineEmits(["close_window", "edit_card"]);

const name = ref(props.whatCardEdited?.name);
const date = ref(props.whatCardEdited?.date);
const time = ref(props.whatCardEdited?.time);
const description = ref(props.whatCardEdited?.description);


const save_data = () => {
  if(name.value != '' && time.value != ''){
    const newCard = {
    name: name.value,
    date: date.value === props.whatCardEdited.date ? props.whatCardEdited?.date : moment(date.value).format('MM/DD/YY'),
    time: time.value === props.whatCardEdited.time ? props.whatCardEdited?.time : moment(time.value).format('HH:mm'),
    description: description.value,
    step: props.whatCardEdited?.step,
    id: props.whatCardEdited?.id,
  };
  emits("close_window");
  emits("edit_card", props.whatCardEdited?.id, newCard);
  }

};
</script>

<template>
  <div class="window_wrap">
    <div class="window">
      <div class="inputs">
        <div class="card flex justify-center">
          <FloatLabel class="w-12 mt-2">
            <InputText
              class="input"
              id="name"
              v-model="name"
              :invalid="name === ''"
            />
            <label for="name">Название</label>
          </FloatLabel>
        </div>

        <DatePicker
          class="input w-5"
          v-model="date"
          showIcon
          iconDisplay="input"
          :pt="{
            pcinput: {
              style: 'font-size: 10px;',
            },
          }"
        />

        <DatePicker
          class="input w-5"
          v-model="time"
          showIcon
          :invalid="time === ''"
          iconDisplay="input"
          timeOnly
        >
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </DatePicker>

        <div class="card flex justify-center">
          <FloatLabel class="mt-2">
            <Textarea
              v-model="description"
              rows="3"
              cols="40"
            />
            <label>Описание</label>
          </FloatLabel>
        </div>
      </div>
      <div class="btns">
        <div class="btn save" @click="save_data()">Сохранить</div>
        <div class="btn cancel" @click="emits('close_window')">Отмена</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.window_wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.677);
  display: flex;
  align-items: center;
  justify-content: center;
  .window {
    width: 90%;
    max-width: 734px;
    min-height: 70vh;
    background: #ebebeb;
    border-radius: 20px;
    padding: 1.5em 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 0.7em;
      .input {
        width: 70%;
        height: 40px;
      }
      label {
        font-size: 15px;
        top: -8px;
        left: 8px;
      }
    }
    .btns {
      margin-top: 1em;
      display: flex;
      gap: 2em;
      .btn {
        cursor: pointer;
        height: 35px;
        width: 35%;
        background-color: #bcbcbc72;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        font-size: 16px;
        transition: all 0.5s;
      }
      .save {
        &:hover {
          background-color: #c1d0ae;
        }
      }
      .cancel {
        &:hover {
          background-color: #dfb6b9;
        }
      }
    }
  }
}
</style>
