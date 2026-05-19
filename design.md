# Romina Melul - Design System

## Overview

Portfolio website for Romina Claudia Melul, a psychocorporal therapist specializing in integral well-being and body-mind accompaniment. The site showcases her services, about section, and contact information.

---

## Color Palette

### Light Mode

| Token                    | Value (OKLCH)  | Usage                                             |
| ------------------------ | -------------- | ------------------------------------------------- |
| `--background`           | `98 0.005 200` | Page background - soft white/cream                |
| `--foreground`           | `25 0.02 220`  | Primary text - dark teal                          |
| `--primary`              | `65 0.14 200`  | Primary actions, links - turquoise (from logo)    |
| `--primary-foreground`   | `100 0 0`      | Text on primary - white                           |
| `--secondary`            | `92 0.03 200`  | Secondary elements - light turquoise              |
| `--secondary-foreground` | `35 0.08 200`  | Text on secondary                                 |
| `--accent`               | `78 0.15 75`   | Accent/highlights - golden/orange (from logo sun) |
| `--accent-foreground`    | `25 0.05 75`   | Text on accent                                    |
| `--muted`                | `95 0.01 200`  | Muted backgrounds                                 |
| `--muted-foreground`     | `50 0.02 220`  | Muted text                                        |
| `--card`                 | `100 0 0`      | Card backgrounds - pure white                     |
| `--card-foreground`      | `25 0.02 220`  | Card text                                         |
| `--border`               | `90 0.02 200`  | Borders - light gray-teal                         |
| `--ring`                 | `65 0.14 200`  | Focus rings                                       |

### Dark Mode

| Token          | Value (OKLCH)  | Usage                       |
| -------------- | -------------- | --------------------------- |
| `--background` | `18 0.02 220`  | Dark background - deep teal |
| `--foreground` | `95 0.005 200` | Text - soft white           |
| `--primary`    | `70 0.14 200`  | Brighter turquoise          |
| `--accent`     | `75 0.15 75`   | Brighter gold               |

---

## Typography

### Font Stack

- **Headings / Body**: `Lora` (serif) - Elegant, warm, therapeutic feel
- **UI / Small text**: `Inter` (sans-serif) - Clean, readable

### Scale

```
text-xs    -> 0.75rem (12px)
text-sm    -> 0.875rem (14px)
text-base  -> 1rem (16px)
text-lg    -> 1.125rem (18px)
text-xl    -> 1.25rem (20px)
text-2xl   -> 1.5rem (24px)
text-3xl   -> 1.875rem (30px)
text-4xl   -> 2.25rem (36px)
text-5xl   -> 3rem (48px)
text-6xl   -> 3.75rem (60px)
```

### Headings

- **H1**: `text-4xl md:text-5xl font-semibold`
- **H2**: `text-3xl sm:text-4xl lg:text-5xl font-semibold`
- **H3**: `text-2xl font-semibold`
- **Body**: `text-lg leading-relaxed`

### Decorative Elements

- **Section labels**: `text-sm tracking-widest uppercase font-medium`
- **Dividers**: `w-16 h-0.5 bg-accent mx-auto mt-6` (horizontal line)
- **Subtle accents**: Small icons, badges with rounded-full

---

## Spacing System

Based on Tailwind's default scale:

```
py-20      -> 5rem vertical (sections)
py-24      -> 6rem (larger sections)
py-28      -> 7rem
mb-12      -> 3rem (section margins)
mb-16      -> 4rem (larger margins)
gap-6      -> 1.5rem (between cards)
gap-8      -> 2rem (larger gaps)
p-6        -> 1.5rem (card padding)
p-8        -> 2rem (larger padding)
```

### Container

- `container mx-auto px-4 md:px-6` - Responsive container
- `max-w-6xl` - Max content width (1536px)
- `max-w-lg` (32rem) - Narrower sections
- `max-w-2xl` (42rem) - Modals, quotes

