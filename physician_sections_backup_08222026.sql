--
-- PostgreSQL database dump
--

\restrict O0IcPFnFJFNUFI51FGDzo2i2MyMYL9xXDohGUwV6WiVTSfPtToFNm5PRiBoAqKv

-- Dumped from database version 18.6 (3484359)
-- Dumped by pg_dump version 18.6

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
-- Data for Name: physician_sections; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.physician_sections (id, slug, title, content, display_order, is_active, deleted_at) FROM stdin;
4	insurance	Insurance Accepted	We accept most major insurance providers including:\r\n\r\n- Aetna\r\n- Cigna\r\n- UnitedHealthcare\r\n- Blue Cross Blue Shield\r\n- Medicare\r\n- Horizon NJ Health\r\n\r\nPlease contact the office to confirm your individual plan coverage	4	t	\N
6	philosophy	Care Philosophy	Dr. Lam believes every patient deserves personalized treatment focused on long-term mobility and comfort.\n\nHis approach combines:\n\n- Preventive care\n- Conservative treatment when appropriate\n- Advanced surgical solutions when necessary\n- Patient education and collaborative decision making	7	t	\N
8	contact	Contact Information		8	t	\N
9	location	Office Location		9	t	\N
5	hours	Office Hours	| Day | Hours |\n| --- | --- |\n| Monday | 8:00 AM – 5:00 PM |\n| Tuesday | 8:00 AM – 5:00 PM |\n| Wednesday | 9:00 AM – 6:00 PM |\n| Thursday | 8:00 AM – 5:00 PM |\n| Friday | 8:00 AM – 3:00 PM |\n| Saturday | By Appointment |\n| Sunday | Closed |	5	t	\N
1	about		\n### Compassionate Foot & Ankle Care\n\nDr. Aaron Lam is a native New Yorker and fellowship-trained orthopedic foot and ankle surgeon specializing in the treatment of foot and ankle conditions, from sports injuries and common deformities to complex reconstruction. He completed his orthopedic surgery residency at Maimonides Medical Center and advanced fellowship training in Foot and Ankle Surgery at Baylor University Medical Center in Dallas under Dr. James Brodsky.\n\nDuring fellowship, Dr. Lam also received specialized training at Scottish Rite for Children, a nationally recognized pediatric orthopedic center, where he gained experience treating complex adolescent foot and ankle deformities. His clinical interests include foot and ankle trauma, bunion and forefoot surgery, flatfoot and cavovarus reconstruction, ankle replacement, Charcot reconstruction, limb salvage, and complex revision surgery. He is also actively involved in resident education and clinical research.\n	1	t	\N
2	education	Education & Credentials	- Education — Albert Einstein College of Medicine (2019)\n- Residency — Orthopaedic Surgery, Maimonides Medical Center (2025)\n- Fellowship - Foot and Ankle Surgery, Baylor University Medical Center (2026)	2	t	\N
7	research	Research & Publications	### Current Research Interests\n\n- Minimally invasive bunion correction\n- Regenerative therapies for tendon injuries\n- Diabetic wound prevention\n- Sports rehabilitation protocols\n\n### Publications\n\n- Journal of Foot & Ankle Surgery\n- Podiatry Today\n- International Journal of Sports Medicine	8	t	\N
10	test1	Test1	#### test1	10	f	2026-08-20 21:05:22.084
3	expertise	Areas of Expertise	### Specialized Foot & Ankle Care\r\n\r\nDr. Nikki Lam specializes in comprehensive diagnosis and treatment for complex foot and ankle conditions using both conservative and surgical approaches.\r\n\r\n#### Common Conditions Treated\r\n\r\n- Achilles tendon injuries\r\n- Chronic heel pain\r\n- Plantar fasciitis\r\n- Ankle instability\r\n- Arthritis of the foot and ankle\r\n- Sports-related injuries\r\n\r\n#### Advanced Treatment Options\r\n\r\n- Minimally invasive surgery\r\n- Ultrasound-guided injections\r\n- Regenerative medicine therapies\r\n- Custom orthotic solutions	3	t	\N
\.


--
-- Name: physician_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.physician_sections_id_seq', 10, true);


--
-- PostgreSQL database dump complete
--

\unrestrict O0IcPFnFJFNUFI51FGDzo2i2MyMYL9xXDohGUwV6WiVTSfPtToFNm5PRiBoAqKv

