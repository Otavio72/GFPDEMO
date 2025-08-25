document.addEventListener("DOMContentLoaded", () => {

  // Inicializa Swiper
  const swiper = new Swiper('.Swiper_extrair_dados', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Inicializa os gráficos
  initCharts();
});

function initCharts() {
  const ctxPizza = document.getElementById('graficoPizza')?.getContext('2d');
  const ctxRadar = document.getElementById('graficoRadar')?.getContext('2d');
  const ctxLinha = document.getElementById('graficoLinhas')?.getContext('2d');

  if (!ctxPizza || !ctxRadar || !ctxLinha) return;

const labels = ['CPFL', 'VIVO', 'Naturgy', "Energisa"]; // nomes das fatias do pizza chart
const valores = [50, 80, 65, 90];

  // Gráfico Pizza
  new Chart(ctxPizza, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Valor',
        data: valores,
        backgroundColor: ['#daa520', '#8a0303', '#D2691E','#008000'],
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#333', font: { size: 14 }, display: true }
        },
        tooltip: {
          backgroundColor: '#B2222',
          titleColor: '#FFD700',
          bodyColor: '#fff'
        }
      }
    }
  });


  // Gráfico Radar
  new Chart(ctxRadar, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Valores',
        data: valores,
        backgroundColor: 'rgba(255, 180, 0, 0.4)',
        borderColor: '#8a0303',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: { color: '#000000' },
          grid: { color: '#000000' },
          pointLabels: { color: '#000000', font: { size: 10 } },
          ticks: { backdropColor: 'rgba(255, 255, 255, 0.8)' }
        }
      },
      plugins: {
        legend: { display: true }
      }
    }
  });

  // Gráfico Linhas

  const cores = [
'#daa520', '#8a0303', '#D2691E','#008000'  
];

  const chart = new Chart(ctxLinha, {
    type: 'line',
    data: {
      labels:['01/06', '01/07', '01/08','01/09', '01/10', '01/11'],
      datasets : [
{
  label: 'CPFL',
  data: [12, 15, 18, 22, 25, 28], // aumento gradual
  fill: true
},
{
  label: 'VIVO',
  data: [8, 10, 12, 14, 16, 18], // crescimento suave
  fill: true
},
{
  label: 'Energisa',
  data: [20, 22, 25, 27, 30, 32], // crescimento consistente
  fill: true
},
{
  label: 'Naturgy',
  data: [5, 7, 9, 12, 15, 18], // crescimento mais discreto
  fill: true
}
      ]

    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  chart.data.datasets.forEach((ds, index) => {
    ds.borderColor = cores[index % cores.length];

  const grad = ctxLinha.createLinearGradient(0, 0, 0, ctxLinha.canvas.height);
  grad.addColorStop(0, cores[index % cores.length] + '80'); // topo mais opaco
  grad.addColorStop(1, cores[index % cores.length] + '10'); // base mais transparente

  ds.backgroundColor = grad;
  ds.tension = 0.3;
});
    chart.update();
}
