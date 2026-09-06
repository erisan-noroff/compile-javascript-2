# Compile

All developers must adhere to these design specifications when implementing the website. The design specifications are
made by the UX/UI team and approved by the Product Owner. This document outlines the visual design system including
typography, colour palette, spacing, and component specifications for the Compile website.

**Root font size:** 16px.

***

## Colour Palette

### Brand

- **Primary:** #2B59C3
- **Usage:** Buttons, primary actions, active nav

- **Secondary:** #FFA62B
- **Usage:** Highlights, badges, secondary actions

- **Accent:** #A2D6F9
- **Usage:** Hover states, tags, small UI details

### Text

#### Primary

- **Colour:** #E6EDF3
- **Usage:** Headings, post titles, body text

#### Muted

- **Colour:** #E6EDF3 70% opacity
- **Usage:** Timestamps, author metadata, placeholders, follower counts

### Background

- **Page:** #0D1117
- **Usage:** Page background

- **Surface:** #161B22
- **Usage:** Post cards, profile page header, panels

### Borders

- **Colour:** #E6EDF3 15% opacity
- **Border radius:** 0.25rem
- **Usage:** Card borders, input borders, dividers

### Buttons

#### Primary

- **Default:** #2B59C3, Text: #E6EDF3
- **Hover:** #264EAC

#### Secondary

- **Default:** #FFA62B, Text: #0D1117
- **Hover:** #FFB144

#### Follow

- **Default:** #2B59C3, Text: #E6EDF3
- **Hover:** #264EAC
- **Following:** Transparent, Border: #A2D6F9, Text: #A2D6F9
- **Following (hover):** Transparent, Border: #B0DCFA, Text: #B0DCFA

### Badges and Tags

- **Background:** #A2D6F9
- **Text:** #0D1117

### Navigation

- **Default:** #E6EDF3
- **Hover:** #A2D6F9

### Links

- **Colour:** #A2D6F9
- **Text decoration:** Underline
- **Hover:** #E6EDF3

### States

- **Success:** #31D962
- **Usage:** Successful post creation, follow confirmation
- **Error:** #DC2626
- **Usage:** Form validation errors, failed API requests

## Input

- **Background:** #010409
- **Border:** #E6EDF3, 15% opacity, 1px
- **Border radius:** 0.25rem

### Active

- **Outline:** 2px #2B59C3

***

## Typography

### Headings

**Font:** JetBrains Mono

|        | Desktop | Mobile |
|--------|---------|--------|
| **H1** | 2.5rem  | 2rem   |
| **H2** | 2rem    | 1.5rem |
| **H3** | 1.5rem  | 1rem   |

### Navigation

**Font:** JetBrains Mono

|                | Desktop                                   | Mobile                                   |
|----------------|-------------------------------------------|------------------------------------------|
| **Logo**       | Bold (600), 1.75rem, letter-spacing 0.1em | Bold (600), 1.5rem, letter-spacing 0.1em |
| **Navigation** | Medium (500), 1.125rem, uppercase         | Medium (500), 1rem, uppercase            |

### Body

**Font:** Inter

|                     | Desktop  | Mobile   |
|---------------------|----------|----------|
| **Body**            | 1rem     | 0.875rem |
| **Post Title**      | 2rem     | 1.5rem   |
| **Post Body**       | 1rem     | 0.875rem |
| **Post Meta**       | 0.875rem | 0.875rem |
| **Primary Buttons** | 1rem     | 0.875rem |
| **Tag**             | 0.875rem | 0.875rem |
| **Form Label**      | 1rem     | 0.875rem |
| **Link**            | 1rem     | 0.875rem |

***

## Spacing (8-point scale)

On mobile, spacing typically steps down one scale from the desktop value.
The exception is page horizontal padding, which steps down to scale 5 rather than scale 6.

| Scale | Value | rem     | Usage                                                                       |
|-------|-------|---------|-----------------------------------------------------------------------------|
| 1     | 4px   | 0.25rem | Border radius on buttons and badges, gap between tags                       |
| 2     | 8px   | 0.5rem  | Gap between post card elements (title→meta, meta→body)                      |
| 3     | 16px  | 1rem    | Post card internal padding, gap between form label, input and error message |
| 4     | 24px  | 1.5rem  | Gap between post cards in the feed, header vertical padding                 |
| 5     | 32px  | 2rem    | Gap between content blocks, page vertical padding                           |
| 6     | 48px  | 3rem    | Section vertical padding                                                    |
| 7     | 64px  | 4rem    | Page horizontal padding, profile page header padding                        |

***

## Figma

https://www.figma.com/design/TBRvFVaMVjNeX4bnTahxfL/Compile?node-id=0-1&p=f&t=u8Wk7M6v7oT0njRE-0