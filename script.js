const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
async function getData() {
  let name = document.getElementById("searchbox").value;
  let result = document.getElementById("result");
  result.innerHTML = "";
  if (name == "") {
    alert("Please enter the name");
  } else {
    try {
      result.innerHTML = `<h3>Loading....</h3>`
      let response = await fetch(`https://api.nationalize.io?name=${name}`);
      let data = await response.json();
      if (data.country.length == 0) {
        result.innerHTML = "";
        result.innerHTML += "<h1>Sorry No result Found</h1>";
      } else if (data.country.length == 1) {
        result.innerHTML = "";
        let ele = data.country[0];
        result.innerHTML += `
            <div class="card-container">
                <p>Country Name:${regionNames.of(ele.country_id)}</p>
                <p>probability:${ele.probability}</p>
            </div>`;
      } else {
        result.innerHTML = "";
        let fisrtTwo = data.country.slice(0, 2);
        fisrtTwo.forEach(function (ele) {
          result.innerHTML += `
            <div class="card-container">
                <p>Country Name: ${regionNames.of(ele.country_id)}</p>
                <p>probability: ${ele.probability}</p>
            </div>`;
        });
      }
    } catch (err) {
      console.log("Someting went wrong:" + err);
    }
  }
}
document.getElementById("search").addEventListener("click", getData);
