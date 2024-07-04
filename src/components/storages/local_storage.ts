import { ref } from "vue";
interface CARD {
  id: number;
  name: string;
  date: Date;
  time: string;
  description: string;
  step: number;
}

export const card: CARD = {
  id: 0,
  name: '',
  date: new Date(),
  time: '',
  description: '',
  step: 0
}

// Данные для доски и пользователя
export const desk_name = ref("");
export const user_name = ref("");

// Функция для сохранения карточек в localStorage
export function saveCards(cards: CARD[]) {
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Функция для загрузки карточек из localStorage
export function loadCards(): CARD[] {
  const cardsJSON = localStorage.getItem("cards");
  if (cardsJSON) {
    return JSON.parse(cardsJSON);
  }
  return [];
}

// Функция для сохранения desk_name и user_name в localStorage
export function saveDeskUser(deskName: string, userName: string) {
  const deskUserData = {
    deskName,
    userName,
  };
  localStorage.setItem("desk_user_data", JSON.stringify(deskUserData));
}

// Функция для загрузки desk_name и user_name из localStorage
export function loadDeskUser(): { deskName: string; userName: string } {
  const deskUserDataJSON = localStorage.getItem("desk_user_data");
  if (deskUserDataJSON) {
    return JSON.parse(deskUserDataJSON);
  }
  return { deskName: "", userName: "" };
}

// Использование функций
export const cards: CARD[] = loadCards(); // Загрузка сохранённых карточек при инициализации
