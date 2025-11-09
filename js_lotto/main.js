// 전역 변수 초기화
window.win_number = [];
window.my_number = [];
window.total_pay_money = 0;
window.total_money = 0;
window.try_make_result_num = false;
window.try_make_my_num = false;

window.prize_money = {
  three: 5000,
  four: 50000,
  five: 150000,
  five_plus: 15000000,
  six: 200000000
};

// 요소 선택
const make_num_button = document.querySelector(".make_num_button");
const buy_button = document.querySelector(".buy_button");
const total_result_button = document.querySelector(".total_result_button");
const close_button = document.querySelector(".close");

// 이벤트 등록
make_num_button.addEventListener("click", () => {
  document.querySelector(".show_result_block").style.display = "block";
  document.querySelector(".win_balls").style.display = "block";

  if (!window.try_make_result_num) {
    add_more_balls(document.querySelector(".win_balls"));
    window.try_make_result_num = true;
    show_result_button();
  }
});

buy_button.addEventListener("click", buy_system);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") buy_system();
});
