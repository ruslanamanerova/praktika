<script setup>
import InputText from "primevue/inputtext";
import { Card } from "./components/card";
import { Add_Window } from "./components/add_window";
import { Edit_Window } from "./components/edit_window";
import { ref, watch } from "vue";
import { loadDeskUser, saveCards, loadCards,  saveDeskUser } from "./components/storages/local_storage";

const cards = ref(loadCards());

const deskName = ref("");
const userName = ref("");
const { deskName: loadedDeskName, userName: loadedUserName } = loadDeskUser();
deskName.value = loadedDeskName;
userName.value = loadedUserName;
// Отслеживание изменений и сохранение данных
watch(deskName, (newDeskName) => {
  saveDeskUser(newDeskName, userName.value);
});

watch(userName, (newUserName) => {
  saveDeskUser(deskName.value, newUserName);
});


const isWindowOpened = ref(false);
const close_window = () => {
  isWindowOpened.value = false;
};

function updateCard(cardId, newStep) {
  const cardIndex = cards.value.findIndex((c) => c.id === cardId);
  if (cardIndex !== -1) {
    const updatedCard = { ...cards.value[cardIndex], step: newStep };
    cards.value.splice(cardIndex, 1, updatedCard);
    saveCards(cards.value);
  }
}

function delete_card(cardId) {
  const cardIndex = cards.value.findIndex((c) => c.id === cardId);
  if (cardIndex !== -1) {
    cards.value.splice(cardIndex, 1);
    saveCards(cards.value);
  }
}
function add_card(newCard) {
  cards.value.push(newCard);
  saveCards(cards.value);
}

// Edit_Window
const isEditMode = ref(false)
const whatCardEdited = ref()
const makeEdits = (card_id) => {
  whatCardEdited.value = cards.value.find((c) => c?.id === card_id)
  isEditMode.value = true
}
const closeEditMode = () => {
  whatCardEdited.value = ''
  isEditMode.value = false
}
function editCard(card_id, editedCard) {
  const cardIndex = cards.value.findIndex((c) => c?.id === card_id);
  if (cardIndex !== -1) {
    cards.value[cardIndex] = editedCard;
    // cards.value.splice(cardIndex, 1, cards.value[cardIndex]);
    saveCards(cards.value);
    closeEditMode()
  }
}
</script>

<template>
  <div class="page">
    <div class="header">
      <InputText class="name" v-model="deskName" placeholder="Название доски" />
      <InputText class="fio" v-model="userName" placeholder="Имя пользователя" />
    </div>
    <div class="body">
      <div class="column">
        <div class="title">Не выполнено:</div>
        <div class="unfulfilled cards">
          <Card
            v-for="(card, index) in cards"
            :key="index"
            class="card"
            :class="{ hidden: card?.step != 0 }"
            :title="card?.name"
            :time="card?.time"
            :card_step="card?.step"
            :id="card?.id"
            @update_step="(cardId, newStep) => updateCard(cardId, newStep)"
            @delete_card="(cardId) => delete_card(cardId)"
            @dblclick="makeEdits(card?.id)"
          />
        </div>
      </div>
      <div class="line"></div>
      <div class="column">
        <div class="title">В процессе:</div>
        <div class="process cards">
          <Card
            v-for="(card, index) in cards"
            :key="index"
            class="card"
            :class="{ hidden: card?.step != 1 }"
            :title="card?.name"
            :time="card?.time"
            :card_step="card?.step"
            :id="card?.id"
            @update_step="(cardId, newStep) => updateCard(cardId, newStep)"
            @delete_card="(cardId) => delete_card(cardId)"
            @dblclick="makeEdits(card?.id)"
          />
        </div>
      </div>
      <div class="line"></div>
      <div class="column">
        <div class="title">Завершено:</div>
        <div class="done cards">
          <Card
            v-for="(card, index) in cards"
            :key="index"
            class="card"
            :class="{ hidden: card?.step != 2 }"
            :title="card?.name"
            :time="card?.time"
            :card_step="card?.step"
            :id="card?.id"
            @update_step="(cardId, newStep) => updateCard(cardId, newStep)"
            @delete_card="(cardId) => delete_card(cardId)"
            @dblclick="makeEdits(card?.id)"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="plus" @click="isWindowOpened = true">+</div>
  <Add_Window
    v-if="isWindowOpened"
    @close_window="close_window()"
    @add_card="add_card"
  />
  <Edit_Window
  v-if="isEditMode"
  :whatCardEdited="whatCardEdited"
  @close_window="closeEditMode"
  @edit_card="editCard"
  />
</template>

<style lang="scss" scoped>
.hidden{
  display: none !important;
}
.page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1em 3em;
    .name {
      width: 35%;
      height: 64px;
      border-radius: 20px;
      background-color: #ebebeb;
      border: none;
      box-shadow: none;
      padding-inline: 1em;
      font-size: 22px;
      outline: 0 !important;
    }
    .fio {
      width: 20%;
      height: 64px;
      border-radius: 20px;
      background-color: #ebebeb;
      border: none;
      box-shadow: none;
      padding-inline: 1em;
      font-size: 22px;
      outline: 0 !important;
    }
  }
  .body {
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    padding: 2em;
    .line {
      display: block;
      width: 3px;
      background-color: rgba(151, 151, 151, 0.7);
    }
    .title {
      text-align: center;
      font-size: 23px;
      margin-bottom: 1em;
    }
    .column {
      width: 30%;
    }
    .cards {
      border-inline: none;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 0.5em;
      transition: all 0.5s;
    }
  }
}
.plus {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  cursor: pointer;
  padding-bottom: 5px;
  font-size: 25px;
  width: 40px;
  height: 36px;
}
</style>
