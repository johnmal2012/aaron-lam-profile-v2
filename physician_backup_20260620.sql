--
-- PostgreSQL database dump
--

-- Dumped from database version 17.10 (21f7c76)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: physician_profile; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.physician_profile (id, logo, name, board_specialty, specialty, title, image, clinic_name, clinic_address, phone, email, address, location, link_name, footcare_link, expertise, nav_items, created_at, updated_at, is_active, deleted_at) FROM stdin;
1	Dr. Lam	Dr. Nikki Lam, DPM	Board-Certified Foot & Ankle Specialist	Foot & Ankle Specialist	Board-Certified Podiatric Surgeon	/images/nikki.png	Maimonides Foot & Ankle	4802 Tenth Avenue Brooklyn, NY 11219	(718) 123-4567	info@hudsonfootankle.com	4802 Tenth Avenue Brooklyn, NY 11219	Office Location	Foot Care	https://www.footcaremd.org/	["Sports Injuries", "Foot Surgery", "Diabetic Foot Care", "Custom Orthotics"]	[{"href": "#hero", "label": "About"}, {"href": "#education", "label": "Education"}, {"href": "#expertise", "label": "Expertise"}, {"href": "#philosophy", "label": "Philosophy"}, {"href": "#research", "label": "Research"}, {"href": "#hours", "label": "Hours"}, {"href": "#insurance", "label": "Insurance"}, {"href": "#location", "label": "Location"}, {"href": "#contact", "label": "Contact"}]	2026-05-19 23:07:31.855239	2026-05-20 19:50:13.556	t	\N
3	\N	name	Board specialty	Specialty	Title 	/images/nikki.png	clinic name	clinic Address 	1234567890	Email@example.com	4802	Office location 	Foot care	\N	["Apple", "orange"]	[{"href": "#hero", "label": "About"}]	2026-05-22 00:11:34.176315	2026-05-24 15:22:44.595	f	2026-06-18 22:19:33.744
\.


--
-- Data for Name: physician_sections; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.physician_sections (id, slug, title, content, display_order, is_active, deleted_at) FROM stdin;
31	philosophy	Care Philosophy	\r\nDr. Lam believes every patient deserves personalized treatment focused on long-term mobility and comfort.\r\n\r\nHer approach combines:\r\n\r\n- Preventive care\r\n- Conservative treatment when appropriate\r\n- Advanced surgical solutions when necessary\r\n- Patient education and collaborative decision making	5	t	\N
29	insurance	Insurance Accepted	\r\nWe accept most major insurance providers including:\r\n\r\n- Aetna\r\n- Cigna\r\n- UnitedHealthcare\r\n- Blue Cross Blue Shield\r\n- Medicare\r\n- Horizon NJ Health\r\n\r\nPlease contact the office to confirm your individual plan coverage	7	t	\N
32	research	Research & Publications	\r\n### Current Research Interests\r\n\r\n- Minimally invasive bunion correction\r\n- Regenerative therapies for tendon injuries\r\n- Diabetic wound prevention\r\n- Sports rehabilitation protocols\r\n\r\n### Publications\r\n\r\n- Journal of Foot & Ankle Surgery\r\n- Podiatry Today\r\n- International Journal of Sports Medicine	4	t	\N
26	education	Education & Credentials	\r\n- Doctor of Podiatric Medicine — Temple University School of Podiatric Medicine\r\n- Surgical Residency — NewYork-Presbyterian Hospital\r\n- Fellowship in Reconstructive Foot & Ankle Surgery\r\n- Board Certified by the American Board of Foot and Ankle Surgery	2	t	\N
27	expertise	Areas of Expertise	\r\n### Specialized Foot & Ankle Care\r\n\r\nDr. Nikki Lam specializes in comprehensive diagnosis and treatment for complex foot and ankle conditions using both conservative and surgical approaches.\r\n\r\n#### Common Conditions Treated\r\n\r\n- Achilles tendon injuries\r\n- Chronic heel pain\r\n- Plantar fasciitis\r\n- Ankle instability\r\n- Arthritis of the foot and ankle\r\n- Sports-related injuries\r\n\r\n#### Advanced Treatment Options\r\n\r\n- Minimally invasive surgery\r\n- Ultrasound-guided injections\r\n- Regenerative medicine therapies\r\n- Custom orthotic solutions	3	t	\N
25	contact	Contact Information	\r\n### Schedule an Appointment\r\n\r\nPhone: (718) 123-4567\r\n\r\nFax: (718) 123-4568\r\n\r\nEmail: info@hudsonfootankle.com\r\n\r\nAddress:\r\n1 Centre Street,\r\nNew York, NY 10007	8	t	\N
30	office_hours	Office Hours	\r\n| Day | Hours |\r\n| --- | --- |\r\n| Monday | 8:00 AM – 5:00 PM |\r\n| Tuesday | 8:00 AM – 5:00 PM |\r\n| Wednesday | 9:00 AM – 6:00 PM |\r\n| Thursday | 8:00 AM – 5:00 PM |\r\n| Friday | 8:00 AM – 2:00 PM |\r\n| Saturday | By Appointment |\r\n| Sunday | Closed |	6	t	\N
28	hero	Hero	\n### Compassionate Foot & Ankle Care\n\nDr. Lam specializes in advanced foot and ankle treatments focused on restoring mobility, relieving pain, and improving quality of life.\n\nWith over 18 years of clinical experience, Dr. Lam combines modern surgical techniques with compassionate patient-centered care.	1	t	\N
44	test_2	test 2.1	test 2.2	10	f	2026-06-18 13:36:34.261
\.


--
-- Name: physician_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.physician_profile_id_seq', 3, true);


--
-- Name: physician_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.physician_sections_id_seq', 49, true);


--
-- PostgreSQL database dump complete
--

