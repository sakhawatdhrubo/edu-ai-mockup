// Single source of truth for the screen directory (index page + any nav).
// One entry per screen ID in the wireframe; `slug` is the page route.
export const zones = [
  {
    key: 'A', title: 'Getting in', desc: 'ঢোকা — landing থেকে placement',
    screens: [
      { id: 'A1', slug: 'a1-landing', title: 'Landing / Demo' },
      { id: 'A2', slug: 'a2-login', title: 'Login' },
      { id: 'A2.5', slug: 'a2-5-recovery', title: 'Account recovery' },
      { id: 'A3', slug: 'a3-signup', title: 'Signup' },
      { id: 'A4', slug: 'a4-consent', title: 'OTP / Consent' },
      { id: 'A5', slug: 'a5-onboarding', title: 'Onboarding wizard' },
      { id: 'A6', slug: 'a6-placement', title: 'Placement test' },
      { id: 'A7', slug: 'a7-placement-result', title: 'Placement result' },
      { id: 'A8', slug: 'a8-profile-switcher', title: 'Profile switcher' },
    ],
  },
  {
    key: 'B', title: 'Home', desc: 'লঞ্চপ্যাড',
    screens: [
      { id: 'B1', slug: 'b1-dashboard', title: 'Dashboard' },
    ],
  },
  {
    key: 'C', title: 'Core loop', desc: 'শেখার মূল লুপ',
    screens: [
      { id: 'C1', slug: 'c1-chooser', title: 'Session chooser' },
      { id: 'C2', slug: 'c2-greeting', title: 'Greeting + engage' },
      { id: 'C3', slug: 'c3-explanation', title: 'Explanation (5 modalities)' },
      { id: 'C4', slug: 'c4-question', title: 'Question card' },
      { id: 'C5', slug: 'c5-feedback', title: 'Answer feedback' },
      { id: 'C6', slug: 'c6-hint-ladder', title: 'Hint ladder' },
      { id: 'C7', slug: 'c7-smart-moments', title: 'Smart moments' },
      { id: 'C8', slug: 'c8-notes', title: 'Notes panel' },
      { id: 'C9', slug: 'c9-wellbeing', title: 'Wellbeing banners' },
      { id: 'C10', slug: 'c10-controls', title: 'Session controls' },
      { id: 'C11', slug: 'c11-reflection', title: 'End + reflection' },
      { id: 'C12', slug: 'c12-summary', title: 'Session summary' },
    ],
  },
  {
    key: 'D', title: 'Assess', desc: 'মক ও অনুশীলন',
    screens: [
      { id: 'D1', slug: 'd1-mock-setup', title: 'Mock setup' },
      { id: 'D2', slug: 'd2-mock-runner', title: 'Mock runner' },
      { id: 'D3', slug: 'd3-scorecard', title: 'Scorecard' },
      { id: 'D4', slug: 'd4-formula-sheet', title: 'Formula sheet (overlay)' },
    ],
  },
  {
    key: 'E', title: 'Review', desc: 'পুনরালোচনা ও স্মৃতি',
    screens: [
      { id: 'E1', slug: 'e1-history', title: 'History' },
      { id: 'E2', slug: 'e2-replay', title: 'Session replay' },
      { id: 'E3', slug: 'e3-mistakes', title: 'Weekly mistake log' },
      { id: 'E4', slug: 'e4-calibration', title: 'Calibration curve' },
      { id: 'E5', slug: 'e5-notes-library', title: 'Notes library + flashcards' },
      { id: 'E6', slug: 'e6-export', title: 'Worksheet / PDF export' },
      { id: 'E7', slug: 'e7-concept-search', title: 'Concept search' },
    ],
  },
  {
    key: 'F', title: 'Motivation', desc: 'অনুপ্রেরণা',
    screens: [
      { id: 'F1', slug: 'f1-streak', title: 'Streak & freeze' },
      { id: 'F2', slug: 'f2-badges', title: 'Badge wall' },
      { id: 'F3', slug: 'f3-celebrations', title: 'Celebrations (overlay)' },
      { id: 'F4', slug: 'f4-daily-goal', title: 'Daily goal' },
      { id: 'F5', slug: 'f5-recap', title: 'Annual recap' },
    ],
  },
  {
    key: 'G', title: 'System & utility', desc: 'সিস্টেম',
    screens: [
      { id: 'G1', slug: 'g1-not-found', title: 'Not-found' },
      { id: 'G2', slug: 'g2-notifications', title: 'Notifications center' },
      { id: 'G3', slug: 'g3-invite', title: 'Invite / referral' },
      { id: 'G4', slug: 'g4-feedback', title: 'Feedback / bug report' },
    ],
  },
  {
    key: 'H', title: 'Trust & people', desc: 'বিশ্বাস, অভিভাবক ও শিক্ষক',
    screens: [
      { id: 'H1', slug: 'h1-report', title: 'Report / Crisis (overlay)' },
      { id: 'H2', slug: 'h2-help', title: 'Help index' },
      { id: 'H3', slug: 'h3-help-article', title: 'Help article' },
      { id: 'H4', slug: 'h4-settings', title: 'Settings' },
      { id: 'H5', slug: 'h5-profile-edit', title: 'Profile edit' },
      { id: 'H6', slug: 'h6-notifications-prefs', title: 'Notification preferences' },
      { id: 'H7', slug: 'h7-data', title: 'Data export & delete' },
      { id: 'H8', slug: 'h8-parent-digest', title: 'Parent weekly digest' },
      { id: 'H9', slug: 'h9-parent-dashboard', title: 'Parent dashboard' },
      { id: 'H10', slug: 'h10-teacher-console', title: 'Teacher console' },
      { id: 'H11', slug: 'h11-teacher-assign', title: 'Teacher assignment' },
      { id: 'H12', slug: 'h12-legal', title: 'Legal (privacy / terms)' },
    ],
  },
  {
    key: 'I', title: 'Billing', desc: 'পেমেন্ট',
    screens: [
      { id: 'I1', slug: 'i1-plans', title: 'Plans' },
      { id: 'I2', slug: 'i2-payment', title: 'Payment' },
      { id: 'I3', slug: 'i3-limit', title: 'Limit prompt (overlay)' },
      { id: 'I4', slug: 'i4-invoices', title: 'Invoices' },
    ],
  },
];

export const zoneAccent = {
  A: 'indigo', B: 'emerald', C: 'violet', D: 'amber', E: 'sky',
  F: 'rose', G: 'slate', H: 'indigo', I: 'emerald',
};
