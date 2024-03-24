import { GrupaLinkova } from "./GrupaLinkova.js";

var index = 0;
var main1 = document.querySelector(".hero-main-1");
var main2 = document.querySelector(".hero-main-2");
main2.classList.add("sakrij");

var listaGrupaLinkova = await fetchDataAndProcess();

const listaIdIme = listaGrupaLinkova.map((element) => ({
  id: element.id,
  imeGrupe: element.imeGrupe,
}));

popuniLeviDeo(listaIdIme, main1);

async function fetchDataAndProcess() {
  try {
    const response = await fetch("https://localhost:7251/api/Link");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const listaGrupaLinkova = data.map(
      (item) => new GrupaLinkova(item.id, item.imeGrupe, item.linkovi)
    );

    return listaGrupaLinkova;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function popuniLeviDeo(vrednosti, leviDiv) {
  const divGore = document.createElement("div");
  divGore.classList.add("hero-main-1-gore");
  const divDole = document.createElement("div");
  divDole.classList.add("hero-main-1-dole");

  vrednosti.forEach((element) => {
    const button = document.createElement("button");
    button.textContent = element.imeGrupe;
    button.setAttribute("data-index", index++);
    button.classList.add("button-left");
    divGore.appendChild(button);

    button.addEventListener("click", (event) => {
      while (main2.firstChild) {
        main2.removeChild(main2.firstChild);
      }
      main2.classList.remove("sakrij");
      const index = parseInt(event.target.getAttribute("data-index"));
      listaGrupaLinkova[index].nacrtajGrupuLinkova(main2);
    });
  });

  const buttonAddGroup = document.createElement("button");
  buttonAddGroup.textContent = "Kreiraj grupu";
  buttonAddGroup.classList.add("button-add-group");

  buttonAddGroup.addEventListener("click", async () => {
    const imeGrupe = prompt("Unesite ime grupe:");
    if (imeGrupe !== null) {
      // Provjera da li je korisnik kliknuo Cancel
      const data1 = {
        imeGrupe,
        linkovi: [],
      };

      const response = await fetch("https://localhost:7251/api/Link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(index);
      listaGrupaLinkova.push(new GrupaLinkova(data.id, imeGrupe, []));
      listaIdIme.push({ id: data.id, imeGrupe: imeGrupe });

      const button = document.createElement("button");
      button.textContent = imeGrupe;
      button.setAttribute("data-index", index++);
      button.classList.add("button-left");
      document.querySelector(".hero-main-1-gore").appendChild(button);

      button.addEventListener("click", (event) => {
        while (main2.firstChild) {
          main2.removeChild(main2.firstChild);
        }
        main2.classList.remove("sakrij");
        const index = parseInt(event.target.getAttribute("data-index"));
        listaGrupaLinkova[index].nacrtajGrupuLinkova(main2);
      });
    }
  });

  divDole.appendChild(buttonAddGroup);

  leviDiv.appendChild(divGore);
  leviDiv.appendChild(divDole);
}
