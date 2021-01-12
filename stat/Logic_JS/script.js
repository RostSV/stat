$(function () {
  $(".noClicked").on("click", start);
});

function start() {
  $(".noClicked").slick({
    slidesToShow: 1,
    infinite: false,
    draggable: false,
  });
  $(".container").removeClass("noClicked");
}

$(function () {
  $(".btn").on("click", searchItem);
});

function searchItem() {
  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/1i6mSrlm6v9oVXFV-udsP-t4y_Y13lYsYrGkgoAqXazQ/od6/public/values?alt=json",
    function (data) {
      data = data["feed"]["entry"];
      //   console.log(data);

      let inputValue = $(".input").val();

      for (let i = 0; i < data.length; i++) {
        if (data[i]["gsx$номертелефона"]["$t"] == inputValue) {
          foundAllTrains = data[i]["gsx$количествотренировоквсего"]["$t"];
          Stretching =
            data[i]["gsx$количествотренировокпоклассическойрастяжкеstretching"][
              "$t"
            ];
          Sky = data[i]["gsx$количествотренировокпорастяжкенагамакахsky"]["$t"];
          Barre = data[i]["gsx$количествотренировокпоbarre"]["$t"];
          trx = data[i]["gsx$количествотренировокпоtrx"]["$t"];
          calories = data[i]["gsx$сожгликалорийнатренировках"]["$t"];
          kilograms = data[i]["gsx$сожглилишнихкилограмм"]["$t"];
          flexibility = data[i]["gsx$добавилисантиметровгибкости"]["$t"];

          foundTopTrains = Math.max(Sky, Barre, trx, Stretching);
          //   console.log(data);

          //   console.log(foundAllTrains,found2020Trains,Stretching,Sky,Barre,trx,calories,kilograms,flexibility)
          // console.log(found2020Trains)

          break;
        }
      }

      if (foundTopTrains) {
        $(".firstSlide_number").html(foundTopTrains);
      }
      console.log("Sky:" + Sky);
      console.log("Barre:" + Barre);
      console.log("trx:" + trx);
      console.log("Stretching:" + Stretching);

      if (
        (Number(Barre) > Number(Sky)) &
        (Number(Barre) > Number(trx)) &
        (Number(Barre) > Number(Stretching))
      ) {
        $(".item1_span").html("Barre");
      } //1 страница

      if (
        (Number(Sky) > Number(Barre)) &
        (Number(Sky) > Number(trx)) &
        (Number(Sky) > Number(Stretching))
      ) {
        $(".item1_span").html("Sky stretching");
      }

      if (
        (Number(trx) > Number(Barre)) &
        (Number(trx) > Number(Sky)) &
        (Number(trx) > Number(Stretching))
      ) {
        $(".item1_span").html("TRX");
      }

      if (
        (Number(Stretching) > Number(Barre)) &
        (Number(Stretching) > Number(trx)) &
        (Number(Stretching) > Number(Sky))
      ) {
        $(".item1_span").html("Stretching");
      }

      if (foundAllTrains) {
        $(".SecondSlide_number").html(foundAllTrains);
      }

      if (calories) {
        $(".calories").html(`${calories} ккал`);
      }

      if (kilograms) {
        $(".weight").html(`${kilograms} кг`);
      }

      if (flexibility) {
        $(".flexibility").html(`${flexibility} см`);
      }

      if (Stretching) {
        $(".item4_1_span").html(Stretching);
      }

      if (Barre !== "") {
        $(".item4_4_span").html(Barre);
      } else {
        $(".barre").css("display", "none");
      }

      if (trx) {
        $(".item4_3_span").html(trx);
      }
      if (Sky) {
        $(".item4_2_span").html(Sky);
      }

      if (Stretching == "" || Stretching == 0 || Stretching == "0") {
        $(".stretching").css("display", "none");
        $(".polotna").css("top", "180px");
        $(".trx").css("top", "280px");
      }

      if (Sky == "" || Sky == "0" || Sky == 0) {
        $(".polotna").css("display", "none");

        $(".trx").css("top", "180px");
      }

      if (trx == "" || trx == "0" || trx == 0) {
        $(".trx").css("display", "none");
      }

      if (Stretching == "" && trx == "" && Sky == "" && Barre == "") {
        $(".item1").css("display", "none");
        $(".item4").css("display", "none");
      }

      if (Stretching == !"" && trx == "" && Sky == "" && Barre == "") {
        $(".item1").css("display", "none");
        $(".item4").css("display", "none");
      }

      if (Stretching == "" && trx == !"" && Sky == "" && Barre == "") {
        $(".item1").css("display", "none");
        $(".item4").css("display", "none");
      }

      if (Stretching == "" && trx == "" && Sky == !"" && Barre == "") {
        $(".item1").css("display", "none");
        $(".item4").css("display", "none");
      }

      if (Stretching == "" && trx == "" && Sky == "" && Barre == !"") {
        $(".item1").css("display", "none");
        $(".item4").css("display", "none");
      }
    }
  );

  setTimeout(function () {
    html2canvas(document.querySelector(".item1")).then((canvas) => {
      document.body.appendChild(canvas);

      link[0].href = canvas.toDataURL();
    });

    html2canvas(document.querySelector(".item2")).then((canvas) => {
      document.body.appendChild(canvas);

      link[1].href = canvas.toDataURL();
    });

    html2canvas(document.querySelector(".item3")).then((canvas) => {
      document.body.appendChild(canvas);

      link[2].href = canvas.toDataURL();
    });

    html2canvas(document.querySelector(".item4")).then((canvas) => {
      document.body.appendChild(canvas);

      link[3].href = canvas.toDataURL();
    });
  }, 5000);
}

let link = document.querySelectorAll(".download");

document.querySelector(".download1").onclick = () => {
  link[0].download = "item1.png";
};

document.querySelector(".download2").onclick = () => {
  link[1].download = "item2.png";
};

document.querySelector(".download3").onclick = () => {
  link[2].download = "item3.png";
};

document.querySelector(".download4").onclick = () => {
  link[3].download = "item4.png";
};





