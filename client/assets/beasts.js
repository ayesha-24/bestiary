function getBeastData() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
}

async function fetchBeastData() {
  const findId = await getBeastData();
  const response = await fetch(`http://localhost:3000/beasts/${findId}`);
  const beastData = await response.json();
  return beastData;
}

async function displayNewInfo(info) {
  const newBeast = await fetchBeastData();
  const name = document.getElementById(info);
  const elem = document.createElement("li");
  elem.textContent = newBeast[info];
  name.appendChild(elem);
}

displayNewInfo("name");
displayNewInfo("habitat");
displayNewInfo("dangerRating");
displayNewInfo("description");
displayNewInfo("encounterRate");
displayNewInfo("loot");

// async function deleteBeast(e) {
//   e.preventDefault();

//   const options = {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const findId = await getBeastData();
//   const response = await fetch(
//     `http://localhost:3000/beasts/${findId}`,
//     options
//   );

//   if (response.status == 201) {
//     alert("Beast banished.");
//     window.location.reload();
//   }
// }

// async function removeItem(id) {
//   try {
//     let response = await fetch(`http://localhost:3000/beasts/${id}`, {
//       method: "DELETE",
//     });
//   } catch (err) {}
// }

// const form = document.querySelector("#deletion");
// form.addEventListener("submit", removeItem);
