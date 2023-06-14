

// Include Chart.js
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(chartScript);

chartScript.onload = () => {
const storedData = localStorage.getItem('activityData');
const inactivityData = storedData ? JSON.parse(storedData) : [];

console.log(inactivityData);

// Créer un canvas pour afficher le graphique
const canvas = document.createElement('canvas');
canvas.id = 'chartCanvas';
document.body.appendChild(canvas);

// Récupérer les données d'inactivité pour le graphique
const labels = [];
const durations = [];

inactivityData.forEach((data) => {
    const startTimestamp = new Date(data.start);
    const start = `${startTimestamp.getHours()}:${startTimestamp.getMinutes()}`;
  
 
  const duration = data.duration / 1000; // Convertir en secondes
  labels.push(start);
  durations.push(duration);
});

// Calculer le total de temps d'inactivité
const totalInactivity = (durations.reduce((acc, duration) => acc + duration, 0)/60).toFixed(3);

// Créer le graphique avec Chart.js
const ctx = canvas.getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Duree d\'inactivite',
        data: durations,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duree d\'inactivite (secondes)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Heure',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Graphique d\'inactivite',
      },
    },
  },
});

// Vérifier si le dépassement de temps d'inactivité est supérieur à 20 secondes
const exceededThreshold = totalInactivity > 60;

// Update the values in the popup.html
document.getElementById('inactivityTime').textContent = `Total inactivity time: ${totalInactivity} minutes`;
document.getElementById('exceedingMessage').textContent = `Exceeded threshold: ${exceededThreshold ? 'Yes' : 'No'}`;
}