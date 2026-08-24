--
-- PostgreSQL database dump
--

-- Dumped from database version 17.11 (df1f1a3)
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

COPY public.physician_profile (id, logo, name, board_specialty, specialty, title, image, clinic_name, clinic_address, phone, email, location, link_name, footcare_link, expertise, created_at, updated_at, is_active, deleted_at, user_id, image_key) FROM stdin;
1	Dr. Lam	Aaron Lam, MD	Board-Certified Foot & Ankle Specialist	Foot and Ankle Surgery, Orthopedic Surgery	Fellowship-Trained Orthopedic Foot & Ankle Surgeon	https://ffkf9c9vt3.ufs.sh/f/mm5bHxn2kR9wBLUeXxKwE7VYc3bWkJGTm8nMHDsXACi6u4Kr	Maimonides Foot & Ankle	4802 Tenth Avenue Brooklyn, NY 11219	(718) 123-4568	draaronlam@gmail.com	 	Foot Care	https://www.footcaremd.org/	["Sports Injuries", "Foot Surgery", "Diabetic Foot Care", "Custom Orthotics"]	2026-05-19 23:07:31.855239	2026-08-18 15:32:11.265	t	\N	0e41ead3-c262-4927-8e12-5af02d2d0348	mm5bHxn2kR9wBLUeXxKwE7VYc3bWkJGTm8nMHDsXACi6u4Kr
\.


--
-- Name: physician_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.physician_profile_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

