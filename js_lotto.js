const make_num_button = document.querySelector(".make_num_button");
const buy_button = document.querySelector(".buy_button");
const total_result_button = document.querySelector(".total_result_button");
const close_button = document.querySelector(".close");

const show_result_block = document.querySelector(".show_result_block");
const modal = document.querySelector(".modal");
const modal_popup = document.querySelector(".modal_popup");

const win_balls = document.querySelector(".win_balls");
const my_balls = document.querySelector(".my_balls");

const total_pay = document.querySelector("#total_pay");
var win_number = [];
var my_number = [];

var total_pay_money = 0;
var try_make_result_num = false;
var try_make_my_num = false;

var prize_money = {
  three: 5000,
  four: 50000,
  five: 150000,
  five_plus: 15000000,
  six: 200000000
};
var total_money = 0;


// 당첨 번호 생성하기
make_num_button.addEventListener("click", () => {
  show_result_block.style.display = "block";
  win_balls.style.display = "block";
  if (try_make_result_num == false) {
    add_more_balls(win_balls);
    try_make_result_num = true;

    show_result_button();
  }
  
});

// 번호 구매하기
buy_button.addEventListener("click", buy_system);
document.addEventListener("keydown", (enter) => {
  if (enter.key === "Enter") {
    const buy_num = document.querySelector("#buy_count").value.trim();
    if (buy_num != "") {
      buy_system();
    }
  }
});

// input 값 확인 && 공 추가
function buy_system() {
    const buy_num = document.querySelector("#buy_count").value.trim();

  if (buy_num == "" || buy_num == null) {
    alert("값을 입력하세요!");
  }
  else if (isNaN(buy_num)) {
    alert("숫자로 입력해주세요!");
  }
  else if(Number(buy_num) <= 0) {
    alert("1 이상의 값을 입력해주세요!");
  }
  else if (Number(buy_num) % 1 !== 0){
    alert("정수로 입력해주세요!");
  }
  else {
    show_result_block.style.display = "block";
    my_balls.style.display = "block";
    total_cash(buy_num);
    for (let i = 0; i<Number(buy_num); i++) {
      add_more_balls(my_balls); // 공 추가
      try_make_my_num = true;
      show_result_button();
    }
  }

  document.querySelector("#buy_count").value = "";
  document.querySelector("#buy_count").focus();
}


// 결과 모달 띄우기
total_result_button.addEventListener("click", () => {
  modal.style.display = 'flex';
  show_right_count();
});

// 결과 모달 닫기
close_button.addEventListener("click", close_modal);
modal_popup.addEventListener("click", (Evt) => {
    Evt.stopPropagation();
});
modal.addEventListener("click", close_modal);
document.addEventListener("keydown", (ESC) => {
  if (ESC.key === "Escape") {
    close_modal();
  }
});

// 모달 닫기 함수
function close_modal() { modal.style.display = 'none'; }

// 공 추가하기
function add_more_balls(what_balls) {
  const add_ball = document.createElement('div');
  add_ball.classList.add('result_balls_list');

  const add_ball_list = what_balls;
  
  const rand_arr = random_num();
  const color_arr = ["yellow", "sky", "red", "gray", "green", "purple", "orange"]

  let temp_innerHTML;

  for (let i = 0; i < 7; i++) {
    if (i < 6) {
      temp_innerHTML = 
      `<div class="my_result ball ball_${color_arr[i]}">${rand_arr[i]}</div>`;
    }
    else {
      temp_innerHTML = 
      `<div class="my_result ball ball_${color_arr[i]}">${rand_arr[i]}
        <img class="star" src="star.png" alt=""></img>
      </div>`;
    }
    add_ball.innerHTML += temp_innerHTML;
  }

  add_ball_list.appendChild(add_ball);
  if (what_balls === win_balls) {
    win_number = rand_arr;
  }
  else {
    my_number.push(rand_arr);
  }
}

//  랜덤 값 뽑기
function random_num() {
  let rand_arr = [];

  while (rand_arr.length < 7) {
    let rand_num = Math.floor(Math.random() * 45) + 1;
  
    if (!rand_arr.includes(rand_num)) {
      rand_arr.push(rand_num);
    }

  }
  return rand_arr;
}

//  총 가격 표시하기
function total_cash(buy_num) {
  total_pay_money += (buy_num * 1000);
  total_pay.innerText = total_pay_money.toLocaleString();
}

// 결과 확인 버튼 보이기
function show_result_button() {
  if (try_make_my_num == true && try_make_result_num == true) {
    total_result_button.style.display = "block";
  }
}

// 로또 번호와 동일한 번호가 있는지 체크
function final_get_money() {
  
  let right_count = 0;
  let right_bonus = false;
  let right_lotto = {
    three: 0,
    four: 0,
    five: 0,
    five_plus: 0,
    six: 0
  };

  const not_bouns_win = win_number.slice(0, 6);
  const bouns_win = win_number[6];

  for (let i = 0; i < my_number.length; i++) {
    const not_bouns_my = my_number[i].slice(0, 6);

    right_count = not_bouns_win.filter(right => my_number[i].includes(right)).length;
    right_bonus = my_number[i].includes(bouns_win);
    switch(right_count) {
      case 3:
          right_lotto.three += 1;
        break;
      
      case 4:
          right_lotto.four += 1;
        break;

      case 5:
          if (right_bonus) { right_lotto.five_plus += 1; } 
          else { right_lotto.five += 1; }
        break;
      case 6:
          right_lotto.six += 1;
        break;      
    }
    console.log(right_count);
    console.log(right_bonus);
    right_bonus = false;
    right_count = 0;
  }

  for (let key in right_lotto) {
    total_money += (prize_money[key] * right_lotto[key]);
    console.log(prize_money[key] * right_lotto[key]);
  }

  return right_lotto;
}

// 값 표시
function show_right_count() {
  let correct_count = final_get_money();

  let match_3 = document.querySelector("#match_3");
  let match_4 = document.querySelector("#match_4");
  let match_5 = document.querySelector("#match_5");
  let match_5plus = document.querySelector("#match_5plus");
  let match_6 = document.querySelector("#match_6");
  let final_money = document.querySelector("#get_money");

  match_3.textContent = correct_count.three.toLocaleString();
  match_4.textContent = correct_count.four.toLocaleString();
  match_5.textContent = correct_count.five.toLocaleString();
  match_5plus.textContent = correct_count.five_plus.toLocaleString();
  match_6.textContent = correct_count.six.toLocaleString();
  final_money.textContent = total_money.toLocaleString();
}