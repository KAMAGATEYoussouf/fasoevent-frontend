// État global de l'application
const app = {
    currentUser: null,
    events: [
        {
            id: 1,
            title: "Festival de Musique Traditionnelle",
            description: "Un festival célébrant la richesse musicale du Burkina Faso avec des artistes locaux et internationaux.",
            start_date: "2024-09-15",
            end_date: "2024-09-17",
            price: 5000,
            image: null,
            is_active: true,
            city: { name: "Ouagadougou" }
        },
        {
            id: 2,
            title: "Conférence Tech Innovation",
            description: "Rencontre des acteurs de la tech burkinabè pour échanger sur l'innovation.",
            start_date: "2024-09-20",
            end_date: "2024-09-20",
            price: 2000,
            image: null,
            is_active: true,
            city: { name: "Bobo-Dioulasso" }
        },
        {
            id: 3,
            title: "Exposition d'Art Contemporain",
            description: "Découvrez les œuvres d'artistes burkinabè contemporains.",
            start_date: "2024-10-01",
            end_date: "2024-10-15",
            price: 1000,
            image: null,
            is_active: true,
            city: { name: "Koudougou" }
        }
    ],
    cities: [
        { id: 1, name: "Ouagadougou" },
        { id: 2, name: "Bobo-Dioulasso" },
        { id: 3, name: "Koudougou" },
        { id: 4, name: "Banfora" }
    ]
};

// Réservation d'événement
function reserveEvent(eventId) {
    if (!app.currentUser) {
        alert('Veuillez vous connecter pour réserver un événement.');
        window.location.href = 'login.html';
        return;
    }
    alert('Réservation effectuée avec succès !');
}

// Gestion de la connexion
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        if (email.includes('admin')) {
            app.currentUser = { name: 'Admin', role: 'admin', email: email };
            window.location.href = 'admin.html';
        } else {
            app.currentUser = { name: 'Utilisateur', role: 'user', email: email };
            window.location.href = 'user.html';
        }
        updateNavigation();
    }
}

// Gestion de l'inscription
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    if (name && email && password) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        window.location.href = 'login.html';
    }
}

// Mise à jour de la navigation
function updateNavigation() {
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (app.currentUser) {
            authLink.textContent = 'Dashboard';
            authLink.href = app.currentUser.role === 'admin' ? 'admin.html' : 'user.html';
        } else {
            authLink.textContent = 'Connexion';
            authLink.href = 'login.html';
        }
    }
}

// Déconnexion
function logout() {
    app.currentUser = null;
    updateNavigation();
    window.location.href = 'index.html';
}

// Administration - Affichage des sections
function showAdminSection(section) {
    document.querySelectorAll('.admin-menu-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    if (section === 'events') {
        loadAdminEvents();
    } else if (section === 'cities') {
        loadAdminCities();
    }
}

