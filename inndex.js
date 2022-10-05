"use strict";

// Даны несколько обьектов клиентов банка со следующими данными
// fullName - ФИО клента
// clientLevel - уровень договора с банком от которого зависят тарифы на определенные услуги


// создал пользователей
const user1 = {
  fullName: "Ivan Petrovich",
  clientLevel: "platinum",
  money: 100034,
};
const user2 = {
  fullName: "Igor Ivanovich",
  clientLevel: "pro",
  money: 10045,
};
const user3 = {
  fullName: "Vala Sidorova",
  clientLevel: "basic",
  money: 1000,
};
// создал обьект банка
const banck = {
  bankName: "Privat",
  clientLevel: {
    basic: {
      discount: 0.1,
    },
    pro: {
      discount: 0.3,
    },
    platinum: {
      discount: 0.5,
    },
  },
};
// связала юзеров и банка через мап 
const getUserClientLevel = new Map([
  [user1, banck.clientLevel],
  [user2, banck.clientLevel],
  [user3, banck.clientLevel],
]);
console.log(getUserClientLevel);// проверил что они создались правильно
// создал функцию принимающую юзера и смоимость товара
function discountAmount(user, money) {
  let userdiscount = 0; //переменная скидки юзера 
  let goodsCost = 0; //переменная стоимости товара со скидкой
  //  найти usera в мапе
  for (const [key, value] of getUserClientLevel) {
    // нахожу именоо преданного юзера
    if (user === key) {
      // прохожусь по значению обекта что бы найти его скидку
      for (const [keys, values] of Object.entries(value)) {
        // нахожу скидку переданного юзера
        if (user.clientLevel === keys) {
          // получаю сикдку
          for (const [key, value] of Object.entries(values)) {
            // сохраняю в переменную что бы с ней работать
            userdiscount += value;
          }
        }
      }
    }
  }
  // Реализовать функцию расчета стоимости покупки пользователем торвара, которая принимает пользователя и цену товара и возвращает стоимость товара с учетом скидки.
  goodsCost += money - money * userdiscount; // закинул в переменную суммку стоимости покупки 
  console.log(`стоимость со скидкой равна ${money - money * userdiscount}`);//вывел в консоь сколько будет стоить со скидкой
  const purchaseСhoice = confirm("хотите осуществиить покупку?"); // спросил хочет ли пользователь осуществить покупку
  if (purchaseСhoice === true) { // если да то начинаем то покупаем
    if (user.money < goodsCost) { // проверяю естьли столько денег на считу пользователя 
      throw new Error("Не хватет денег на считу");//если не хватает денег то  кидаю ошибку что не хватает денег
    }
    console.log(`остаток на счете состовляет - ${(user.money -= goodsCost)}`);// если хватает вывожу на экран остаток счета клиента и изменяю его баланс// сумма меняеться как в мапе так и в юзере
  }
  return "благодарим за пользование нашим банком";
}