---

## Components

### Buttons

- **Primary**: `bg-primary text-primary-foreground px-6 py-3 rounded-full`
- **Secondary**: `bg-secondary text-secondary-foreground`
- **Ghost**: No background, hover shows subtle bg

### Cards

- `bg-card rounded-2xl shadow-xl hover:shadow-2xl`
- Borderless by default (`border-none`)
- Hover: `hover:scale-[1.02]` for emphasis
- Content: Header with title, body with description

### Modals (Dialog)

- `max-w-2xl max-h-[85vh] overflow-y-auto`
- `p-0 bg-card border-none rounded-2xl`
- Hero image header: `h-56 w-full` with gradient overlay
- Content padding: `p-6 pb-8`

### Section Patterns

```
Section:
  - container -> max-w-6xl mx-auto
  - Header: centered with label + h2 + divider line
  - Content: grid or flex layout
  - Spacing: py-24, mb-16 between elements
```

---

## Visual Effects

### Gradients

- **Card overlays**: `bg-gradient-to-t from-card/90 to-transparent`
- **Quote boxes**: `from-primary/5 to-accent/5`
- **Modal hero**: `bg-gradient-to-t from-card via-card/50 to-transparent`

### Shadows

- **Cards**: `shadow-xl hover:shadow-2xl`
- **Images**: `shadow-xl`
- **Complement cards**: `shadow-md hover:shadow-lg`

### Animations

- **Card hover**: `hover:scale-[1.02] transition-all duration-300`
- **Scroll**: `html { scroll-behavior: smooth }`
- **Interactive elements**: Smooth transitions on hover

### Border Radius

- `rounded-2xl` - Cards, images
- `rounded-full` - Pills, badges
- `rounded-3xl` - Large containers
- Base: `0.75rem` (12px)

---

## Layout Structure

### Page Sections (in order)

1. **Header/Navigation** - Sticky nav with logo and menu
2. **Hero** - Full viewport intro with CTA
3. **About Me** - Split layout (image left, text right)
4. **Services** - Main services + complementary practices grid
5. **Contact/Footer** - Contact info and links

### Responsive Breakpoints

```
sm  -> 640px  (mobile landscape)
md  -> 768px  (tablet)
lg  -> 1024px (desktop)
xl  -> 1280px
2xl -> 1536px
```

### Grid Layouts

- **Services**: `md:grid-cols-2` (2 columns on tablet+)
- **Complements**: `sm:grid-cols-2 lg:grid-cols-4` (2x2 mobile, 4 col desktop)
- **About**: `lg:grid-cols-12` (image 4 cols, content 8 cols)

---

## Iconography

Using **Lucide React** for consistent icons:

- `User` - Individual services
- `Users` - Group services
- `Heart` - Reading
- `Sparkles` - Yoga, Bach flowers, Movement
- `Menu`, `X` - Mobile navigation
- `Phone`, `Mail`, `MapPin` - Contact info

Custom icons in `/icons8-*.png` format for complement practices.

---

## Images

### Assets

- Hero images: `/images/therapy-1.jpg`, `/images/therapy-2.jpg`
- Profile: `/images/romina_portada.webp`
- Logo: `/images/logo.png`
- Icons: `/icons8-*.png`

### Image Treatment

- **Cards**: `aspect-[3/4]`, `object-cover`, `rounded-2xl`
- **Modals**: Full-width hero `h-56`, gradient overlay
- **Service cards**: `h-64`, gradient overlay for text readability

---

## Dark Mode

Full dark mode support via CSS variables. Toggle not yet implemented but design is ready.

---

## Tailwind Version

Tailwind CSS v4 with `@import 'tailwindcss'` syntax and `@theme inline` for custom properties.

---

## Notes

- Currently experiencing Lora font fetch issue from Google Fonts (needs resolution)
- Inter font working as fallback
- No dark mode toggle implemented yet
- All sections are responsive and mobile-first
