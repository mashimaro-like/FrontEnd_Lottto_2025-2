function close_modal() {
  document.querySelector(".modal").style.display = "none";
}

function show_result_button() {
  if (window.try_make_my_num && window.try_make_result_num)
    document.querySelector(".total_result_button").style.display = "block";
}

function final_get_money() {
  let res = { three: 0, four: 0, five: 0, five_plus: 0, six: 0 };
  const win = window.win_number.slice(0, 6);
  const bonus = window.win_number[6];

  for (let arr of window.my_number) {
    const count = win.filter((n) => arr.includes(n)).length;
    const hasBonus = arr.includes(bonus);

    if (count === 3) res.three++;
    else if (count === 4) res.four++;
    else if (count === 5 && hasBonus) res.five_plus++;
    else if (count === 5) res.five++;
    else if (count === 6) res.six++;
  }

  for (let k in res) {
    window.total_money += res[k] * window.prize_money[k];
  }

  return res;
}

function show_right_count() {
  const res = final_get_money();
  document.querySelector("#match_3").textContent = res.three;
  document.querySelector("#match_4").textContent = res.four;
  document.querySelector("#match_5").textContent = res.five;
  document.querySelector("#match_5plus").textContent = res.five_plus;
  document.querySelector("#match_6").textContent = res.six;
  document.querySelector("#get_money").textContent = window.total_money.toLocaleString();
}

// 이벤트 연결
document.querySelector(".total_result_button").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "flex";
  show_right_count();
});

document.querySelector(".close").addEventListener("click", close_modal);
document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) close_modal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") close_modal();
});

window.show_result_button = show_result_button;
