function total_cash(count) {
  window.total_pay_money += count * 1000;
  document.querySelector("#total_pay").textContent = window.total_pay_money.toLocaleString();
}

function buy_system() {
  const val = document.querySelector("#buy_count").value.trim();

  if (val === "" || isNaN(val) || Number(val) <= 0 || Number(val) % 1 !== 0) {
    alert("1 이상의 정수를 입력하세요!");
    return;
  }

  const count = Number(val);
  document.querySelector(".show_result_block").style.display = "block";
  document.querySelector(".my_balls").style.display = "block";

  total_cash(count);

  for (let i = 0; i < count; i++) {
    add_more_balls(document.querySelector(".my_balls"));
    window.try_make_my_num = true;
    show_result_button();
  }

  document.querySelector("#buy_count").value = "";
}

window.buy_system = buy_system;
