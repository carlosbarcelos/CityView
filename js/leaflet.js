var mymap = L.map('mapid').setView([-71.0589, 42.3601], 9);

L.tileLayer('mapbox://surv-mqp.4tm7g9jf', {
    maxZoom: 18,
    id: 'surv-mqp.5lmjns02',
    accessToken: 'pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g'
}).addTo(mymap);
