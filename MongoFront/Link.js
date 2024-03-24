export class Link {
  constructor(imeLinka, adresaLinka, idGrupe) {
    this.imeLinka = imeLinka;
    this.adresaLinka = adresaLinka;
    this.idGrupe = idGrupe;
  }

  nacrtajLink(imeDiv) {
    const div = document.createElement("div");
    div.classList.add("link-stavka");

    const divLevi = document.createElement("div");
    divLevi.classList.add("link-stavka-levo");

    const divDesni = document.createElement("div");
    divDesni.classList.add("link-stavka-desno");

    const paragraph = document.createElement("p");
    paragraph.textContent = this.imeLinka;
    const buttonOpen = document.createElement("button");
    buttonOpen.textContent = "Otvori";
    const buttonRemove = document.createElement("button");
    buttonRemove.textContent = "Ukloni";

    buttonOpen.addEventListener("click", () => {
      window.open(this.adresaLinka, "_blank");
    });

    buttonRemove.addEventListener("click", () => {
      const url = `https://localhost:7251/api/Link?id=${
        this.idGrupe
      }&adresaLinka=${encodeURIComponent(this.adresaLinka)}`;

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          console.log("Uspešno ažuriran link:", data);
        })
        .catch((error) => {
          console.error("Došlo je do greške:", error);
        });

      const zaBrisanje = buttonRemove.parentElement.parentElement;
      zaBrisanje.remove();
    });

    divLevi.appendChild(paragraph);
    divDesni.appendChild(buttonRemove);
    divDesni.appendChild(buttonOpen);

    div.appendChild(divLevi);
    div.appendChild(divDesni);

    imeDiv.appendChild(div);
  }
}
