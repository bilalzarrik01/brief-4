function nnfunc() {
  const cal = document.getElementById("cal");
  const info = document.getElementById("info");
  const filic = document.getElementById("filic");
  const btn_cont = document.getElementById("a");
  const btn_sum = document.getElementById("b");
  const btn_facture = document.getElementById("c");
  const ref = document.getElementById("ref");

  // --- Aller au formulaire d'informations ---
  btn_cont.addEventListener("click", (e) => {
    e.preventDefault();
    cal.style.display = "none";
    info.style.display = "block";
  });

  // --- Calculer la simulation ---
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

    // --- Déterminer le taux ---
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

    // --- Décision ---
    if (mensualite < salair * 0.4) {
      info.style.display = "none";
      filic.style.display = "block";

      // Injecter les résultats dans la page "félicitation"
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

      // Ajouter à nouveau le listener du bouton facture
      document.getElementById("c").addEventListener("click", () => {
        alert("📄 Votre facture sera bientôt disponible !");
      });

    } else {
      info.style.display = "none";
      ref.style.display = "block";
    }
  });
}
