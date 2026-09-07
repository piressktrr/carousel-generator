# Implementation Plan: Per-Slide Signatures, Viewport Isolation & Canvas Design Themes

**Branch**: `007-slide-signatures-canvas-themes` | **Date**: 2026-09-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/007-slide-signatures-canvas-themes/spec.md`

## Summary

This feature resolves three key user needs:
1. **Per-Slide Signature Customization**: Enables creators to set individual anchor positions (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`, or `hidden`) for the author signature on each slide independently, while keeping a global default.
2. **Strict Viewport Isolation**: Eliminates the browser scroll leak glitch where collapsed sidebars peek or shift the layout during slide clicking, replacing `scrollIntoView()` with local horizontal container scrolling and strict CSS layout containment (`visibility: hidden`, `width: 0`, `contain: strict`).
3. **Canvas Design Philosophy Themes**: Integrates artistic design movement presets (Chromatic Silence, Brutalist Joy, Kinetic Vapor, Ethereal Aura, Metabolist Space) directly into `CustomThemeBuilder.jsx`, following the principles from the `canvas-design` skill.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 19.x (JSX)
**Primary Dependencies**: React 19, Lucide React, Tailwind CSS / PostCSS, html-to-image, jszip, jspdf
**Storage**: IndexedDB (`storageService.js`)
**Testing**: Quickstart verification scenarios + build check (`npm run build`)
**Target Platform**: Modern Web Browsers (Desktop and Tablet)
**Project Type**: Single Page Web Application (Vite + React)
**Performance Goals**: Slide centering animation < 200ms, zero layout shift (CLS = 0), 100% hidden drawer containment

## Constitution Check

- **Principle I (Clean Architecture & Functional SRP)**: PASS. Business rules and positioning logic remain in pure services/constants; UI components consume props cleanly.
- **Principle II (KISS / YAGNI)**: PASS. Solves the scroll issue using native `scrollTo` on the container rather than importing heavy scrolling libraries.
- **Principle III (Concurrency & Resilience)**: PASS. Debounced autosave safely persists slide overrides to IndexedDB.
- **Principle IV (Data Versioning)**: PASS. `profilePosition` is optional; existing saved slides without it gracefully fall back to the global `profile.position`.
- **Principle VI (Feature Branch Isolation)**: PASS. Operating on dedicated branch `007-slide-signatures-canvas-themes`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None*    | N/A        | Direct CSS containment and native container `scrollTo` are minimal and standard |
