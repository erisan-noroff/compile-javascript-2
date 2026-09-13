# Compile

All developers must adhere to these design specifications when implementing the website. The design specifications are
made by the UX/UI team and approved by the Product Owner. This document outlines the design tokens — colour palette,
typography and spacing — for the Compile website. Component specifications live in Figma.

**Root font size:** 16px.

***

## Colour Palette

### Brand

| Token           | Colour  | Usage                                |
|-----------------|---------|--------------------------------------|
| **Primary**     | #2B59C3 | Primary actions                      |
| Primary hover   | #264EAC |                                      |
| Primary active  | #204392 |                                      |
| **Secondary**   | #FFA62B | Highlights, badges                   |
| **Accent**      | #A2D6F9 | Hover states, tags, small UI details |
| Accent hover    | #B0DCFA |                                      |

### Text

| Token    | Colour              | Usage                                                      |
|----------|---------------------|------------------------------------------------------------|
| **Text** | #E6EDF3             | Headings, post titles, body text                           |
| Muted    | #E6EDF3 70% opacity | Timestamps, author metadata, placeholders, follower counts |

### Background

| Token       | Colour  | Usage                                   |
|-------------|---------|-----------------------------------------|
| **Page**    | #0D1117 | Page background                         |
| **Surface** | #161B22 | Post cards, profile page header, panels |
| **Input**   | #010409 | Input fields                            |

### Borders

| Token      | Value               | Usage                                 |
|------------|---------------------|---------------------------------------|
| **Border** | #E6EDF3 15% opacity | Card borders, input borders, dividers |
| **Radius** | 0.25rem             | Buttons, badges, inputs, cards        |

### States

| Token       | Colour  | Usage                                         |
|-------------|---------|-----------------------------------------------|
| **Success** | #31D962 | Successful post creation, follow confirmation |
| **Error**   | #F85149 | Form validation errors, failed API requests   |
| **Focus**   | #2B59C3 | 2px outline on focused inputs                 |

***

## Typography

### Display

**Font:** JetBrains Mono

|                | Desktop                             | Mobile                            |
|----------------|-------------------------------------|-----------------------------------|
| **Logo**       | 1.75rem, Bold (700), 0.1em tracking | 1.5rem, Bold (700), 0.1em tracking |
| **H1**         | 2.5rem                              | 2rem                              |
| **H2**         | 2rem                                | 1.5rem                            |
| **H3**         | 1.5rem                              | 1rem                              |
| **Navigation** | 1.125rem, Semibold (600), uppercase | 1rem, Semibold (600), uppercase   |

### Body

**Font:** Inter

|                | Desktop              | Mobile                   |
|----------------|----------------------|--------------------------|
| **Body**       | 1rem                 | 0.875rem                 |
| **Post title** | 2rem                 | 1.5rem                   |
| **Post body**  | 1rem                 | 0.875rem                 |
| **Post meta**  | 0.875rem             | 0.875rem                 |
| **Buttons**    | 1rem, Semibold (600) | 0.875rem, Semibold (600) |
| **Form label** | 1rem, Semibold (600) | 0.875rem, Semibold (600) |
| **Tag**        | 0.875rem             | 0.875rem                 |
| **Link**       | 1rem                 | 0.875rem                 |

***

## Spacing (8-point scale)

On mobile, spacing typically steps down one scale from the desktop value.
The exception is page horizontal padding, which steps down to scale 5 rather than scale 6.

| Scale | Value | rem     | Usage                                                                                                                           |
|-------|-------|---------|---------------------------------------------------------------------------------------------------------------------------------|
| 1     | 4px   | 0.25rem | Border radius on buttons and badges, gap between tags                                                                           |
| 2     | 8px   | 0.5rem  | Gap between label and input, gap between input and error message                                                                |
| 3     | 16px  | 1rem    | Gap between post title and meta                                                                                                 |
| 4     | 24px  | 1.5rem  | Gap between form fields, gap between post meta and body, card internal padding, gap between post cards, header vertical padding |
| 5     | 32px  | 2rem    | Gap between content blocks, page vertical padding                                                                               |
| 6     | 48px  | 3rem    | Section vertical padding                                                                                                        |
| 7     | 64px  | 4rem    | Page horizontal padding, profile page header padding                                                                            |

***

## Figma

https://www.figma.com/design/TBRvFVaMVjNeX4bnTahxfL/Compile?node-id=0-1&p=f&t=u8Wk7M6v7oT0njRE-0