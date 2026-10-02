/* Contact (ASP-03). Source: content deck v1, slide 12.
   Second partner biography is a placeholder pending approved background and credentials. */

export const hero = {
  eyebrow: 'Leadership & Contact',
  headingLines: ['Senior-led relationships,', 'conducted in confidence.'],
  lead:
    'Every engagement begins with a confidential discovery conversation. Reach us directly, ' +
    'or send a note and a partner will respond.',
};

export const leadership = {
  eyebrow: 'Leadership',
  heading: 'Senior partners, directly involved.',
  people: [
    {
      name: 'Alexander Dimanow',
      role: 'Managing Partner',
      bio:
        'Geneva-based banking executive with more than 40 years of experience in private ' +
        'banking, wealth advisory and institutional finance. Background spans portfolio ' +
        'strategy, alternative investments, structured products, credit risk and investment ' +
        'advisory.',
      placeholder: false,
    },
    {
      name: 'António Fiuza',
      role: 'Managing Partner',
      bio:
        'Biography to be completed with approved background, key roles, areas of expertise ' +
        'and credentials.',
      placeholder: true,
    },
  ],
};

export const form = {
  eyebrow: 'Enquiries',
  heading: 'Send a confidential note.',
  fields: {
    name: { label: 'Full name', placeholder: 'Full name', required: true },
    email: { label: 'Email address', placeholder: 'Email address', required: true },
    message: { label: 'Message', placeholder: 'How can we help? (optional)', required: false },
  },
  submit: 'Request a Consultation',
  submitting: 'Sending…',
  success: {
    title: 'Thank you',
    body: 'We have received your details and will reach out shortly.',
  },
  error:
    'Something went wrong sending your message. Please try again, or email us directly.',
  validation: {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
  },
};

export const office = {
  eyebrow: 'Office',
  heading: 'Geneva.',
  image: { src: '/images/contact-geneva.jpg', alt: 'Rooftops of central Geneva' },
};
