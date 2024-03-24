import { Link } from "./Link.js";

export class GrupaLinkova {
  constructor(id, imeGrupe, linkovi) {
    this.id = id;
    this.imeGrupe = imeGrupe;
    this.linkovi = linkovi.map(
      (link) => new Link(link.imeLinka, link.adresaLinka, this.id)
    );
  }

  nacrtajGrupuLinkova(imeDiv) {
    const div = document.createElement("div");
    div.classList.add("grupa-linkova");

    const divZaglavlje = document.createElement("div");
    divZaglavlje.classList.add("grupa-linkova-zaglavlje");
    const divZaglavljeLevo = document.createElement("div");
    divZaglavljeLevo.classList.add("grupa-linkova-zaglavlje-levo");
    const divZaglavljeDesno = document.createElement("div");
    divZaglavljeDesno.classList.add("grupa-linkova-zaglavlje-desno");

    const divLista = document.createElement("div");
    divLista.classList.add("grupa-linkova-lista");

    const imeGrupe = document.createElement("h3");
    imeGrupe.textContent = this.imeGrupe;
    divZaglavljeLevo.appendChild(imeGrupe);

    const dodajLink = document.createElement("button");
    dodajLink.innerText = "Dodaj Link";
    dodajLink.classList.add("button-dodaj");
    dodajLink.setAttribute("data-value", this.id);

    dodajLink.addEventListener("click", async () => {
      const imeLinka = prompt("Unesite ime linka:");
      if (imeLinka === null) return;

      const adresaLinka = prompt("Unesite adresu linka:");
      if (adresaLinka === null) return;

      const data = {
        imeLinka: imeLinka,
        adresaLinka: adresaLinka,
      };

      try {
        const response = await fetch(
          `https://localhost:7251/api/Link/${this.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const listaElement = document.querySelector(".grupa-linkova-lista");
        const linkObjekat = new Link(data.imeLinka, data.adresaLinka, this.id);
        linkObjekat.nacrtajLink(listaElement);
      } catch (error) {
        console.error("Došlo je do greške:", error);
      }
    });

    const obrisiGrupu = document.createElement("button");
    obrisiGrupu.innerText = "Obrisi grupu";
    obrisiGrupu.classList.add("button-obrisi");
    obrisiGrupu.setAttribute("data-value", this.id);

    obrisiGrupu.addEventListener("click", async () => {
      const value = obrisiGrupu.getAttribute("data-value");
      const response = await fetch(
        `https://localhost:7251/api/Link?id=${value}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      while (imeDiv.firstChild) {
        imeDiv.removeChild(imeDiv.firstChild);
      }

      const buttons = document.querySelectorAll("button");
      let foundButton;
      buttons.forEach((button) => {
        if (button.innerText === this.imeGrupe) {
          foundButton = button;
          return;
        }
      });
      if (foundButton) {
        foundButton.remove();
        document.querySelector(".hero-main-2").classList.add("sakrij");
      } else {
        console.log("Dugme nije pronađeno.");
      }
    });

    divZaglavljeDesno.appendChild(obrisiGrupu);
    divZaglavljeDesno.appendChild(dodajLink);

    div.appendChild(divZaglavlje);
    div.appendChild(divLista);
    divZaglavlje.appendChild(divZaglavljeLevo);
    divZaglavlje.appendChild(divZaglavljeDesno);

    this.linkovi.forEach((element) => {
      element.nacrtajLink(divLista);
    });

    imeDiv.appendChild(div);
  }
}
