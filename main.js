function nnfunc() {
  const cal = document.getElementById("cal");
  const info = document.getElementById("info");
  const filic = document.getElementById("filic");
  const btn_cont = document.getElementById("a");
  const btn_sum = document.getElementById("b");
  const btn_facture = document.getElementById("c");
  const ref = document.getElementById("ref");

  // --- formulaire d'informations ---
  btn_cont.addEventListener("click", (e) => {
    e.preventDefault();
    cal.style.display = "none";
    info.style.display = "block";
  });

  // --- Calc la simulation ---
  btn_sum.addEventListener("click", (e) => {
    e.preventDefault();

    const form = info.querySelector("form");

    const Montant = Number(document.getElementById("mont").value);
    const duree = Number(document.getElementById("mois").value);
    const type = document.getElementById("type").value;
    const salair = Number(document.getElementById("salaire").value);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

  
    let rate = 0;
    let typeNom = "";
    switch (type) {
      case "m": rate = 0.045; typeNom = "Maison"; break;
      case "a": rate = 0.05; typeNom = "Appartement"; break;
      case "t": rate = 0.06; typeNom = "Terrain"; break;
      case "e": rate = 0.07; typeNom = "Petite entreprise"; break;
      case "p": rate = 0.08; typeNom = "Prêt personnel (cash)"; break;
    }

    // --- Calculs ---
    const t = rate / 12;
    const p = Math.pow(1 + t, duree);
    const mensualite = Montant * (t * p) / (p - 1);
    const totalInterest = (mensualite * duree) - Montant;
    const totalRepayment = mensualite * duree;

    console.log("Mensualité:", mensualite.toFixed(2));

    // --- Decision ---
    if (mensualite < salair * 0.4) {
      info.style.display = "none";
      filic.style.display = "block";

      // feli---
      filic.innerHTML = `
        <section class="flex items-center justify-center flex-col">
          <div class="bg-[rgba(100,142,84,0.5)] w-150 h-auto rounded-4xl mt-20 p-6 text-white text-lg">
            <h2 class="text-2xl font-bold text-center mb-4">🎉 Félicitations !</h2>
            <p class="text-center mb-6">
              Votre demande de crédit a été approuvée avec succès.<br>
              Voici les détails de votre simulation :
            </p>
            <ul class="list-disc pl-10 text-amber-50 space-y-1">
              <li><strong>Type de prêt :</strong> ${typeNom}</li>
              <li><strong>Montant demandé :</strong> ${Montant.toLocaleString()} DH</li>
              <li><strong>Taux appliqué :</strong> ${(rate * 100).toFixed(1)}%</li>
              <li><strong>Mensualité :</strong> ${mensualite.toFixed(2)} DH / mois</li>
              <li><strong>Total des intérêts :</strong> ${totalInterest.toFixed(2)} DH</li>
              <li><strong>Montant total à rembourser :</strong> ${totalRepayment.toFixed(2)} DH</li>
            </ul>
            <div class="items-center justify-center flex mt-6">
              <button type="button"
                class="bg-[#648E54] w-80 h-8 mt-2 rounded-2xl text-white font-bold hover:scale-[0.98]"
                id="c">📄 Relever votre facture</button>
            </div>
          </div>
        </section>
      `;
// la facture
document.getElementById("c").addEventListener("click", () => {
  // hide
  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";
  filic.style.display = "block";
  filic.classList.remove("hidden");
  document.body.classList.remove("bg-[url('j.png')]", "bg-no-repeat", "bg-cover");
  document.body.style.backgroundColor = "#ffffff";

  // facture cntn
  filic.innerHTML = `
    <section class="flex flex-col items-center justify-center py-10">
      <div class="w-[90%] max-w-[700px] border border-gray-300 rounded-md p-10 shadow-md bg-white text-gray-900">
        <h1 class="text-[#648E54] text-4xl font-extrabold text-center mb-6">GOMoney</h1>
        <h2 class="text-2xl font-semibold text-center mb-8 border-b border-gray-300 pb-3">Facture de Simulation</h2>

        <div class="space-y-2 mb-6">
          <p><strong>Type de prêt :</strong> ${typeNom}</p>
          <p><strong>Montant demandé :</strong> ${Montant.toLocaleString()} DH</p>
          <p><strong>Taux appliqué :</strong> ${(rate * 100).toFixed(1)}%</p>
          <p><strong>Durée :</strong> ${duree} mois</p>
          <p><strong>Mensualité :</strong> ${mensualite.toFixed(2)} DH / mois</p>
          <p><strong>Total des intérêts :</strong> ${totalInterest.toFixed(2)} DH</p>
          <p><strong>Montant total à rembourser :</strong> ${totalRepayment.toFixed(2)} DH</p>
        </div>

        <div class="flex justify-between text-sm text-gray-700 mb-8">
          <p><strong>Date :</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Référence :</strong> GM-${Math.floor(Math.random() * 1000000)}</p>
        </div>

        <p class="text-center text-gray-700 mb-10">
          Merci d’avoir choisi <span class="text-[#648E54] font-semibold">GoMoney</span> pour votre simulation de crédit.
        </p>

        <div class="flex justify-center gap-4">
          <button onclick="window.print()" 
            class="bg-[#648E54] px-8 py-2 rounded-md text-white font-semibold hover:opacity-90">
            Imprimer la facture
          </button>
          <button onclick="window.location.reload()" 
            class="bg-gray-400 px-8 py-2 rounded-md text-white font-semibold hover:opacity-90">
            Retour à l'accueil
          </button>
        </div>
      </div>
    </section>
  `;
});



    } else {
      info.style.display = "none";
      ref.style.display = "block";
    }
  });
}

