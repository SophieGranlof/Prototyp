document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-form');
    const eventName = document.getElementById('event-name');
    const eventDate = document.getElementById('event-date');
    const eventDescription = document.getElementById('event-description');
    const eventList = document.getElementById('event-list');

    let events = [];

    // Funktion för att uppdatera listan av events
    function updateEventList() {
        eventList.innerHTML = '';
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Datum:</strong> ${event.date}</p>
                <p><strong>Beskrivning:</strong> ${event.description}</p>
                <button class="edit" data-index="${index}">Redigera</button>
                <button class="delete" data-index="${index}">Ta bort</button>
                <button class="share" data-index="${index}">Dela Event</button>
            `;
            eventList.appendChild(li);
        });

        // Lägg till event listeners för redigera, ta bort och dela knappar
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', editEvent);
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', deleteEvent);
        });

        document.querySelectorAll('.share').forEach(button => {
            button.addEventListener('click', shareEvent);
        });
    }

    // Funktion för att lägga till ett event
    function addEvent(event) {
        event.preventDefault();

        const newEvent = {
            name: eventName.value,
            date: eventDate.value,
            description: eventDescription.value
        };

        events.push(newEvent);
        updateEventList();
        eventForm.reset();
    }

    // Funktion för att redigera ett event
    function editEvent(event) {
        const index = event.target.dataset.index;
        const eventToEdit = events[index];

        eventName.value = eventToEdit.name;
        eventDate.value = eventToEdit.date;
        eventDescription.value = eventToEdit.description;

        // Ta bort det gamla eventet innan vi redigerar
        events.splice(index, 1);
        updateEventList();
    }

    // Funktion för att ta bort ett event
    function deleteEvent(event) {
        const index = event.target.dataset.index;
        events.splice(index, 1);
        updateEventList();
    }

    // Funktion för att dela ett event
    function shareEvent(event) {
        const index = event.target.dataset.index;
        const eventToShare = events[index];

        // Kontrollera om navigator.share() är tillgängligt (det är oftast bara tillgängligt på mobila enheter)
        if (navigator.share) {
            navigator.share({
                title: eventToShare.name,
                text: eventToShare.description,
                url: window.location.href  // Dela länken till sidan
            })
            .then(() => {
                alert("Eventet har delats!");
            })
            .catch((error) => {
                console.error("Dela misslyckades:", error);
                alert("Det gick inte att dela eventet.");
            });
        } else {
            alert("Delning stöds inte på denna enhet.");
        }
    }

    eventForm.addEventListener('submit', addEvent);

    updateEventList();  // Initial uppdatering av eventlistan
});