// Administration - Gestion des événements
function loadAdminEvents() {
    const content = document.getElementById('admin-content');
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2>Gestion des Événements</h2>
            <button class="btn" onclick="showAddEventModal()">Ajouter un événement</button>
        </div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Ville</th>
                    <th>Date début</th>
                    <th>Prix</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="events-table-body">
                ${app.events.map(event => `
                    <tr>
                        <td>${event.title}</td>
                        <td>${event.city.name}</td>
                        <td>${formatDate(event.start_date)}</td>
                        <td>${event.price ? formatPrice(event.price) + ' FCFA' : 'Gratuit'}</td>
                        <td><span class="${event.is_active ? 'status-active' : 'status-inactive'}">${event.is_active ? 'Actif' : 'Inactif'}</span></td>
                        <td>
                            <button class="btn btn-secondary" style="margin-right: 0.5rem;" onclick="editEvent(${event.id})">Modifier</button>
                            <button class="btn" style="background: ${event.is_active ? '#e74c3c' : '#27ae60'};" onclick="toggleEventStatus(${event.id})">${event.is_active ? 'Désactiver' : 'Activer'}</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Administration - Gestion des villes
function loadAdminCities() {
    const content = document.getElementById('admin-content');
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2>Gestion des Villes</h2>
            <button class="btn" onclick="showAddCityModal()">Ajouter une ville</button>
        </div>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="cities-table-body">
                ${app.cities.map(city => `
                    <tr>
                        <td>${city.name}</td>
                        <td>
                            <button class="btn btn-secondary" onclick="editCity(${city.id})">Modifier</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Modal pour ajouter un événement
function showAddEventModal() {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>Ajouter un Événement</h2>
        <form id="add-event-form">
            <div class="form-group">
                <label for="event-title">Titre</label>
                <input type="text" id="event-title" name="title" required>
            </div>
            <div class="form-group">
                <label for="event-description">Description</label>
                <textarea id="event-description" name="description" rows="4"></textarea>
            </div>
            <div class="form-group">
                <label for="event-start-date">Date de début</label>
                <input type="date" id="event-start-date" name="start_date">
            </div>
            <div class="form-group">
                <label for="event-end-date">Date de fin</label>
                <input type="date" id="event-end-date" name="end_date">
            </div>
            <div class="form-group">
                <label for="event-price">Prix (FCFA)</label>
                <input type="number" id="event-price" name="price" min="0">
            </div>
            <div class="form-group">
                <label for="event-city">Ville</label>
                <select id="event-city" name="city_id" required>
                    <option value="">Sélectionner une ville</option>
                    ${app.cities.map(city => `<option value="${city.id}">${city.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="event-active" name="is_active" checked> Événement actif
                </label>
            </div>
            <button type="submit" class="btn">Ajouter l'événement</button>
        </form>
    `;
    
    document.getElementById('modal').style.display = 'block';
    
    document.getElementById('add-event-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const cityId = parseInt(formData.get('city_id'));
        const city = app.cities.find(c => c.id === cityId);
        
        const newEvent = {
            id: app.events.length + 1,
            title: formData.get('title'),
            description: formData.get('description'),
            start_date: formData.get('start_date'),
            end_date: formData.get('end_date'),
            price: parseFloat(formData.get('price')) || null,
            image: null,
            is_active: formData.get('is_active') === 'on',
            city: city
        };
        
        app.events.push(newEvent);
        closeModal();
        loadAdminEvents();
        alert('Événement ajouté avec succès !');
    });
}

// Modal pour ajouter une ville
function showAddCityModal() {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>Ajouter une Ville</h2>
        <form id="add-city-form">
            <div class="form-group">
                <label for="city-name">Nom de la ville</label>
                <input type="text" id="city-name" name="name" required>
            </div>
            <button type="submit" class="btn">Ajouter la ville</button>
        </form>
    `;
    
    document.getElementById('modal').style.display = 'block';
    
    document.getElementById('add-city-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newCity = {
            id: app.cities.length + 1,
            name: formData.get('name')
        };
        
        app.cities.push(newCity);
        closeModal();
        loadAdminCities();
        alert('Ville ajoutée avec succès !');
    });
}

// Édition d'un événement
function editEvent(eventId) {
    const event = app.events.find(e => e.id === eventId);
    if (!event) return;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>Modifier l'Événement</h2>
        <form id="edit-event-form">
            <div class="form-group">
                <label for="edit-event-title">Titre</label>
                <input type="text" id="edit-event-title" name="title" value="${event.title}" required>
            </div>
            <div class="form-group">
                <label for="edit-event-description">Description</label>
                <textarea id="edit-event-description" name="description" rows="4">${event.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="edit-event-start-date">Date de début</label>
                <input type="date" id="edit-event-start-date" name="start_date" value="${event.start_date || ''}">
            </div>
            <div class="form-group">
                <label for="edit-event-end-date">Date de fin</label>
                <input type="date" id="edit-event-end-date" name="end_date" value="${event.end_date || ''}">
            </div>
            <div class="form-group">
                <label for="edit-event-price">Prix (FCFA)</label>
                <input type="number" id="edit-event-price" name="price" min="0" value="${event.price || ''}">
            </div>
            <div class="form-group">
                <label for="edit-event-city">Ville</label>
                <select id="edit-event-city" name="city_id" required>
                    ${app.cities.map(city => 
                        `<option value="${city.id}" ${city.name === event.city.name ? 'selected' : ''}>${city.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" id="edit-event-active" name="is_active" ${event.is_active ? 'checked' : ''}> Événement actif
                </label>
            </div>
            <button type="submit" class="btn">Modifier l'événement</button>
        </form>
    `;
    
    document.getElementById('modal').style.display = 'block';
    
    document.getElementById('edit-event-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const cityId = parseInt(formData.get('city_id'));
        const city = app.cities.find(c => c.id === cityId);
        
        event.title = formData.get('title');
        event.description = formData.get('description');
        event.start_date = formData.get('start_date');
        event.end_date = formData.get('end_date');
        event.price = parseFloat(formData.get('price')) || null;
        event.is_active = formData.get('is_active') === 'on';
        event.city = city;
        
        closeModal();
        loadAdminEvents();
        alert('Événement modifié avec succès !');
    });
}

// Édition d'une ville
function editCity(cityId) {
    const city = app.cities.find(c => c.id === cityId);
    if (!city) return;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>Modifier la Ville</h2>
        <form id="edit-city-form">
            <div class="form-group">
                <label for="edit-city-name">Nom de la ville</label>
                <input type="text" id="edit-city-name" name="name" value="${city.name}" required>
            </div>
            <button type="submit" class="btn">Modifier la ville</button>
        </form>
    `;
    
    document.getElementById('modal').style.display = 'block';
    
    document.getElementById('edit-city-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        city.name = formData.get('name');
        
        closeModal();
        loadAdminCities();
        alert('Ville modifiée avec succès !');
    });
}

// Basculer le statut d'un événement
function toggleEventStatus(eventId) {
    const event = app.events.find(e => e.id === eventId);
    if (event) {
        event.is_active = !event.is_active;
        loadAdminEvents();
        alert(`Événement ${event.is_active ? 'activé' : 'désactivé'} avec succès !`);
    }
}

// Fermer le modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fermer le modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fonctions utilitaires
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price);
}

// Gestion responsive du menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    if (window.location.pathname.includes('admin.html')) {
        loadAdminEvents();
    }
    // Ajouter un bouton hamburger pour mobile
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        const hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;';
        hamburger.onclick = toggleMobileMenu;
        nav.appendChild(hamburger);
    }
});