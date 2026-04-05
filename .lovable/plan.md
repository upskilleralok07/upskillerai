## Website Restructuring Plan

### 1. New Home Page (Split Layout)
- Redesign Index.tsx with a hero split into two sides: College Sarthi (left) and Upskiller (right)
- Each side has brief description, key features, and CTA buttons
- Clicking CTA navigates to respective section

### 2. College Sarthi Pages
- **Services** (`/college-sarthi/services`) - Counselling services (college selection, branch help, MP DTE, career counselling, mentorship)
- **College Reviews** (`/college-sarthi/reviews`) - Video cards with 11 YouTube videos from the playlist, each with thumbnail, title, description, watch button
- **Resources** (`/college-sarthi/resources`) - Counselling resources, college comparison, admission checklists, rank analyzer
- **Contact** (`/college-sarthi/contact`) - Inquiry form, WhatsApp/email, booking, social links

### 3. Upskiller Pages
- **Courses** (`/upskiller/courses`) - All courses with title, description, level, CTA (reuse existing Upskiller page content)
- **Online College** (`/upskiller/online-college`) - Existing online college feature
- **Resources** (`/upskiller/resources`) - Free learning resources, YouTube playlists, DSA/AI material
- **Contact** (`/upskiller/contact`) - Collaboration form, course inquiry, social links

### 4. Navigation Update
- Update Navbar with dropdown/section-aware navigation
- College Sarthi nav shows its pages, Upskiller nav shows its pages
- Home always accessible

### 5. Routing Update
- Update App.tsx with new route structure
- Redirect old routes or keep backward compatibility

### Files to create/modify:
- `src/pages/Index.tsx` - Complete redesign with split layout
- `src/pages/CollegeSarthiServices.tsx` - New
- `src/pages/CollegeSarthiReviews.tsx` - New (video cards)
- `src/pages/CollegeSarthiResources.tsx` - New
- `src/pages/CollegeSarthiContact.tsx` - New
- `src/pages/UpskillerCourses.tsx` - New (refactored from existing)
- `src/pages/UpskillerResources.tsx` - New
- `src/pages/UpskillerContact.tsx` - New
- `src/components/Navbar.tsx` - Updated with section-aware nav
- `src/App.tsx` - Updated routes
