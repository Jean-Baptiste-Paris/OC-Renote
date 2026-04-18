# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexte pédagogique

Projet OpenClassrooms — parcours Architecte Logiciel.
**Objectif de l'exercice :** refactoriser l'architecture back-end en MVC + SOLID et exposer une API REST. Le but est de démontrer les principes d'architecture, pas de maîtriser Laravel.

**Livrables :** diagrammes de composants (état actuel / cible), analyse pros/cons, plan de refactoring, endpoints REST documentés.

## Project

**Renote** — a note-taking Laravel application where users can create notes, define tags, and associate tags to notes.

## Commands

```bash
# Full dev environment (PHP server + queue worker + Vite)
composer dev

# Run tests
composer test
# or directly
./vendor/bin/pest

# Run a single test file
./vendor/bin/pest tests/Feature/NoteTest.php

# Lint / code style
./vendor/bin/pint

# Asset build
npm run dev       # dev server
npm run build     # production build

# Database
php artisan migrate
php artisan migrate:fresh --seed
```

## Architecture

**Stack**: Laravel 12 + Livewire Volt + Tailwind CSS v4 + Flux UI components + Pest tests + SQLite (dev).

**Key pattern**: almost no traditional controllers — UI logic lives in **Livewire components** under `app/Livewire/`. Volt is used for settings pages (`resources/views/settings/`) and allows single-file component syntax.

**Data model**:
- `User` → has many `Note`
- `Tag` → has many `Note`
- `Note` → belongs to `User` + `Tag`

**Livewire components**:
- `app/Livewire/Notes.php` — CRUD for notes; listens to `tagCreated` event dispatched by TagForm
- `app/Livewire/TagForm.php` — creates tags, dispatches `tagCreated` to refresh note form dropdowns

**Routes** (`routes/web.php`):
- `/` — welcome
- `/dashboard` — authenticated home
- `/notes`, `/tags` — main feature pages (auth-guarded)
- `/settings/*` — Volt-powered profile/password/appearance pages

**Testing**: Pest v3 with in-memory SQLite. CI runs on push/PR to `main` and `develop` via GitHub Actions (`.github/workflows/tests.yml` and `lint.yml`).
