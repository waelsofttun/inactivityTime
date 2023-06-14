let startInactiveTime = null;
let endInactiveTime = null;
let inactivityData = [];


chrome.idle.onStateChanged.addListener((state) => {
    if (state === 'idle' || state === 'locked') {
      const startInactiveTime = new Date();
      console.log('Inactivité détectée à', startInactiveTime);
      // Enregistrer le moment de début de l'inactivité
      inactivityData.push({ start: startInactiveTime });
    } else if (state === 'active') {
      if (inactivityData.length > 0) {
        const endInactiveTime = new Date();
        const startInactiveTime = inactivityData[inactivityData.length - 1].start;
        const inactiveDuration = endInactiveTime - startInactiveTime;
        console.log('Reprise d\'activité à', endInactiveTime);
        console.log('Durée d\'inactivité:', inactiveDuration / 1000, 'secondes');
        // Enregistrer le moment de fin de l'inactivité et la durée dans le tableau
        inactivityData[inactivityData.length - 1].end = endInactiveTime;
        inactivityData[inactivityData.length - 1].duration = inactiveDuration;
        localStorage.setItem('activityData', JSON.stringify(inactivityData));
      }
    }
  });

  
  console.log('ahlan');