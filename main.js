const now = new Date();
const dateFormatter = new Intl.DateTimeFormat("ar-DZ", {
  dateStyle: "long",
});
const timeFormatter = new Intl.DateTimeFormat("ar-DZ", {
  timeStyle: "short",
});

let date = document.getElementById("date");
let time = document.getElementById("time");

date.innerHTML = dateFormatter.format(now);
time.innerHTML = timeFormatter.format(now);

const wilayas = [
  { arabic: "أدرار", french: "Adrar" },
  { arabic: "الشلف", french: "Chlef" },
  { arabic: "الأغواط", french: "Laghouat" },
  { arabic: "أم البواقي", french: "Oum El Bouaghi" },
  { arabic: "باتنة", french: "Batna" },
  { arabic: "بجاية", french: "Béjaïa" },
  { arabic: "بسكرة", french: "Biskra" },
  { arabic: "بشار", french: "Béchar" },
  { arabic: "البليدة", french: "Blida" },
  { arabic: "البويرة", french: "Bouira" },
  { arabic: "تمنراست", french: "Tamanrasset" },
  { arabic: "تبسة", french: "Tébessa" },
  { arabic: "تلمسان", french: "Tlemcen" },
  { arabic: "تيارت", french: "Tiaret" },
  { arabic: "تيزي وزو", french: "Tizi Ouzou" },
  { arabic: "الجزائر", french: "Alger" },
  { arabic: "الجلفة", french: "Djelfa" },
  { arabic: "جيجل", french: "Jijel" },
  { arabic: "سطيف", french: "Sétif" },
  { arabic: "سعيدة", french: "Saïda" },
  { arabic: "سكيكدة", french: "Skikda" },
  { arabic: "سيدي بلعباس", french: "Sidi Bel Abbès" },
  { arabic: "عنابة", french: "Annaba" },
  { arabic: "قالمة", french: "Guelma" },
  { arabic: "قسنطينة", french: "Constantine" },
  { arabic: "المدية", french: "Médéa" },
  { arabic: "مستغانم", french: "Mostaganem" },
  { arabic: "المسيلة", french: "M'Sila" },
  { arabic: "معسكر", french: "Mascara" },
  { arabic: "ورقلة", french: "Ouargla" },
  { arabic: "وهران", french: "Oran" },
  { arabic: "البيض", french: "El Bayadh" },
  { arabic: "إليزي", french: "Illizi" },
  { arabic: "برج بوعريريج", french: "Bordj Bou Arréridj" },
  { arabic: "بومرداس", french: "Boumerdès" },
  { arabic: "الطارف", french: "El Tarf" },
  { arabic: "تندوف", french: "Tindouf" },
  { arabic: "تيسمسيلت", french: "Tissemsilt" },
  { arabic: "الوادي", french: "El Oued" },
  { arabic: "خنشلة", french: "Khenchela" },
  { arabic: "سوق أهراس", french: "Souk Ahras" },
  { arabic: "تيبازة", french: "Tipaza" },
  { arabic: "ميلة", french: "Mila" },
  { arabic: "عين الدفلى", french: "Aïn Defla" },
  { arabic: "النعامة", french: "Naâma" },
  { arabic: "عين تموشنت", french: "Aïn Témouchent" },
  { arabic: "غرداية", french: "Ghardaïa" },
  { arabic: "غليزان", french: "Relizane" },
];

let select = document.querySelector("[name='city-select']");

wilayas.forEach((wilaya) => {
  select.innerHTML += `<option value="${wilaya.french}">${wilaya.arabic}</option>`;
});

select.addEventListener("change", (event) => {
  let selectedValue = event.target.value;
  getPrayerTimesOfCitie(selectedValue);
});
window.onload = () => {
  getPrayerTimesOfCitie(select.value);
};

function getPrayerTimesOfCitie(city) {
  axios
    .get("https://api.aladhan.com/v1/timingsByCity?country=DZ&city=" + city)
    .then((response) => {
      // console.log(response.data.data.date);
      let time = response.data.data.timings;

      document.querySelector(".Asr").innerHTML = time.Asr;
      document.querySelector(".Dhuhr").innerHTML = time.Dhuhr;
      document.querySelector(".Fajr").innerHTML = time.Fajr;
      document.querySelector(".Isha").innerHTML = time.Isha;
      document.querySelector(".Maghrib").innerHTML = time.Maghrib;
      document.querySelector(".Sunrise").innerHTML = time.Sunrise;

      document.querySelector("#city-name").innerHTML =
        select.options[select.selectedIndex].text;
    })
    .catch((error) => {
      console.error(error);
    });
}
