const cal = document.getElementById("cal");
const info = document.getElementById("info");
const btn_cont = document.getElementById("a");
const btn_sum = document.getElementById("b");

btn_cont.addEventListener("click" , () => {
   cal.style.display = "none"
    info.style.display = "block"
   
})
btn_sum.addEventListener("click" , () => {
      cal.style.display = "block"
    info.style.display = "none"
 
})