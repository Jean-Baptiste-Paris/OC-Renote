# Plan d'implementation front-end React

## 1. Setup technique
- [ ] Installer React, React DOM, React Router
- [ ] Installer Zustand
- [ ] Configurer Vite pour supporter JSX
- [ ] Creer main.jsx (point de montage)
- [ ] Creer App.jsx (routeur)

## 2. Couche services
- [ ] services/api.js — client HTTP centralise (token Bearer, base URL)

## 3. Stores Zustand
- [ ] store/useAuthStore.js — token, user, login(), register(), logout()
- [ ] store/useNoteStore.js — notes[], loading, error, fetchNotes(), createNote(), deleteNote()
- [ ] store/useTagStore.js — tags[], fetchTags(), createTag()

## 4. Composants auth
- [ ] components/auth/LoginForm.jsx
- [ ] components/auth/RegisterForm.jsx

## 5. Composants layout
- [ ] components/layout/AppLayout.jsx
- [ ] components/layout/Sidebar.jsx
- [ ] components/layout/Header.jsx

## 6. Composants metier
- [ ] components/notes/NoteList.jsx
- [ ] components/notes/NoteItem.jsx
- [ ] components/notes/NoteForm.jsx
- [ ] components/tags/TagForm.jsx

## 7. Composants settings
- [ ] components/settings/ProfileForm.jsx
- [ ] components/settings/PasswordForm.jsx
- [ ] components/settings/AppearanceToggle.jsx

## 8. Pages
- [ ] pages/LoginPage.jsx
- [ ] pages/RegisterPage.jsx
- [ ] pages/DashboardPage.jsx
- [ ] pages/SettingsPage.jsx

## 9. Nettoyage
- [ ] Supprimer app/Livewire/Notes.php
- [ ] Supprimer app/Livewire/TagForm.php
- [ ] Supprimer views/livewire/notes.blade.php
- [ ] Supprimer views/livewire/tag-form.blade.php
- [ ] Supprimer views Volt auth (login, register, forgot-password, etc.)
- [ ] Supprimer views Volt settings (profile, password, appearance, delete-user-form)
- [ ] Modifier dashboard.blade.php → point de montage React

## Ordre d'implementation recommande
1 → 2 → 3 (auth store) → 4 → tester login
→ 3 (note/tag stores) → 6 → tester CRUD
→ 5 → 8 → 7 → 9

## Routes API disponibles
### Guest
- POST /api/login
- POST /api/register
- POST /api/forgot-password
- POST /api/reset-password

### Auth (Bearer token)
- POST /api/logout
- GET/POST /api/notes
- GET/PUT/DELETE /api/notes/{id}
- GET/POST /api/tags
- GET/PUT/DELETE /api/tags/{id}
- GET/PUT /api/profile
- DELETE /api/profile
- PUT /api/password
