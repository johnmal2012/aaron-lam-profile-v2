// intended for development or initial setup, such as:
// Creating an admin user.
// Populating default physician sections (hero, education, expertise, etc.)
import { db } from './db';
import {
  user,
  physicianProfile,
  physicianSections,
  USER_ROLE,
} from '@/db/schema';
import { createCredentialUser } from '@/lib/auth/create-credential-user';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding database...');

  // --------------------------------------------------
  // User
  // --------------------------------------------------

  const email = 'test@gmail.com';

  await createCredentialUser({
    name: 'lam',
    email,
    password: '12345678',
    role: USER_ROLE.ADMIN,
  });

  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!existingUser) {
    throw new Error(`Failed to create seed user: ${email}`);
  }

  // --------------------------------------------------
  // Physician Profile
  // --------------------------------------------------

  const existingProfile = await db.query.physicianProfile.findFirst({
    where: eq(physicianProfile.userId, existingUser.id),
  });

  // use uploadthing image url and key
  if (!existingProfile) {
    await db.insert(physicianProfile).values({
      userId: existingUser.id,
      logo: 'Dr. Lam',
      name: 'Dr. Nikki Lam',
      boardSpecialty: 'Board-Certified Foot & Ankle',
      specialty: 'Specialist Foot & Ankle Specialist',
      title: 'Board-Certified Podiatric Surgeon',
      image:
        'https://ffkf9c9vt3.ufs.sh/f/mm5bHxn2kR9wLfvkx9BsyOhk8MnVworU43SQBglYctdeJHX9',
      imageKey: 'mm5bHxn2kR9wLfvkx9BsyOhk8MnVworU43SQBglYctdeJHX9',
      //   clinicName: 'Maimonides Foot & Ankle',
      //   clinicAddress: '4802 Tenth Avenue Brooklyn, NY 11219',
      clinics: [
        {
          name: 'Maimonides Foot & Ankle',
          address: '4802 Tenth Avenue Brooklyn, NY 11219',
          latitude: 40.6382,
          longitude: -74.0115,
        },
        {
          name: 'Queens Foot & Ankle Center',
          address: '123 Queens Boulevard, Queens, NY 11375',
          latitude: 40.7282,
          longitude: -73.7949,
        },
      ],
      phone: '(718) 123-4567',
      email: 'info@hudsonfootankle.com',
      //   address: '4802 Tenth Avenue Brooklyn, NY 11219',
      location: 'Office Location',
      linkName: 'Foot Care',
      footCareLink: 'https://www.footcaremd.org/',
      expertise: [
        {
          text: 'Sports Injuries',
          url: 'https://www.footcaremd.org/sports-injuries',
          image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=500&q=80',
          imageKey: ''
        },
        {
          text: 'Foot Surgery',
          url: 'https://www.footcaremd.org/foot-surgery',
          image:'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=500&q=80',
          imageKey: ''
        },
      ],
      //   navItems: [
      //     'about',
      //     'education',
      //     'expertise',
      //     'research',
      //     'philosophy',
      //     'hours',
      //     'insurance',
      //     'contact',
      //     'location',
      //   ],
      //   createdAt: '2026-05-19 23:07:31.855239',
      //   updatedAt: '2026-05-20 19:50:13.556',
      isActive: true,
      deletedAt: null,
      //   user_id: '8c2a700c-3b36-405d-8049-492d89acfb75',
    });

    console.log('Physician profile created');
  } else {
    console.log('Physician profile already exists');
  }

  // --------------------------------------------------
  // Sections
  // --------------------------------------------------

  const sections = [
    {
      slug: 'about',
      title: '',
      content:
        '### Compassionate Foot & Ankle Care\n\nDr. Lam specializes in advanced foot and ankle treatments focused on restoring mobility, relieving pain, and improving quality of life.\n\nWith over 6 years of clinical experience, Dr. Lam combines modern surgical techniques with compassionate patient-centered care.',
      displayOrder: 1,
      isActive: true,
      deletedAt: null,
    },
    {
      slug: 'education',
      title: 'Education & Credentials',
      content:
        '- Doctor of Podiatric Medicine — Temple University School of Podiatric Medicine\r\n- Surgical Residency — NewYork-Presbyterian Hospital\r\n- Fellowship in Reconstructive Foot & Ankle Surgery\r\n- Board Certified by the American Board of Foot and Ankle Surgery',
      displayOrder: 2,
      isActive: true,
      deletedAt: null,
    },
    {
      slug: 'expertise',
      title: 'Areas of Expertise',
      content:
        '### Specialized Foot & Ankle Care\r\n\r\nDr. Nikki Lam specializes in comprehensive diagnosis and treatment for complex foot and ankle conditions using both conservative and surgical approaches.\r\n\r\n#### Common Conditions Treated\r\n\r\n- Achilles tendon injuries\r\n- Chronic heel pain\r\n- Plantar fasciitis\r\n- Ankle instability\r\n- Arthritis of the foot and ankle\r\n- Sports-related injuries\r\n\r\n#### Advanced Treatment Options\r\n\r\n- Minimally invasive surgery\r\n- Ultrasound-guided injections\r\n- Regenerative medicine therapies\r\n- Custom orthotic solutions',
      displayOrder: 3,
      isActive: true,
      deletedAt: null,
    },
    {
      slug: 'insurance',
      title: 'Insurance Accepted',
      content:
        'We accept most major insurance providers including:\r\n\r\n- Aetna\r\n- Cigna\r\n- UnitedHealthcare\r\n- Blue Cross Blue Shield\r\n- Medicare\r\n- Horizon NJ Health\r\n\r\nPlease contact the office to confirm your individual plan coverage',
      displayOrder: 4,
      isActive: true,
      deletedAt: null,
    },
    {
      slug: 'office_hours',
      title: 'Office Hours',
      content:
        '| Day | Hours |\r\n| --- | --- |\r\n| Monday | 8:00 AM – 5:00 PM |\r\n| Tuesday | 8:00 AM – 5:00 PM |\r\n| Wednesday | 9:00 AM – 6:00 PM |\r\n| Thursday | 8:00 AM – 5:00 PM |\r\n| Friday | 8:00 AM – 2:00 PM |\r\n| Saturday | By Appointment |\r\n| Sunday | Closed |',
      displayOrder: 5,
      isActive: true,
      deletedAt: null,
    },
    {
      slug: 'philosophy',
      title: 'Care Philosophy',
      content:
        'Dr. Lam believes every patient deserves personalized treatment focused on long-term mobility and comfort.\n\nHis approach combines:\n\n- Preventive care\n- Conservative treatment when appropriate\n- Advanced surgical solutions when necessary\n- Patient education and collaborative decision making',
      displayOrder: 7,
      isActive: true,
      deletedAt: null,
    },
    {
      slug: 'research',
      title: 'Research & Publications',
      content:
        '### Current Research Interests\r\n\r\n- Minimally invasive bunion correction\r\n- Regenerative therapies for tendon injuries\r\n- Diabetic wound prevention\r\n- Sports rehabilitation protocols\r\n\r\n### Publications\r\n\r\n- Journal of Foot & Ankle Surgery\r\n- Podiatry Today\r\n- International Journal of Sports Medicine',
      displayOrder: 8,
      isActive: true,
      deletedAt: null,
    },
  ];

  for (const section of sections) {
    const exists = await db.query.physicianSections.findFirst({
      where: eq(physicianSections.slug, section.slug),
    });

    if (!exists) {
      await db.insert(physicianSections).values(section);
    }
  }

  console.log('Sections seeded');

  console.log('Database seeded successfully');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
