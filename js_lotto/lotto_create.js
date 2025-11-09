function random_num() {
  const arr = [];
  while (arr.length < 7) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!arr.includes(n)) arr.push(n);
  }
  return arr;
}

function add_more_balls(what_balls) {
  const list = document.createElement("div");
  list.classList.add("result_balls_list");

  const colors = ["yellow", "sky", "red", "gray", "green", "purple", "orange"];
  const nums = random_num();

  nums.forEach((n, i) => {
    const div = document.createElement("div");
    div.className = `my_result ball ball_${colors[i]}`;
    div.textContent = n;
    if (i === 6) {
      const img = document.createElement("img");
      img.src = "star.png";
      img.className = "star";
      div.appendChild(img);
    }
    list.appendChild(div);
  });

  what_balls.appendChild(list);

  if (what_balls.classList.contains("win_balls")) window.win_number = nums;
  else window.my_number.push(nums);
}

window.add_more_balls = add_more_balls;
